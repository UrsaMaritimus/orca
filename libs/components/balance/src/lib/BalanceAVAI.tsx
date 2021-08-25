import { useEffect } from 'react';

import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { Typography, Stack, Box } from '@material-ui/core';
import { parseBalance } from '@orca/util';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { useTheme } from 'next-themes';

import contractAddresses from '@orca/shared/deployments';
import { AVAI__factory } from '@orca/shared/contracts';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

const BalanceStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

const getAVAIBalance = () => {
  return async (
    _: string,
    library: Web3Provider,
    chainId: number,
    address: string
  ) => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI.address
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAI.address
        : null,
      library
    );
    return avai.balanceOf(address);
  };
};

const AvaiBalance = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch = typeof account === 'string' && !!library;
  const { data: balance, mutate: avaiMutate } = useSWR(
    shouldFetch ? ['avaiBalance', library, chainId, account] : null,
    getAVAIBalance()
  );
  const { theme, systemTheme } = useTheme();
  useKeepSWRDataLiveAsBlocksArrive(avaiMutate);

  useEffect(() => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI.address
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAI.address
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

  return (
    <BalanceStyle>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          component="img"
          src={'/static/cryptos/ic_avai.svg'}
          sx={{
            width: 30,

            height: 30,
          }}
          color="inherit"
        />
        <Typography
          variant="h6"
          sx={{ color: theme === 'light' ? 'grey.600' : 'grey.200' }}
        >
          {balance && parseBalance(balance)} AVAI
        </Typography>
      </Stack>
    </BalanceStyle>
  );
};

export default AvaiBalance;
