import { FC } from 'react';

import { Grid, Box, Typography, Divider, Paper } from '@mui/material';

import { LoadingDots } from '@orca/components/loader';

import { useFrontPageYieldInfo } from '../graph/useFrontPageYieldFarm';
import { fCurrency, fNumber, fPercent } from '@orca/util';

export type YieldFarmProps = {
  name: string;
  img: string;
  address: string;
};

export const YieldFarm: FC<YieldFarmProps> = ({ name, img, address }) => {
  const { loading, data } = useFrontPageYieldInfo(address);
  return (
    <Paper
      sx={{
        mt: 2,
        mb: 2,
        mx: 1.5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        boxShadow: 5,
      }}
    >
      <Grid container sx={{ p: 3, pb: 2.5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box
            component="img"
            src={img}
            sx={{ width: 60, height: 60 }}
            color="inherit"
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mt={1}>
          <Typography variant="h5">{name}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ my: 1 }}
        >
          <Divider variant="middle" flexItem sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-start">
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            APR
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            {loading ? <LoadingDots /> : `${fNumber(data.apr, 2, true)}%`}
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-start">
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            TVL
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            {loading ? <LoadingDots /> : fCurrency(data.tvl)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
