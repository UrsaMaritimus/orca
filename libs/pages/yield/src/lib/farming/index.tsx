import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Card, CardHeader, Container, Grid } from '@mui/material';
import { Page } from '@orca/components/page';

import { AvaiFarm } from './AVAI';
import { AvaiUsdcFarm } from './AVAI-USDC';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export const Farming: FC = () => {
  const { account } = useWeb3React<Web3Provider>();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  // Default return
  return (
    <RootStyle title={`Yield Farming | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="md">
        <Card
          sx={{
            mb: 3,
            height: 160,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Yield Farming'}
            subheader={'Coming soon to a Main Net near you!'}
          />
        </Card>
        <AvaiFarm
          account={account}
          expanded={expanded}
          handleChange={handleChange}
        />
        <AvaiUsdcFarm
          account={account}
          expanded={expanded}
          handleChange={handleChange}
        />
      </Container>
    </RootStyle>
  );
};

export default Farming;
