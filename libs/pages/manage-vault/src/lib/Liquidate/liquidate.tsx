import { useState, FC } from 'react';
import { useRouter } from 'next/router';

// material
import { Grid, Stack, Typography, Button } from '@material-ui/core';

import toast from 'react-hot-toast';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';

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

// ----------------------------------------------------------------------

type LiquidateProps = {
  token: string;
  vaultID: number;
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
  const router = useRouter();
  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch =
    typeof account === 'string' && !!library && vaultInfo.debt;

  //Avai is approved
  const { data: approved, mutate: avaiMutate } = useSWR(
    shouldFetch
      ? [
          'avaiApproved',
          library,
          account,
          chainId,
          vaultInfo.debt,
          tokenInfo[token as string].erc20,
        ]
      : null,
    avaiApproved()
  );
  // Get avai balance
  const { data: userAvaiBalance, mutate: avaiBalanceMutate } = useSWR(
    shouldFetch ? ['avaiApproved', library, chainId, account] : null,
    avaiBalance()
  );

  // mutates
  useKeepSWRDataLiveAsBlocksArrive(avaiMutate);
  useKeepSWRDataLiveAsBlocksArrive(avaiBalanceMutate);

  const handleApproveAvai = async () => {
    try {
      const result = await approveAvai(
        library,
        chainId,
        utils.parseEther('100000000'),
        tokenInfo[token as string].erc20
      );

      await toast.promise(
        result.wait(1),
        {
          loading: 'Approving AVAI...',
          success: <b>Succesfully approved!</b>,
          error: <b>Failed to approve AVAI.</b>,
        },
        {
          style: {
            minWidth: '100px',
          },
          loading: {
            duration: Infinity,
          },
          success: {
            duration: 5000,
          },
        }
      );
      avaiMutate(undefined, true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLiquidate = async () => {
    try {
      console.log(vaultID);
      const result = await liquidateVault(
        library,
        chainId,
        tokenInfo[token as string].erc20,
        vaultID
      );

      await toast.promise(
        result.wait(1),
        {
          loading: 'Liquidating vault...',
          success: <b>Succesfully liquidated!</b>,
          error: <b>Failed to liquidate vault.</b>,
        },
        {
          style: {
            minWidth: '100px',
          },
          loading: {
            duration: Infinity,
          },
          success: {
            duration: 5000,
          },
        }
      );
      avaiMutate(undefined, true);
      avaiBalanceMutate(undefined, true);
      router.push(routes.APP.VAULTS.MONITOR);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item sm={6}>
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
            {token}
          </Typography>
        </Stack>
      </Grid>
      <Grid item sm={6}>
        <Stack alignItems="center">
          <Typography variant="h6" textAlign="center">
            AVAX Reward from Liquidating
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
            {token}
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
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ mr: 1 }}
              disabled={approved}
              onClick={handleApproveAvai}
            >
              Approve AVAI
            </Button>{' '}
            <Button
              color="primary"
              variant="contained"
              size="large"
              disabled={!approved}
              onClick={handleLiquidate}
            >
              Liquidate
            </Button>
          </Stack>
        </Grid>
      )}
      {userAvaiBalance && !userAvaiBalance.gte(vaultInfo.debt.div(2)) && (
        <Grid item sm={12} justifyContent="center" sx={{ mt: 2 }}>
          <Stack alignItems="center">
            <Typography sx={{ mt: 2 }}>
              Need {utils.formatEther(vaultInfo.debt.div(2))} AVAI to liquidate
              this vault{' '}
            </Typography>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default LiquidateVault;
