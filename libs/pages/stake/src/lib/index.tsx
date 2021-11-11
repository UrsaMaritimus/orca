import { FC, useState } from 'react';
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
import { StormStaking } from './Partner/Storm';
import exp from 'constants';

// -------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

// -------------------------------------------------------

export const Staking: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const { loading, data } = useMonitorFarms(account, chainId);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  // Default return
  return (
    <RootStyle title={`Staking | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="md">
        <Card
          sx={{
            mb: 3,
            height: { md: 180, sm: 300 },
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Staking'}
            subheader={
              'Stake your ORCA and earn protocol revenue through xORCA! 40% of all revenue is reflected right back into xORCA by buying back ORCA, meaning when you withdraw xORCA, you get all original ORCA back along with your portion of the revenue. Buybacks of ORCA will occur every 48 hours currently.'
            }
            action={
              <Paper
                sx={{
                  pt: 1,
                  pb: 1.5,
                  mb: 1,
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                  boxShadow: 5,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Grid container>
                  <Grid item sm={12} justifyContent="center" display="flex">
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      Staking APR
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
                      <Typography variant="h5">TBD</Typography>
                      <Typography variant="h5">
                        {tokenInfo['AVAX'].display}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sm={12} display="flex" justifyContent="center">
                    <Typography variant="caption">
                      Average over last 7 Days
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            }
          />
        </Card>

        <OrcaStaking account={account} chainId={chainId} />

        <Card
          sx={{
            my: 3,
            height: 115,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Partner Staking'}
            subheader={'Stake your ORCA and earn partner tokens!'}
          />
        </Card>

        <StormStaking
          account={account}
          chainId={chainId}
          handleChange={handleChange}
          expanded={expanded}
        />
      </Container>
    </RootStyle>
  );
};

export default Staking;
