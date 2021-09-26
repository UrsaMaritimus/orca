import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Card, CardHeader, Container, Box, Typography } from '@mui/material';
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
            height: 100,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Yield Farming'}
            subheader={'Stake your tokens and earn rewards!'}
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
        <Box
          sx={{
            pt: 2,
            pb: 2,
            mr: 1,
            ml: 1,
            mt: 3,
            mb: 3,
            borderRadius: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.400' : 'warning.light',
          }}
        >
          <Typography variant="h6" textAlign="center" color="grey.600">
            Note: There is a Deposit fee in these farms of 0.75%
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default Farming;
