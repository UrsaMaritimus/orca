import { useEffect, FC } from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';

import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

import { Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { parseBalance } from '@orca/util';
import { AVAI__factory, DeployedContracts } from '@orca/shared';
import { avaiBalance } from '@orca/web3';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import { seeAVAI } from './atom';

const BalanceStyle = styled('div')(({ theme }) => ({
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
        ? DeployedContracts.fuji.AVAI.address
        : chainId === 43114
        ? DeployedContracts.main.AVAI.address
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
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image
          src={'/static/cryptos/ic_avai.svg'}
          width={30}
          height={30}
          color="inherit"
        />
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
      </Stack>
    </BalanceStyle>
  );
};

export default AvaiBalance;
