import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Card, CardHeader, Container } from '@mui/material';
import { Page } from '@orca/components';
import { OrcaStaking } from './Staking';
import { StormStaking } from './Partner/Storm';

// -------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

// -------------------------------------------------------

export const Staking: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();

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
      </Container>
    </RootStyle>
  );
};

export default Staking;
