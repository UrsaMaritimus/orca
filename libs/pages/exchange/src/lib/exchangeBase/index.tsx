/* eslint-disable-next-line */
import { useState, FC } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Grid,
  Container,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/core';

import { Page } from '@orca/components/page';
import { AVALANCHE_TESTNET_PARAMS } from '@orca/util';

import {
  usdBalance,
  avaiBalance,
  usdBalanceExchange,
} from '@orca/shared/funcs';

import { Mint } from './mint';
import { Redeem } from './redeem';

//-----------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

const CollateralStyle = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

type ExchangeProps = {
  token: string;
};

export const ExchangeBase: FC<ExchangeProps> = ({ token }) => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Get avai balance
  const { data: userAvaiBalance, mutate: avaiBalanceMutate } = useSWR(
    shouldFetch ? [`avaiBalanceMint${token}`, library, chainId, account] : null,
    avaiBalance()
  );

  // Get usdc balance
  const { data: userUSDBalance, mutate: usdcBalanceMutate } = useSWR(
    shouldFetch
      ? [`usdcBalanceMint${token}`, library, chainId, account, token]
      : null,
    usdBalance()
  );

  // Get usdc balance of exchange
  const { data: exchangeUSDBalance, mutate: usdcBalanceExchangeMutate } =
    useSWR(
      shouldFetch
        ? [`usdcBalanceExchangeMint${token}`, library, chainId]
        : null,
      usdBalanceExchange()
    );

  // For tabs
  const [view, changeView] = useState<'mint' | 'redeem'>('mint');
  const handleChangeView = () => {
    changeView(view === 'mint' ? 'redeem' : 'mint');
  };

  if (chainId === 43114) {
    return (
      <Container maxWidth="md">
        <Box>
          <Stack>
            <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
              {' '}
              Main Net not deployed yet. Please switch to Fuji.
            </Typography>

            {library && (
              <Button
                sx={{ m: 'auto' }}
                size="large"
                variant="contained"
                onClick={() => {
                  library.provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [AVALANCHE_TESTNET_PARAMS],
                  });
                }}
              >
                Add FUJI Network
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    );
  }

  if (typeof account !== 'string')
    return (
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">Not connected to metamask.</Container>
      </RootStyle>
    );
  // Default return
  return (
    <RootStyle title={`Exchange ${token} | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="sm">
        <Card
          sx={{
            mb: 3,
            height: 180,
            position: 'relative',
          }}
        >
          <CardHeader
            title={`${token} Exchange`}
            subheader={`Swap your ${token} for AVAI!`}
          />
          <CollateralStyle>
            <Grid container justifyContent="center">
              <Grid item>
                <ToggleButtonGroup value={view} onChange={handleChangeView}>
                  <ToggleButton
                    value="mint"
                    aria-label="mint"
                    size="large"
                    sx={{ width: 100 }}
                  >
                    <Typography variant="h6">Mint</Typography>
                  </ToggleButton>
                  <ToggleButton
                    value="redeem"
                    aria-label="redeem"
                    size="large"
                    sx={{ width: 100 }}
                  >
                    <Typography variant="h6">Redeem</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </CollateralStyle>
        </Card>
      </Container>
      {view === 'mint' && userUSDBalance && exchangeUSDBalance && (
        <Mint
          token={token}
          library={library}
          chainId={chainId}
          account={account}
          usdBalance={userUSDBalance}
          exchangeBalance={exchangeUSDBalance}
        />
      )}
      {view === 'redeem' && <Redeem />}
    </RootStyle>
  );
};

export default ExchangeBase;
