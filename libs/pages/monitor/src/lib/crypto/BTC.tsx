import { FC } from 'react';

import { Web3Provider } from '@ethersproject/providers';

import { Card, CardHeader, Box, Typography } from '@mui/material';

import { Loader } from '@orca/components/loader';

import Table from '../table';
import { VaultReward } from '../Reward/Reward';
import { useMonitorVaults } from '../useMonitor';

/* eslint-disable-next-line */
export interface PagesVaultsProps {
  library: Web3Provider;
  chainId: number;
  account: string;
}

export const BtcVaults: FC<PagesVaultsProps> = ({
  library,
  chainId,
  account,
}) => {
  const { loading, rows: badVaults } = useMonitorVaults(
    library,
    chainId,
    'wbtc',
    'BTC'
  );

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
            title={'WBTC.e Vault Monitor'}
            subheader={'Vaults close to liquidation (above 59%)'}
            avatar={
              <Box
                component="img"
                src="/static/cryptos/ic_wbtc.svg"
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
          />
          {badVaults.length > 0 && badVaults[0] ? (
            <Table rows={badVaults} collateralType={'BTC'} />
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
        <VaultReward token="BTC" />
      </div>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
