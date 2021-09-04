import { FC } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Button,
  Stack,
} from '@material-ui/core';

import { handleTransaction } from '@orca/components/transaction';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { monitorRewards, getReward } from '@orca/shared/funcs';
import { tokenInfo } from '@orca/shared/base';
import { fNumber } from '@orca/util';
import { utils } from 'ethers';

/* eslint-disable-next-line */
export interface VaultRewardProps {
  token: string;
}

export const VaultReward: FC<VaultRewardProps> = ({ token }) => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  // Grab user's rewards
  const { data: reward, mutate: monitorRewardMutate } = useSwr(
    shouldFetch
      ? ['monitorRewards', library, chainId, tokenInfo[token].erc20, account]
      : null,
    monitorRewards()
  );
  useKeepSWRDataLiveAsBlocksArrive(monitorRewardMutate);

  const handleGetPaid = async () => {
    await handleTransaction({
      transaction: getReward(library, chainId, tokenInfo[token].erc20, account),
      messages: {
        loading: 'Getting reward...',
        success: 'Succesfully claimed reward!',
        error: 'Failed to claim reward.',
      },
      chainId,
    });
  };

  if (typeof account === 'string' && reward && reward.isReward) {
    return (
      <div>
        <Card>
          <CardHeader
            title={`${token} Vault Rewards`}
            subheader={'Rewards gathered from liquidating vault'}
            avatar={
              <Box
                component="img"
                src={tokenInfo[token].icon}
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
          />
          <Stack sx={{ mb: 2 }} alignItems="center">
            <Typography
              variant="h4"
              color="inherit"
              sx={{ mt: 5, mb: 2, textAlign: 'center' }}
            >
              Earned {fNumber(Number(utils.formatEther(reward.reward)))} {token}
              !
            </Typography>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleGetPaid}
              >
                Claim Reward
              </Button>
            </Box>
          </Stack>
        </Card>
      </div>
    );
  }

  return <></>;
};
