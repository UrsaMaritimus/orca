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
import { Page } from '@orca/components/page';

import { AvaiOrcaFarm } from './AVAI-ORCA';
import { AvaiUsdcFarm } from './AVAI-USDC';
import { AvaxOrcaFarm } from './AVAX-ORCA';
import { SingularFarm } from './partner/singular';
import { AvawareFarm } from './partner/avaware';
import { LydiaFarm } from './partner/lydia';
import { XOrcaFarm } from './xORCA';
import { NextLink } from '@orca/components/links';

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
                  Second Note: There is a vote currently ongoing that may alter
                  these APRs starting Dec. 1st:{' '}
                  <NextLink
                    href="https://vote.avai.finance/#/proposal/0x15abce61c06393781621b37461c4763b0c222dd3bb5b6ba97fcff9caba582fc4"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    See here.
                  </NextLink>
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

        <SingularFarm />
        <AvawareFarm />
        <LydiaFarm />
      </Container>
    </RootStyle>
  );
};

export default Farming;
