import { useEffect, FC, useState } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { toast } from 'react-hot-toast';

import { Card, CardHeader, Box, Typography } from '@material-ui/core';

import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { AVAXVault__factory } from '@orca/shared/contracts';
import { contractAddresses } from '@orca/shared/deployments';
import { Loader } from '@orca/components/loader';

import Table from '../table';

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
    const mcp = await avaxVault.minimumCollateralPercentage();
    const totalSupply = await avaxVault.totalSupply();

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

export const AvaxVaults: FC<PagesVaultsProps> = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grab user's vaults
  const { data: vaults, mutate: avaxVaultMutate } = useSwr(
    shouldFetch ? [library, account, chainId] : null,
    getAVAXVaults()
  );
  useKeepSWRDataLiveAsBlocksArrive(avaxVaultMutate);

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

      return () => {
        avaxVault.removeAllListeners(newVault);
      };
    }
  }, [library, account, avaxVaultMutate, chainId]);

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
            title={'AVAX Vault Monitor'}
            subheader={'Vaults close to liquidation'}
            avatar={
              <Box
                component="img"
                src="/static/cryptos/ic_avax.svg"
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
          />
          {vaults.length > 0 ? (
            <Table />
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
      </div>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
