import { useLayoutEffect, useRef, FC, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import useSWR from 'swr';
import { Grid, Paper, Box, Typography, Divider, Stack } from '@mui/material';
import { toast } from 'react-hot-toast';

import { BigNumber, utils } from 'ethers';
import LoadingButton from '@mui/lab/LoadingButton';
import { handleTransaction } from '@orca/components/transaction';
import { getTotalRewardBalance, depositFarm } from '@orca/shared/funcs';
import { tokenInfo } from '@orca/shared/base';
import {
  injected,
  AVALANCHE_MAINNET_PARAMS,
  AVALANCHE_TESTNET_PARAMS,
  fNumber,
} from '@orca/util';

export const YourFarmInfo: FC = () => {
  const [depositing, setDepositing] = useState<boolean>(false);
  const { activate, chainId, account, setError, library } = useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();
  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  const onClickConnect = () => {
    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        toast.error('User rejected metamask');
      } else if (error instanceof UnsupportedChainIdError) {
        injected.getProvider().then((provider) => {
          provider
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                process.env.NODE_ENV === 'development'
                  ? AVALANCHE_TESTNET_PARAMS
                  : AVALANCHE_MAINNET_PARAMS,
              ],
            })
            .then(() => {
              activate(
                injected,
                (error) => {
                  console.log(error.message);
                },
                false
              );
            })
            .catch((error: any) => {
              setError(error);
            });
        });
      } else {
        toast.error(error.message);
        setError(error);
      }
    });
  };

  const shouldFetch = typeof account === 'string';
  const { data: rewardTokenPending, mutate: mutateRewardTokenPending } = useSWR(
    shouldFetch ? ['totalRewardPending', library, account, chainId] : null,
    getTotalRewardBalance()
  );

  const handleClaim = async () => {
    if (rewardTokenPending) {
      rewardTokenPending.forEach(async (val) => {
        setDepositing(true);
        await handleTransaction({
          transaction: depositFarm(library, chainId, Number(val.pid), 0),
          messages: {
            loading: `Claiming reward...`,
            success: 'Succesfully claimed!',
            error: `Failed to claim.`,
          },
          mutates: [mutateRewardTokenPending],
          chainId,
        });
        setDepositing(false);
      });
    }
  };

  return (
    <Paper
      sx={{
        mt: 2,
        mb: 2,
        mx: 1.5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        boxShadow: 5,
      }}
    >
      <Grid container sx={{ p: 3, pb: 2.5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Box
            component="img"
            src={tokenInfo['ORCA'].icon}
            sx={{ width: 60, height: 60 }}
            color="inherit"
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mt={1}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h5">ORCA to Claim: </Typography>
            <Typography variant="h5" color="secondary.main">
              {shouldFetch
                ? rewardTokenPending
                  ? fNumber(
                      Number(
                        utils.formatEther(
                          rewardTokenPending.reduce((prev, now) => {
                            return prev.add(now.pending);
                          }, BigNumber.from(0))
                        )
                      ),
                      2,
                      true
                    )
                  : 0
                : '-'}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ my: 1 }}
        >
          <Divider variant="middle" flexItem sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mt={1}>
          <LoadingButton
            size="large"
            variant="contained"
            onClick={shouldFetch ? handleClaim : onClickConnect}
            loading={depositing}
            disabled={
              shouldFetch &&
              rewardTokenPending &&
              rewardTokenPending
                .reduce((prev, now) => {
                  return prev.add(now.pending);
                }, BigNumber.from(0))
                .isZero()
            }
          >
            {!shouldFetch ? 'Connect' : 'Claim (All Farms)'}
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};
