import { FC } from 'react';
import { Grid, Card, CardHeader, Typography, Box, Stack } from '@mui/material';
import { utils } from 'ethers';
import { Loader } from '@orca/components/loader';
import { useFrontPageInfo } from '../graph/useFrontPageAnalytics';
import { fCurrency, fNumber } from '@orca/util';

import { ProtocolRevenue } from './revenue';
import BankInfo from './BankInfo';

export const BanksAnalytics: FC = () => {
  const { loading, data } = useFrontPageInfo();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            {!loading && (
              <Card sx={{ pb: 2 }}>
                <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      src="/static/icons/ic_bank.svg"
                      sx={{ width: 60, height: 60 }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Stack alignItems="center">
                      <Typography variant="h6">Total Collateral</Typography>
                      <Typography variant="h4" color="primary.main">
                        {fCurrency(
                          Number(utils.formatEther(data.totalCollateral))
                        )}
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
                <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      src="/static/icons/ic_debt.svg"
                      sx={{ width: 60, height: 60 }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Stack alignItems="center">
                      <Typography variant="h6">Total Debt</Typography>
                      <Typography variant="h4" color="warning.light">
                        {fCurrency(Number(utils.formatEther(data.totalDebt)))}
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
              <Card sx={{ pb: 2 }}>
                <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      src="/static/cryptos/ic_avai.svg"
                      sx={{ width: 60, height: 60 }}
                      color="inherit"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Stack alignItems="center">
                      <Typography variant="h6">Circulating AVAI</Typography>
                      <Typography variant="h4" color="secondary.main">
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
        </Grid>
        <Grid item xs={12}>
          {!loading && <BankInfo data={data.indivBanks} />}
          {loading && (
            <Card>
              <Loader />
            </Card>
          )}
        </Grid>
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

      <Grid item xs={12} md={4}>
        {!loading && (
          <Card sx={{ pb: 2 }}>
            <Grid container sx={{ my: 2 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/cryptos/ic_orca.svg"
                  sx={{ width: 60, height: 60 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
                <Stack alignItems="center">
                  <Typography variant="h6">Circulating ORCA</Typography>
                  <Typography variant="h4" color="secondary.main">
                    {fNumber(Number(0), 2)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default BanksAnalytics;
