import { useEffect, FC, useState } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { Card, CardHeader, Box, Typography } from '@material-ui/core';

import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { monitorBadVaults } from '@orca/shared/funcs';
import { Loader } from '@orca/components/loader';

import Table from '../table';
import { VaultReward } from '../Reward/Reward';

/* eslint-disable-next-line */
export interface PagesVaultsProps {}

export const AvaxVaults: FC<PagesVaultsProps> = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grabs bad's vaults
  const { data: badVaults, mutate: monitorVaultMutate } = useSwr(
    shouldFetch ? ['monitorBadAvaxVaults', library, chainId, 'wavax'] : null,
    monitorBadVaults()
  );
  useKeepSWRDataLiveAsBlocksArrive(monitorVaultMutate);

  if (typeof account === 'string' && badVaults) {
    return (
      <div>
        <Card
          sx={{
            mb: 3,
            position: 'relative',
          }}
        >
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
          {badVaults.length > 0 && badVaults[0] ? (
            <Table rows={badVaults} collateralType={'AVAX'} />
          ) : (
            <Typography
              variant="h4"
              color="inherit"
              sx={{ mt: 5, mb: 5, textAlign: 'center' }}
            >
              No vaults close to liquidation.
            </Typography>
          )}
        </Card>
        <VaultReward token="AVAX" />
      </div>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
