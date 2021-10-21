/* eslint-disable-next-line */
import { useState, FC } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';
import { Card, CardHeader, Container, Typography, Grid } from '@mui/material';

import { mintFakeUSDC } from '@orca/shared/funcs';
import { BigNumber, utils } from 'ethers';
import { fNumber } from '@orca/util';
import { handleTransaction } from '@orca/components/transaction';
import LoadingButton from '@mui/lab/LoadingButton';

//-----------------------------------------------------------------

const CollateralStyle = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

type ExchangeProps = {
  token: string;
  usdBalance: BigNumber;
};

export const FakeUSDCFaucet: FC<ExchangeProps> = ({ token, usdBalance }) => {
  const [minting, setMinting] = useState<boolean>(false);
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  // For minting USDC
  const handleMintUSDC = async () => {
    setMinting(true);
    await handleTransaction({
      transaction: mintFakeUSDC(
        library,
        chainId,
        utils.parseUnits('1000', 6),
        token
      ),
      messages: {
        loading: 'Minting USDC...',
        success: 'successfully minted!',
        error: 'Failed to mint USDC.',
      },
      chainId,
    });
    setMinting(false);
  };
  // Default return
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          mb: 3,
          mt: 5,
          height: 220,
          position: 'relative',
        }}
      >
        <CardHeader
          title={`Fake ${token} Faucet`}
          subheader={`Mint some  fake USDC for use in the swap! FUJI testnet only.`}
        />
        <CollateralStyle>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography variant="h6">
                Balance:{' '}
                {`${fNumber(
                  Number(utils.formatUnits(usdBalance, 6)),
                  2
                )} ${token}`}
              </Typography>
            </Grid>

            <Grid item xs={12} mt={2} display="flex" justifyContent="center">
              <LoadingButton
                variant="contained"
                size="large"
                onClick={handleMintUSDC}
                loading={minting}
              >
                Mint 1000 USDC
              </LoadingButton>
            </Grid>
          </Grid>
        </CollateralStyle>
      </Card>
    </Container>
  );
};

export default FakeUSDCFaucet;
