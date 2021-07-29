import { useEffect, FC, useState } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import plusFill from '@iconify/icons-eva/plus-fill';

import { toast } from 'react-hot-toast';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  Stack,
  Popover,
  IconButton,
} from '@material-ui/core';

import { MainTable } from '@ursa/components/table';
import { useKeepSWRDataLiveAsBlocksArrive } from '@ursa/hooks';
import { AVAXVault__factory } from '@ursa/shared/contracts';
import { contractAddresses } from '@ursa/shared/deployments';
import { Loader } from '@ursa/components/loader';
import { fShortenNumber } from '@ursa/util';

/* eslint-disable-next-line */
export interface PagesVaultsProps {}

/**
 *
 * @param library Provider for web3
 * @param address Address of user
 * @returns An array of {vaultID, collateral, debt, ratio} for each vault
 */
const getAVAXVaults = () => {
  return async (library: Web3Provider, address: string, chainId: number) => {
    const avaxVault = AVAXVault__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAXVault
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAXVault
        : null,
      library
    );
    const balance = Number(
      utils.formatUnits(await avaxVault.balanceOf(address), 0)
    );

    const vaults = await Promise.all(
      [...Array(balance)].map(async (_, i) => {
        return await avaxVault.tokenOfOwnerByIndex(address, i);
      })
    );

    //Get each vault's collateral and debt
    return Promise.all(
      vaults.map(async (vault) => {
        try {
          const collateral = await avaxVault.vaultCollateral(vault);
          const debt = await avaxVault.vaultDebt(vault);
          const price = await avaxVault.getPriceSource();
          const peg = await avaxVault.getPricePeg();

          const ratio = debt.isZero()
            ? utils.formatUnits(0, 0)
            : debt.mul(peg).mul(100).div(collateral.mul(price));

          return {
            vaultID: vault.toString(),
            collateral: utils.formatEther(collateral),
            debt: utils.formatEther(debt),
            ratio: ratio.toString(),
          };
        } catch (err) {
          console.log(err.message);
        }
      })
    );
  };
};

const getMintCeiling = () => {
  return async (library: Web3Provider, chainId: number) => {
    const avaxVault = AVAXVault__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAXVault
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAXVault
        : null,
      library
    );

    const debtCeiling = await avaxVault.debtCeiling();
    const totalDebt = await avaxVault.totalDebt();
    return {
      debtCeiling,
      totalDebt,
    };
  };
};

export const AvaxVaults: FC<PagesVaultsProps> = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grab user's vaults
  const { data: vaults, mutate: avaxVaultMutate } = useSwr(
    shouldFetch ? [library, account, chainId] : null,
    getAVAXVaults()
  );
  useKeepSWRDataLiveAsBlocksArrive(avaxVaultMutate);

  // Grab user's vaults
  const { data: debtInfo, mutate: debtMutate } = useSwr(
    shouldFetch ? [library, chainId] : null,
    getMintCeiling()
  );
  useKeepSWRDataLiveAsBlocksArrive(debtMutate);

  // Keep all the information up to date
  useEffect(() => {
    if (library) {
      const avaxVault = AVAXVault__factory.connect(
        chainId === 43113
          ? contractAddresses.fuji.AVAXVault
          : chainId === 43114
          ? // TODO: Update
            contractAddresses.fuji.AVAXVault
          : null,
        library
      );
      // Set events up for updating
      const newVault = avaxVault.filters.CreateVault();
      avaxVault.on(newVault, (vaultId, creator) => {
        if (creator === account) {
          console.log(`EMIT: ${creator} created new vault ${vaultId}`);
          avaxVaultMutate(undefined, true);
        }
      });

      const increaseDebt = avaxVault.filters.BorrowToken();
      const decreaseDebt = avaxVault.filters.PayBackToken();
      avaxVault.on(increaseDebt, () => {
        debtMutate(undefined, true);
      });
      avaxVault.on(decreaseDebt, () => {
        debtMutate(undefined, true);
      });
      return () => {
        avaxVault.removeAllListeners(newVault);
        avaxVault.removeAllListeners(increaseDebt);
        avaxVault.removeAllListeners(decreaseDebt);
      };
    }
  }, [library, account, avaxVaultMutate, debtMutate, chainId]);

  // For creating a vault
  const createVault = async () => {
    try {
      const avaxVault = AVAXVault__factory.connect(
        chainId === 43113
          ? contractAddresses.fuji.AVAXVault
          : chainId === 43114
          ? // TODO: Update
            contractAddresses.fuji.AVAXVault
          : null,
        library.getSigner()
      );

      const result = await avaxVault.createVault();

      toast.promise(
        result.wait(1),
        {
          loading: 'Creating vault...',
          success: <b>Vault created!</b>,
          error: <b>Vault failed to be created.</b>,
        },
        {
          style: {
            minWidth: '100px',
          },
          loading: {
            duration: Infinity,
          },
          success: {
            duration: 5000,
          },
        }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  if (chainId === 43114) {
    return (
      <Card>
        <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
          {' '}
          Main Net not deployed yet. Please switch to Fuji.
        </Typography>
      </Card>
    );
  }

  if (typeof account === 'string' && vaults) {
    return (
      <div>
        <Card>
          <CardHeader
            title={'AVAX Vaults'}
            avatar={
              <Box
                component="img"
                src="/static/cryptos/ic_avax.svg"
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon icon={plusFill} />}
                onClick={createVault}
              >
                Create Vault
              </Button>
            }
          />
          {vaults.length > 0 ? (
            <MainTable
              rows={vaults}
              collateralType={'AVAX'}
              debtType={'AVAI'}
            />
          ) : (
            <Typography
              variant="h4"
              color="inherit"
              sx={{ mt: 2, mb: 2, textAlign: 'center' }}
            >
              Create a vault to start!
            </Typography>
          )}
        </Card>
        {debtInfo && (
          <Box
            sx={{
              pt: 2,
              pb: 2,
              mr: 1,
              ml: 1,
              mt: 3,
              mb: 3,
              borderRadius: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'grey.400' : 'info.lighter',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography variant="h5" textAlign="center" color="grey.600">
                AVAX Vault currently has available to mint:{' '}
                {fShortenNumber(
                  utils.formatEther(
                    debtInfo.debtCeiling.sub(debtInfo.totalDebt)
                  )
                )}{' '}
                AVAI
              </Typography>
              <IconButton
                onMouseEnter={handleHoverOpen}
                onMouseLeave={handleHoverClose}
                color="info"
              >
                <Icon icon={infoOutline} width={25} height={25} />
              </IconButton>
            </Stack>
          </Box>
        )}
        <Popover
          id="mouse-over-popover"
          open={Boolean(hover)}
          anchorEl={hover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleHoverClose}
          disableRestoreFocus
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="subtitle1" gutterBottom>
              Debt Ceiling
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              The debt ceiling is a security feature put into place to reduce a
              possibility of exploitation. Once the debt ceiling is reached, no
              further AVAI can be borrowed. However, this can be and is
              increased.
            </Typography>
          </Box>
        </Popover>
      </div>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
