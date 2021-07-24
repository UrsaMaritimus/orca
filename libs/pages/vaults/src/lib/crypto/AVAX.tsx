import { useEffect, FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import { toast } from 'react-hot-toast';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { MainTable } from '@ursa/components/table';
import { useKeepSWRDataLiveAsBlocksArrive } from '@ursa/hooks';

import useSwr from 'swr';
import { AVAXVault__factory, contractAddresses } from '@ursa/shared/contracts';

/* eslint-disable-next-line */
export interface PagesVaultsProps {}
const isDev = process.env.NODE_ENV === 'development';

/**
 *
 * @param library Provider for web3
 * @param address Address of user
 * @returns An array of {vaultID, collateral, debt, ratio} for each vault
 */
const getAVAXVaults = () => {
  return async (library: Web3Provider, address: string) => {
    const avaxVault = AVAXVault__factory.connect(
      isDev ? contractAddresses.fuji.AVAXVault : '',
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

          const ratio = debt.isZero()
            ? utils.formatUnits(0, 0)
            : collateral.mul(100).div(debt);

          return {
            vaultID: vault.toString(),
            collateral: collateral.toString(),
            debt: debt.toString(),
            ratio: ratio.toString(),
          };
        } catch (err) {
          console.log(err.message);
        }
      })
    );
  };
};

export const AvaxVaults: FC<PagesVaultsProps> = () => {
  const { account, library } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grab user's vaults
  const { data: vaults, mutate: avaxVaultMutate } = useSwr(
    shouldFetch ? [library, account] : null,
    getAVAXVaults()
  );
  useKeepSWRDataLiveAsBlocksArrive(avaxVaultMutate);

  // Keep all the information up to date
  useEffect(() => {
    if (library) {
      const avaxVault = AVAXVault__factory.connect(
        isDev ? contractAddresses.fuji.AVAXVault : '',
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
      return () => {
        avaxVault.removeAllListeners(newVault);
      };
    }
  }, [library, account, avaxVaultMutate]);

  // For creating a vault
  const createVault = async () => {
    try {
      const avaxVault = AVAXVault__factory.connect(
        isDev ? contractAddresses.fuji.AVAXVault : '',
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

  if (typeof account === 'string' && vaults) {
    return (
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
              color="secondary"
              startIcon={<Icon icon={plusFill} />}
              onClick={createVault}
            >
              Create Vault
            </Button>
          }
        />
        {vaults.length > 0 ? (
          <MainTable rows={vaults} collateralType={'AVAX'} debtType={'AVAI'} />
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
    );
  }

  return <> </>;
};
