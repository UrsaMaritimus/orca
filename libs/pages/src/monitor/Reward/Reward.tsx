import { FC, useState } from 'react';
import useSwr from 'swr';

import { utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Card, CardHeader, Box, Typography, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { handleTransaction } from '@orca/components';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { monitorAllRewards, getReward } from '@orca/web3';
import { BankTokenInfo } from '@orca/shared';
import { fNumber } from '@orca/util';

import find from 'lodash/find';

export const VaultReward: FC = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [gettingReward, setGettingReward] = useState<boolean>(false);
  const shouldFetch = !!library;

  // Grab user's rewards
  const { data: rewards, mutate: monitorRewardMutate } = useSwr(
    shouldFetch ? ['monitorRewards', library, chainId, account] : null,
    monitorAllRewards()
  );
  useKeepSWRDataLiveAsBlocksArrive(monitorRewardMutate);

  const handleGetPaid = (token: string) => async () => {
    setGettingReward(true);
    await handleTransaction({
      transaction: getReward(library, chainId, token, account),
      messages: {
        loading: 'Getting reward...',
        success: 'Successfully claimed reward!',
        error: 'Failed to claim reward.',
      },
      chainId,
    });
    setGettingReward(false);
  };

  if (typeof account === 'string' && rewards) {
    return (
      <div>
        {rewards.map((reward) => {
          if (reward.isReward) {
            const collat = find(BankTokenInfo, { erc20: reward.name });
            return (
              <Card sx={{ my: 3 }}>
                <CardHeader
                  title={`${collat.display} Vault Rewards`}
                  subheader={'Rewards gathered from liquidating vault'}
                  avatar={
                    <Box
                      component="img"
                      src={collat.icon}
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
                    Earned{' '}
                    {collat.underlyingDecimals
                      ? Number(
                          utils.formatUnits(reward.reward, collat.decimals)
                        ).toExponential()
                      : fNumber(
                          Number(
                            utils.formatUnits(reward.reward, collat.decimals)
                          )
                        )}{' '}
                    {collat.display}!
                  </Typography>
                  <Box>
                    <LoadingButton
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={handleGetPaid(collat.erc20)}
                      loading={gettingReward}
                    >
                      Claim Reward
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            );
          }
          return <></>;
        })}
      </div>
    );
  }

  return <></>;
};
