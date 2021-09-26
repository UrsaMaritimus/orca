/* eslint-disable-next-line */
import { useState, FC } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import {
  Card,
  CardHeader,
  Typography,
  Grid,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';

import { usdBalance, avaiBalance, exchangeInfo } from '@orca/shared/funcs';

import { Mint } from './mint';
import { Redeem } from './redeem';
import { FakeUSDCFaucet } from '../usdc/fakeUsdcCreate';
import { Loader } from '@orca/components/loader';

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
  token: 'USDC';
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
      ? [`usdBalanceMint${token}`, library, chainId, account, token]
      : null,
    usdBalance()
  );
  // Get usdc balance of exchange
  const { data: usdcExchangeInfo, mutate: usdcExchangeInfoMutate } = useSWR(
    shouldFetch ? [`usdExchangeInfo${token}`, library, chainId] : null,
    exchangeInfo()
  );
  useKeepSWRDataLiveAsBlocksArrive(usdcExchangeInfoMutate);
  useKeepSWRDataLiveAsBlocksArrive(usdcBalanceMutate);
  useKeepSWRDataLiveAsBlocksArrive(avaiBalanceMutate);

  // For tabs
  const [view, changeView] = useState<'mint' | 'redeem'>('mint');
  const handleChangeView = () => {
    changeView(view === 'mint' ? 'redeem' : 'mint');
  };

  // Default return
  return (
    <Connect title={`Exchange ${token}`}>
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
        {view === 'mint' &&
          (userUSDBalance && usdcExchangeInfo ? (
            <Mint
              token={token}
              library={library}
              chainId={chainId}
              account={account}
              usdBalance={userUSDBalance}
              exchangeBalance={usdcExchangeInfo.reserves}
              mintingFee={usdcExchangeInfo.mintingFee}
              mutates={[avaiBalanceMutate, usdcBalanceMutate]}
            />
          ) : (
            <Container maxWidth="sm">
              <Card>
                <Loader />
              </Card>
            </Container>
          ))}
        {view === 'redeem' &&
          (userUSDBalance && usdcExchangeInfo ? (
            <Redeem
              token={token}
              library={library}
              chainId={chainId}
              account={account}
              avaiBalance={userAvaiBalance}
              exchangeBalance={usdcExchangeInfo.reserves}
              mintingFee={usdcExchangeInfo.mintingFee}
              mutates={[avaiBalanceMutate, usdcBalanceMutate]}
            />
          ) : (
            <Container maxWidth="sm">
              <Card>
                <Loader />
              </Card>
            </Container>
          ))}
        {chainId === 43113 && userUSDBalance && (
          <FakeUSDCFaucet token={token} usdBalance={userUSDBalance} />
        )}
      </RootStyle>
    </Connect>
  );
};

export default ExchangeBase;
