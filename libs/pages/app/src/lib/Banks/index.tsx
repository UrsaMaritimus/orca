import { FC } from 'react';
import { Grid, Card, CardHeader, Typography, Box, Stack } from '@mui/material';
import { utils } from 'ethers';
import { Loader } from '@orca/components/loader';
import { useFrontPageInfo } from '../graph/useFrontPageAnalytics';
import { fNumber } from '@orca/util';

import { ProtocolRevenue } from './revenue';

export const BanksAnalytics: FC = () => {
  const { loading, data } = useFrontPageInfo();
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={4}>
        {!loading && (
          <Card sx={{ pb: 2 }}>
            <Grid container sx={{ my: 2 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/cryptos/ic_avai.svg"
                  sx={{ width: 75, height: 75 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
                <Stack alignItems="center">
                  <Typography variant="h6">AVAI Circulating Supply</Typography>
                  <Typography variant="h2" color="secondary.main">
                    {fNumber(Number(utils.formatEther(data.avaiSupply)), 2)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
        {loading && (
          <Card>
            <Loader />
          </Card>
        )}
      </Grid>
      <Grid item xs={6} md={4}>
        {!loading && (
          <Card sx={{ pb: 2 }}>
            <Grid container sx={{ my: 2 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/cryptos/ic_orca.svg"
                  sx={{ width: 75, height: 75 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
                <Stack alignItems="center">
                  <Typography variant="h6">ORCA Circulating Supply</Typography>
                  <Typography variant="h2" color="secondary.main">
                    {fNumber(Number(0), 2)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
        {loading && (
          <Card>
            <Loader />
          </Card>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {!loading && (
          <ProtocolRevenue
            usdTreasury={data.exchangeTreasury}
            bankTreasury={data.bankTreasury}
          />
        )}
        {loading && (
          <Card>
            <Loader />
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default BanksAnalytics;
