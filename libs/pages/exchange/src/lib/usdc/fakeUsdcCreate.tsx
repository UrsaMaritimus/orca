/* eslint-disable-next-line */
import { useState, FC } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Container,
  Typography,
  Stack,
  Box,
  Button,
} from '@material-ui/core';

import { mintFakeUSDC } from '@orca/shared/funcs';
import { BigNumber, utils } from 'ethers';
import { fNumber } from '@orca/util';
import { handleTransaction } from '@orca/components/transaction';

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
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  // For minting USDC
  const handleMintUSDC = async () => {
    const transaction = await handleTransaction({
      transaction: mintFakeUSDC(
        library,
        chainId,
        utils.parseUnits('1000', 6),
        token
      ),
      messages: {
        loading: 'Minting USDC...',
        success: 'Succesfully minted!',
        error: 'Failed to mint USDC.',
      },
    });
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
          <Box sx={{ mx: 15 }}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent={'space-between'}
                sx={{ mt: 2 }}
              >
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  textAlign="left"
                >
                  Balance:
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  textAlign="right"
                >
                  {`${fNumber(
                    Number(utils.formatUnits(usdBalance, 6)),
                    2
                  )} ${token}`}
                </Typography>
              </Stack>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ ml: 6 }}
                  onClick={handleMintUSDC}
                >
                  Mint 1000 USDC
                </Button>
              </div>
            </Stack>
          </Box>
        </CollateralStyle>
      </Card>
    </Container>
  );
};

export default FakeUSDCFaucet;
