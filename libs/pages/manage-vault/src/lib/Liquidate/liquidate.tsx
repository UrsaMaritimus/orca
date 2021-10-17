import { useState, FC } from 'react';
import { useRouter } from 'next/router';

// material
import { Grid, Stack, Typography, Button, Backdrop } from '@mui/material';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';

import LoadingButton from '@mui/lab/LoadingButton';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { routes, tokenInfo } from '@orca/shared/base';
import { fCurrency, fNumber } from '@orca/util';
import { BigNumber, utils } from 'ethers';
import {
  avaiApproved,
  approveAvai,
  liquidateVault,
  avaiBalance,
} from '@orca/shared/funcs';
import {
  handleTransaction,
  useAddTransaction,
} from '@orca/components/transaction';
import { Loader } from '@orca/components/loader';

// ----------------------------------------------------------------------

export type LiquidateProps = {
  token: 'AVAX' | 'ETH' | 'BTC';
  vaultID: number;
  isOwner?: boolean;
  vaultInfo: {
    collateral: BigNumber;
    debt: BigNumber;
    LTV: BigNumber;
    maxLTV: number;
    maxLTVUSD: BigNumber;
    borrowingPowerAvailable: BigNumber;
    borrowingPowerAvailableUSD: BigNumber;
    borrowingPowerUsed: BigNumber;
    borrowingPowerUsedUSD: BigNumber;
    tokenPrice: BigNumber;
    availableWithdraw: BigNumber;
    peg: BigNumber;
    mcp: BigNumber;
  };
};

export const LiquidateVault: FC<LiquidateProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  const [liquidating, setLiquidating] = useState<boolean>(false);
  const router = useRouter();
  const addTransaction = useAddTransaction();
  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch =
    typeof account === 'string' && !!library && vaultInfo.debt;

  // Get avai balance
  const { data: userAvaiBalance, mutate: avaiBalanceMutate } = useSWR(
    shouldFetch ? ['avaiBalanceLiquidate', library, chainId, account] : null,
    avaiBalance()
  );

  // mutates
  useKeepSWRDataLiveAsBlocksArrive(avaiBalanceMutate);

  const handleLiquidate = async () => {
    setLiquidating(true);
    const success = await handleTransaction({
      transaction: liquidateVault(
        library,
        chainId,
        tokenInfo[token].erc20,
        vaultID
      ),
      messages: {
        loading: 'Liquidating vault...',
        success: 'Succesfully liquidated!',
        error: 'Failed to liquidate vault.',
      },
      mutates: [avaiBalanceMutate],
      chainId,
    });
    addTransaction({
      type: 'liquidate',
      amount: vaultInfo.debt.div(2),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    setLiquidating(false);
    if (success.success) router.push(routes.APP.VAULTS.MONITOR);
  };

  return (
    <Grid container>
      <Backdrop sx={{ position: 'absolute', zIndex: 99 }} open={liquidating}>
        <Loader />
      </Backdrop>
      <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
        <Stack alignItems="center">
          <Typography variant="h6" textAlign="center">
            AVAI Needed to Pay Debt
          </Typography>
          <Typography variant="inherit">
            {fNumber(Number(utils.formatEther(vaultInfo.debt.div(2))))} AVAI
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            {fNumber(
              Number(
                utils.formatEther(
                  vaultInfo.debt
                    .mul(vaultInfo.peg)
                    .div(vaultInfo.tokenPrice.mul(2))
                )
              )
            )}{' '}
            {tokenInfo[token].display}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack alignItems="center">
          <Typography variant="h6" textAlign="center">
            {`${tokenInfo[token].display} Reward from Liquidating`}
          </Typography>
          <Typography variant="inherit">
            {fNumber(
              Number(
                utils.formatEther(
                  vaultInfo.debt
                    .mul(11)
                    .mul(vaultInfo.peg)
                    .div(vaultInfo.tokenPrice.mul(10).mul(2))
                )
              )
            )}{' '}
            {tokenInfo[token].display}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            {fCurrency(
              Number(utils.formatEther(vaultInfo.debt.mul(11).div(20)))
            )}
          </Typography>
        </Stack>
      </Grid>
      {userAvaiBalance && userAvaiBalance.gte(vaultInfo.debt.div(2)) && (
        <Grid item sm={12} alignItems="center" sx={{ mt: 2 }}>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <LoadingButton
              color="primary"
              variant="contained"
              size="large"
              onClick={handleLiquidate}
              loading={liquidating}
            >
              Liquidate
            </LoadingButton>
          </Stack>
        </Grid>
      )}
      {userAvaiBalance && !userAvaiBalance.gte(vaultInfo.debt.div(2)) && (
        <Grid
          item
          sm={12}
          display="flex"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Typography sx={{ mt: 2 }}>
            Need {utils.formatEther(vaultInfo.debt.div(2))} AVAI to liquidate
            this vault{' '}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default LiquidateVault;
