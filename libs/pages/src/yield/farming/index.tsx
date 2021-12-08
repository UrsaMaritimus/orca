import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
  Card,
  CardHeader,
  Container,
  Box,
  Typography,
  Grid,
} from '@mui/material';
import { Page, Link } from '@orca/components';

import { AvaiOrcaFarm } from './AVAI-ORCA';
import { AvaiUsdcFarm } from './AVAI-USDC';
import { AvaxOrcaFarm } from './AVAX-ORCA';
import { SingularFarm } from './partner/singular';
import { AvawareFarm } from './partner/avaware';
import { LydiaFarm } from './partner/lydia';
import { XOrcaFarm } from './xORCA';
import { AxialSwapFarm } from './partner/axial';
import { PangoOrcaFarm } from './partner/png-orca';
import { PangoAvaiFarm } from './partner/png-avai';
import { GondolaFarm } from './partner/gondola';
import { ElkAvaiFarm } from './partner/elk';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export const Farming: FC = () => {
  const { account, chainId } = useWeb3React<Web3Provider>();

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
            height: 150,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Yield Farming'}
            subheader={'Stake your tokens and earn rewards!'}
            action={
              <Box
                maxWidth="sm"
                sx={{
                  pt: 2,
                  pb: 2,
                  borderRadius: 1,
                  bgcolor: 'warning.light',
                }}
              >
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="grey.600"
                  sx={{ mx: 2 }}
                >
                  Note: There is a Deposit fee of 0.75%, except for xORCA.
                  ORCA/AVAI is now closed, please remove liquidity from the
                  farm.
                </Typography>
              </Box>
            }
          />
        </Card>
        {(chainId === 43114 || !chainId) && (
          <AvaiOrcaFarm
            account={account}
            expanded={expanded}
            handleChange={handleChange}
            chainId={chainId}
          />
        )}
        <AvaiUsdcFarm
          account={account}
          expanded={expanded}
          handleChange={handleChange}
          chainId={chainId}
        />
        {(chainId === 43114 || !chainId) && (
          <AvaxOrcaFarm
            account={account}
            expanded={expanded}
            handleChange={handleChange}
            chainId={chainId}
          />
        )}
        <XOrcaFarm
          account={account}
          expanded={expanded}
          handleChange={handleChange}
          chainId={chainId}
        />

        <Card
          sx={{
            mt: 6,
            mb: 3,
            height: 100,
            position: 'relative',
          }}
        >
          <CardHeader
            title={'Partner Farms'}
            subheader={'Utilize AVAI and ORCA'}
          />
        </Card>
        <PangoOrcaFarm />
        <PangoAvaiFarm />
        <AxialSwapFarm />
        <ElkAvaiFarm />
        <GondolaFarm />
        <AvawareFarm />
        <SingularFarm />
      </Container>
    </RootStyle>
  );
};

export default Farming;
