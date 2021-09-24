import { FC } from 'react';
import { utils } from 'ethers';

import { Grid, Card, Box, Stack, Typography } from '@mui/material';

import { fCurrency, fNumber } from '@orca/util';
import { Loader } from '@orca/components/loader';

import { useFrontPageInfo } from '../graph/useFrontPageAnalytics';

export const Infomatic: FC = () => {
  const { loading, data } = useFrontPageInfo();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        {!loading && (
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/icons/ic_bank.svg"
                  sx={{ width: 60, height: 60 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
                <Stack alignItems="center">
                  <Typography variant="h6">Total Collateral</Typography>
                  <Typography variant="h4" color="primary.main">
                    {fCurrency(Number(utils.formatEther(data.totalCollateral)))}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
        {loading && (
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Loader />
          </Card>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {!loading && (
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/icons/ic_debt.svg"
                  sx={{ width: 60, height: 60 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
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
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Loader />
          </Card>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {!loading && (
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Grid container sx={{ my: 2, mt: 3 }} alignItems="center">
              <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/static/cryptos/ic_avai.svg"
                  sx={{ width: 60, height: 60 }}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} sm={8} display="flex" justifyContent="center">
                <Stack alignItems="center">
                  <Typography variant="h6">Circulating AVAI</Typography>
                  <Typography variant="h4" color="secondary.main">
                    {fNumber(
                      Number(utils.formatEther(data.avaiSupply)),
                      2,
                      true
                    )}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}

        {loading && (
          <Card
            sx={{
              mt: 2,
              mx: 1.5,
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              boxShadow: 5,
            }}
          >
            <Loader />
          </Card>
        )}
      </Grid>
    </Grid>
  );
};
