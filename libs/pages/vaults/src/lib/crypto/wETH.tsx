import { FC, useState } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import plusFill from '@iconify/icons-eva/plus-fill';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  Stack,
  Popover,
  IconButton,
} from '@mui/material';

import { Loader } from '@orca/components/loader';
import { MainTable } from '@orca/components/table';
import { fShortenNumber } from '@orca/util';
import { makeVault, getContract, bankPrice } from '@orca/shared/funcs';
import { handleTransaction } from '@orca/components/transaction';
import { useBankInfoSubscription } from '@orca/graphql';
import { useGetVaults } from './useVault';

/* eslint-disable-next-line */
export interface PagesVaultsProps {
  account: string;
  library: Web3Provider;
  chainId: number;
}

export const EthVaults: FC<PagesVaultsProps> = ({
  account,
  library,
  chainId,
}) => {
  const { loading, rows } = useGetVaults(library, chainId, account, 'weth');
  const { data: bankData } = useBankInfoSubscription({
    variables: { id: getContract(chainId, 'weth').toLowerCase() },
  });

  // For creating a vault
  const createVault = async () => {
    await handleTransaction({
      transaction: makeVault(library, 'weth', chainId),
      messages: {
        loading: 'Creating vault...',
        success: 'Vault created!',
        error: 'Vault failed to be created.',
      },
      chainId,
    });
  };

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  if (typeof account === 'string' && !loading) {
    return (
      <div>
        <Card>
          <CardHeader
            title={'wETH.e Vaults'}
            avatar={
              <Box
                component="img"
                src="/static/cryptos/ic_eth.svg"
                sx={{ width: 35, height: 35 }}
                color="inherit"
              />
            }
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon icon={plusFill} />}
                onClick={createVault}
                size="medium"
              >
                Create Vault
              </Button>
            }
          />
          {rows.length > 0 ? (
            <MainTable rows={rows} collateralType={'ETH'} debtType={'AVAI'} />
          ) : (
            <Typography
              variant="h4"
              color="inherit"
              sx={{ mt: 2, mb: 2, textAlign: 'center' }}
            >
              Create a vault to start!
            </Typography>
          )}
        </Card>
        {bankData && (
          <Box
            sx={{
              pt: 2,
              pb: 2,
              mr: 1,
              ml: 1,
              mt: 3,
              mb: 3,
              borderRadius: 1,
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'grey.400' : 'info.lighter',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography variant="h5" textAlign="center" color="grey.600">
                Available to mint:{' '}
                {bankData.bank &&
                  fShortenNumber(
                    utils.formatEther(
                      BigNumber.from(bankData.bank.debtCeiling).sub(
                        BigNumber.from(bankData.bank.totalDebt)
                      )
                    ),
                    4
                  )}{' '}
                AVAI
              </Typography>
              <IconButton
                onMouseEnter={handleHoverOpen}
                onMouseLeave={handleHoverClose}
                color="info"
              >
                <Icon icon={infoOutline} width={20} height={20} />
              </IconButton>
            </Stack>
          </Box>
        )}
        <Popover
          id="mouse-over-popover"
          open={Boolean(hover)}
          anchorEl={hover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleHoverClose}
          disableRestoreFocus
          sx={{
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="subtitle1" gutterBottom>
              Debt Ceiling
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              The debt ceiling is a security feature put into place to reduce a
              possibility of exploitation. Once the debt ceiling is reached, no
              further AVAI can be borrowed. However, this can and will be
              increased.
            </Typography>
          </Box>
        </Popover>
      </div>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
