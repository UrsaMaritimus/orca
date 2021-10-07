import { FC, useState } from 'react';

import { Grid, Box, Stack, Typography } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';

import useSWR from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import LoadingButton from '@mui/lab/LoadingButton';
import { utils } from 'ethers';
import { fNumber } from '@orca/util';

import { handleTransaction } from '@orca/components/transaction';
import { depositStaking, getRewardBalanceStaking } from '@orca/shared/funcs';

type ClaimProps = {
  img: string;
  reward: string;
  account: string;
  library: Web3Provider;

  pid: string;
  chainId: number;
};

export const Claim: FC<ClaimProps> = ({
  img,
  reward,
  pid,
  library,
  chainId,
  account,
}) => {
  const [depositing, setDepositing] = useState<boolean>(false);
  const shouldFetch = !!library;

  const { data: rewardTokenPending, mutate: mutateRewardTokenPending } = useSWR(
    shouldFetch
      ? [`${pid}rewardPendingStaking`, library, account, chainId, pid]
      : null,
    getRewardBalanceStaking()
  );

  useKeepSWRDataLiveAsBlocksArrive(mutateRewardTokenPending);

  const handleClaim = async () => {
    setDepositing(true);
    await handleTransaction({
      transaction: depositStaking(library, chainId, Number(pid), 0),
      messages: {
        loading: `Claiming reward...`,
        success: 'Succesfully claimed!',
        error: `Failed to claim.`,
      },
      mutates: [mutateRewardTokenPending],
      chainId,
    });
    setDepositing(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center" my={1}>
        <Box
          component="img"
          src={img}
          sx={{
            width: 50,

            height: 50,
          }}
          color="inherit"
        />
      </Grid>
      <Grid item xs={12} justifyContent="center" display="flex" mb={1}>
        <Stack alignItems="center">
          <Typography variant="h5">Rewards </Typography>
          <Stack direction="row" alignContent="center" spacing={1}>
            <Typography
              variant="body1"
              color="secondary.dark"
              fontWeight="bold"
            >
              {rewardTokenPending
                ? fNumber(utils.formatEther(rewardTokenPending), 4, true)
                : '-'}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {reward}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} justifyContent="center" display="flex">
        <LoadingButton
          variant="contained"
          size="large"
          onClick={handleClaim}
          loading={depositing}
          disabled={
            !shouldFetch || (rewardTokenPending && rewardTokenPending.isZero())
          }
        >
          Claim
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Claim;
