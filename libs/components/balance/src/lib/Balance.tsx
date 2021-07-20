import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAVAXBalance } from '@ursa/hooks';
import Typography from '@material-ui/core/Typography';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { useTheme } from 'next-themes';

const BalanceStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2.5),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

const AvaxBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useAVAXBalance(account as string);

  const { theme, systemTheme } = useTheme();
  const themeMode = ((theme === 'system' ? systemTheme : theme) ?? 'dark') as
    | 'light'
    | 'dark';

  return (
    <BalanceStyle>
      <Typography
        variant="h6"
        sx={{ color: theme === 'light' ? 'grey.600' : 'grey.200' }}
      >
        {data} AVAX
      </Typography>
    </BalanceStyle>
  );
};

export default AvaxBalance;
