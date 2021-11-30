import type { Web3Provider } from '@ethersproject/providers';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import { useAVAXBalance } from '@orca/hooks';
import { Typography, Stack } from '@mui/material';

import { styled } from '@mui/material/styles';

import { useTheme } from 'next-themes';

const BalanceStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_80],
}));

const AvaxBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useAVAXBalance(account as string);

  const { theme } = useTheme();

  return (
    <BalanceStyle>
      <Stack direction="row" spacing={1} alignItems="center">
        <Image
          src={'/static/cryptos/ic_avax.svg'}
          width={30}
          height={30}
          color="inherit"
        />
        <Typography
          variant="button"
          sx={{ color: theme === 'light' ? 'grey.800' : 'grey.200' }}
        >
          {data} AVAX
        </Typography>
      </Stack>
    </BalanceStyle>
  );
};

export default AvaxBalance;
