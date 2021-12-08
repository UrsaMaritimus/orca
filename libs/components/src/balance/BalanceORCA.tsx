import { useEffect, FC } from 'react';
import Image from 'next/image';
import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { Typography, Stack, Button } from '@mui/material';
import { parseBalance } from '@orca/util';
import { useSetRecoilState } from 'recoil';
import { styled } from '@mui/material/styles';

import { ORCA__factory, DeployedContracts } from '@orca/shared';
import { orcaBalance } from '@orca/web3';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { seeORCA } from './atom';

const BalanceStyle = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  margin: theme.spacing(1),

  backgroundColor: theme.palette.grey[500_80],
  maxWidth: '175px',
}));

const OrcaBalance: FC = () => {
  const setSeeORCA = useSetRecoilState(seeORCA);
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
        ? DeployedContracts.fuji.ORCA.address
        : chainId === 43114
        ? DeployedContracts.main.ORCA.address
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

  const changeSeeORCA = () => {
    setSeeORCA((seeORCA) => {
      return seeORCA ? false : true;
    });
  };

  return (
    <BalanceStyle onClick={changeSeeORCA}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Image
          src={'/static/cryptos/ic_orca.svg'}
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
          {balance ? parseBalance(balance) : '0'} ORCA
        </Typography>
      </Stack>
    </BalanceStyle>
  );
};

export default OrcaBalance;
