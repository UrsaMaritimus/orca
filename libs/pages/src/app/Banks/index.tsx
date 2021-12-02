import { FC } from 'react';
import { Grid, Card, CardHeader, Box } from '@mui/material';

import { Loader } from '@orca/components';

import { useFrontPageInfo } from '../graph/useFrontPageAnalytics';
import BankInfo from './BankInfo';
import { Infomatic } from './Infomatic';
import { Stats } from './Stats';

export const BanksAnalytics: FC = () => {
  const { loading, data } = useFrontPageInfo();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Infomatic />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid item xs={12}>
          {!loading && <BankInfo data={data.indivBanks} />}
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
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ position: 'relative' }}>
          <CardHeader title="Statistics" subheader="About the Orca DAO" />
          <Stats />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BanksAnalytics;
