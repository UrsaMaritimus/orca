import { FC } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
} from '@mui/material';
import { Page } from '@orca/components/page';
import { OrcaStaking } from './Staking';
import { useMonitorFarms } from './StakeData/getYieldData';
import { tokenInfo } from '@orca/shared/base';
import { fNumber } from '@orca/util';
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export const Staking: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const { loading, data } = useMonitorFarms(account, chainId);
  // Default return
  return (
    <RootStyle title={`Staking | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="md">
        <Card
          sx={{
            mb: 3,
            height: 115,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Staking'}
            subheader={'Stake your ORCA and earn protocol revenue!'}
            action={
              <Paper
                sx={{
                  pt: 1,
                  pb: 1.5,
                  px: 1.5,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                  boxShadow: 5,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Grid container>
                  <Grid item sm={12} justifyContent="center" display="flex">
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      Rewards
                    </Typography>
                  </Grid>
                  <Grid item sm={12} display="flex" justifyContent="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        component="img"
                        src={tokenInfo['AVAX'].icon}
                        sx={{
                          width: 25,

                          height: 25,
                        }}
                        color="inherit"
                      />
                      <Typography variant="h5">
                        {data ? fNumber(data.rewardPerDay, 0) : 0}
                      </Typography>
                      <Typography variant="h5">
                        {tokenInfo['AVAX'].display}
                      </Typography>
                      <Typography variant="h5">per Day</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            }
          />
        </Card>

        <OrcaStaking account={account} chainId={chainId} />
      </Container>
    </RootStyle>
  );
};

export default Staking;
