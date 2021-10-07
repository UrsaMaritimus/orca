import { FC } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Card, CardHeader, Container } from '@mui/material';
import { Page } from '@orca/components/page';
import { OrcaStaking } from './Staking';
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export const Staking: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();

  // Default return
  return (
    <RootStyle title={`Staking | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="md">
        <Card
          sx={{
            mb: 3,
            height: 100,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Staking'}
            subheader={'Stake your ORCA and earn protocol revenue!'}
          />
        </Card>

        <OrcaStaking account={account} chainId={chainId} />
      </Container>
    </RootStyle>
  );
};

export default Staking;
