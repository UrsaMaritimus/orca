import { useEffect, FC } from 'react';

import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { Typography, Box, Grid, Button } from '@mui/material';
import { parseBalance } from '@orca/util';
import { useSetRecoilState } from 'recoil';
import { styled } from '@mui/material/styles';

import contractAddresses from '@orca/shared/deployments';
import { AVAI__factory } from '@orca/shared/contracts';
import { avaiBalance } from '@orca/shared/funcs';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { seeAVAI } from './atom';

const BalanceStyle = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_80],
  maxWidth: '150px',
}));

const AvaiBalance: FC = () => {
  const setSeeAVAI = useSetRecoilState(seeAVAI);
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch = typeof account === 'string' && !!library;
  const { data: balance, mutate: avaiMutate } = useSWR(
    shouldFetch ? ['avaiBalance', library, chainId, account] : null,
    avaiBalance()
  );
  useKeepSWRDataLiveAsBlocksArrive(avaiMutate);

  useEffect(() => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI.address
        : chainId === 43114
        ? contractAddresses.main.AVAI.address
        : null,
      library
    );

    const balanceChange = avai.filters.Transfer();
    avai.on(balanceChange, (from, to, balance) => {
      if (from === account || to === account) {
        avaiMutate(undefined, true);
      }
    });

    return () => {
      avai.removeAllListeners(balanceChange);
    };
  }, [library, account, avaiMutate, chainId]);

  const changeSeeAVAI = () => {
    setSeeAVAI((seeAVAI) => {
      return seeAVAI ? false : true;
    });
  };

  return (
    <BalanceStyle onClick={changeSeeAVAI}>
      <Grid container alignItems="center">
        <Grid item xs={3} display="flex" justifyContent="center">
          <Box
            component="img"
            src={'/static/cryptos/ic_avai.svg'}
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
                theme.palette.mode === 'light' ? 'grey.800' : 'grey.200',
            }}
            textAlign="center"
          >
            {balance ? parseBalance(balance) : '0'} AVAI
          </Typography>
        </Grid>
      </Grid>
    </BalanceStyle>
  );
};

export default AvaiBalance;
