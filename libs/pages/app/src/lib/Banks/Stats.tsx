import { FC } from 'react';
import { utils } from 'ethers';

import {
  Grid,
  Card,
  Box,
  Stack,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';

import { fCurrency, fNumber } from '@orca/util';
import { Loader } from '@orca/components/loader';
import { farmConstants } from '@orca/shared/base';
import { useFrontPageStats } from '../graph/useFrontPageStats';

export const Stats: FC = () => {
  const { loading: statsLoading, data: stats } = useFrontPageStats();

  return (
    <Card
      sx={{
        mt: 2,
        mx: 1.5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        boxShadow: 5,
      }}
    >
      <CardHeader
        title="ORCA"
        avatar={
          <Box
            component="img"
            src={farmConstants.reward.img}
            sx={{ width: 40, height: 40 }}
            color="inherit"
          />
        }
      />
      <CardContent>
        {statsLoading && <Loader />}
        {!statsLoading && (
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Marketcap
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.marketcap)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Total Value Locked
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.TVL)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Orca DAO Revenue
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.totalRevenue)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Circulating ORCA Supply
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.circulatingSupply, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA Per Day
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.orcaPerDay, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA per Month
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.orcaPerMonth, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA Max Supply
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.maxSupply, 0, true)}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
