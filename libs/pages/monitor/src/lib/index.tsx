/* eslint-disable-next-line */
import { useState, FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Container,
} from '@mui/material';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { Loader } from '@orca/components/loader';

import Table from './table';
import { useMonitorVaults } from './useMonitor';
import { VaultReward } from './Reward/Reward';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export const Vaults: FC = () => {
  const { library, chainId } = useWeb3React<Web3Provider>();
  const { loading, rows } = useMonitorVaults(library, chainId);
  // Default return
  if (!loading)
    return (
      <Connect title={'Monitor Vaults'}>
        <RootStyle title={`Monitor Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
          <Container maxWidth="md">
            <VaultReward />
            <Card>
              <CardHeader
                title={'Vaults ready for liquidation'}
                subheader={
                  'All vaults where users have borrowed larger than 80% of the max LTV are displayed'
                }
              />
              {rows.length > 0 && rows[0] ? (
                <Table rows={rows} />
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
          </Container>
        </RootStyle>
      </Connect>
    );
  return (
    <Container maxWidth="md">
      <Card>
        <Loader />
      </Card>
    </Container>
  );
};

export default Vaults;
