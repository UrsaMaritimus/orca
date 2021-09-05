import { useEffect, FC, useState } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import plusFill from '@iconify/icons-eva/plus-fill';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  Stack,
  Popover,
  IconButton,
} from '@mui/material';

import { Loader } from '@orca/components/loader';
import { MainTable } from '@orca/components/table';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { fShortenNumber } from '@orca/util';
import {
  getVaults,
  mintCeiling,
  makeVault,
  getVault,
} from '@orca/shared/funcs';
import { handleTransaction } from '@orca/components/transaction';

/* eslint-disable-next-line */
export interface PagesVaultsProps {}

export const AvaxVaults: FC<PagesVaultsProps> = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grab user's vaults
  const { data: vaults, mutate: avaxVaultMutate } = useSwr(
    shouldFetch ? ['getAvaxVaults', library, account, chainId, 'wavax'] : null,
    getVaults()
  );
  useKeepSWRDataLiveAsBlocksArrive(avaxVaultMutate);

  // Grab user's vaults
  const { data: debtInfo, mutate: debtMutate } = useSwr(
    shouldFetch ? ['getMintCeiling', library, chainId, 'wavax'] : null,
    mintCeiling()
  );
  useKeepSWRDataLiveAsBlocksArrive(debtMutate);

  // Keep all the information up to date
  useEffect(() => {
    if (library) {
      const avaxVault = getVault('wavax', library, chainId);
      // Set events up for updating
      const newVault = avaxVault.filters.CreateVault();
      const destroyVault = avaxVault.filters.DestroyVault();
      avaxVault.on(newVault, (vaultId, creator) => {
        if (creator === account) {
          console.log(`EMIT: ${creator} created new vault ${vaultId}`);
          avaxVaultMutate(undefined, true);
        }
      });

      avaxVault.on(destroyVault, (vaultId) => {
        avaxVaultMutate(undefined, true);
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
        avaxVault.removeAllListeners(destroyVault);
      };
    }
  }, [library, account, avaxVaultMutate, debtMutate, chainId]);

  // For creating a vault
  const createVault = async () => {
    await handleTransaction({
      transaction: makeVault(library, 'wavax', chainId),
      messages: {
        loading: 'Creating vault...',
        success: 'Vault created!',
        error: 'Vault failed to be created.',
      },
      chainId,
    });
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
                sx={{ width: 35, height: 35 }}
                color="inherit"
              />
            }
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon icon={plusFill} />}
                onClick={createVault}
                size="medium"
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
                Available to mint:{' '}
                {fShortenNumber(
                  utils.formatEther(
                    debtInfo.debtCeiling.sub(debtInfo.totalDebt)
                  ),
                  4
                )}{' '}
                AVAI
              </Typography>
              <IconButton
                onMouseEnter={handleHoverOpen}
                onMouseLeave={handleHoverClose}
                color="info"
              >
                <Icon icon={infoOutline} width={20} height={20} />
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
              further AVAI can be borrowed. However, this can and will be
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
