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
  Stack,
  Paper,
} from '@mui/material';
import { Page } from '@orca/components/page';
import { OrcaStaking } from './Staking';
import { StormStaking } from './Partner/Storm';
import { useFrontPageStats } from './xORCA/useFrontPageStats';
import { fPercent } from '@orca/util';

// -------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

// -------------------------------------------------------

export const Staking: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();

  const { loading, data } = useFrontPageStats();

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
