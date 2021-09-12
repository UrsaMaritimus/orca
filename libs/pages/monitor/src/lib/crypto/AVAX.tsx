import { FC, useEffect } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Card, CardHeader, Box, Typography } from '@mui/material';

import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { monitorBadVaults, getVault, liquidateVault } from '@orca/shared/funcs';
import { Loader } from '@orca/components/loader';

import Table from '../table';
import { VaultReward } from '../Reward/Reward';
import { useMonitorVaults } from './useMonitor';

/* eslint-disable-next-line */
export interface PagesVaultsProps {
  library: Web3Provider;
  chainId: number;
  account: string;
}

export const AvaxVaults: FC<PagesVaultsProps> = ({
  library,
  chainId,
  account,
}) => {
  const { loading, rows: badVaults } = useMonitorVaults(library, chainId);
  if (typeof account === 'string' && badVaults && !loading) {
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
            subheader={'Vaults close to liquidation (above 50%)'}
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
