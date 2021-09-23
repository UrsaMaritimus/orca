import { useEffect, FC } from 'react';

import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { Typography, Stack, Box, Grid } from '@mui/material';
import { parseBalance } from '@orca/util';

import { styled } from '@mui/material/styles';

import contractAddresses from '@orca/shared/deployments';
import { ORCA__factory } from '@orca/shared/contracts';
import { orcaBalance } from '@orca/shared/funcs';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

const BalanceStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_80],
  maxWidth: '175px',
}));

const OrcaBalance: FC = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch = typeof account === 'string' && !!library;
  const { data: balance, mutate: orcaMutate } = useSWR(
    shouldFetch ? ['orcaBalance', library, chainId, account] : null,
    orcaBalance()
  );
  useKeepSWRDataLiveAsBlocksArrive(orcaMutate);

  useEffect(() => {
    const orca = ORCA__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.ORCA.address
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.ORCA.address
        : null,
      library
    );

    const balanceChange = orca.filters.Transfer();
    orca.on(balanceChange, (from, to, balance) => {
      if (from === account || to === account) {
        orcaMutate(undefined, true);
      }
    });

    return () => {
      orca.removeAllListeners(balanceChange);
    };
  }, [library, account, orcaMutate, chainId]);

  return (
    <BalanceStyle>
      <Grid container alignItems="center">
        <Grid item xs={3} display="flex" justifyContent="center">
          <Box
            component="img"
            src={'/static/cryptos/ic_orca.svg'}
            sx={{
              width: 30,
              height: 30,
              mr: 1,
            }}
            color="inherit"
          />
        </Grid>
        <Grid item xs={9} display="flex" justifyContent="center">
          <Typography
            variant="button"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light' ? 'grey.600' : 'grey.200',
            }}
            textAlign="center"
          >
            {balance ? parseBalance(balance) : '0'} ORCA
          </Typography>
        </Grid>
      </Grid>
    </BalanceStyle>
  );
};

export default OrcaBalance;
