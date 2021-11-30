import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';

import { Web3Provider } from '@ethersproject/providers';

import {
  Card,
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  Tooltip,
} from '@mui/material';

import { fPercent, fCurrency } from '@orca/util';
import { routes, BankInfo } from '@orca/shared';
import { makeVault, getVault } from '@orca/web3';
import { handleTransaction } from '@orca/components';

type VaultCardProps = {
  handleNewTransaction: (state: boolean) => void;
  library: Web3Provider;
  chainId: number;
  account: string;
  row: {
    maxLTV: number;
    key: string;
    remainingAVAI: number;
    collatInfo: BankInfo;
  };
};

export const VaultCard: FC<VaultCardProps> = ({
  row,
  library,
  chainId,
  handleNewTransaction,
  account,
}) => {
  const router = useRouter();
  // For creating a vault
  const createVault = async () => {
    handleNewTransaction(true);
    await handleTransaction({
      transaction: makeVault(library, row.collatInfo.erc20, chainId),
      messages: {
        loading: 'Creating vault...',
        success: 'Vault created!',
        error: 'Vault failed to be created.',
      },
      chainId,
    });
    const bank = getVault(row.collatInfo.erc20, library, chainId);
    const numTokens = await bank.balanceOf(account);
    if (!numTokens.isZero()) {
      const lastToken = await bank.tokenOfOwnerByIndex(
        account,
        numTokens.toNumber() - 1
      );
      if (router)
        router.push(
          `${routes.APP.VAULTS.USER}/${
            row.collatInfo.url ? row.collatInfo.url : row.collatInfo.display
          }/${lastToken.toNumber()}`
        );
    } else {
      router.push(routes.APP.VAULTS.USER);
    }
    handleNewTransaction(false);
  };

  return (
    <div>
      {row.collatInfo.tooltip ? (
        <Tooltip title={row.collatInfo.tooltipText}>
          <Card
            sx={{
              p: 2,
              m: 2,
              ':hover': { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.4)' },
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={5} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography variant="h6" color="text.secondary">
                  Asset
                </Typography>
              </Grid>
              <Grid item xs={7} md={5} display="flex" justifyContent="left">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image
                    src={row.collatInfo.icon}
                    width={40}
                    height={40}
                    color="inherit"
                  />
                  <Typography variant="subtitle1">
                    {row.collatInfo.display}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography variant="h6" color="text.secondary">
                  AVAI Available
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} display="flex" justifyContent="center">
                <Typography variant="subtitle1">
                  {fCurrency(row.remainingAVAI)}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography variant="h6" color="text.secondary">
                  Maxium LTV
                </Typography>
              </Grid>
              <Grid item xs={6} md={2} display="flex" justifyContent="center">
                <Typography variant="subtitle1">
                  {fPercent(row.maxLTV)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                display="flex"
                justifyContent="center"
                sx={{ mt: { xs: 2, md: 0 } }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  startIcon={<Icon icon={editOutline} />}
                  onClick={createVault}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Tooltip>
      ) : (
        <Card
          sx={{
            p: 2,
            m: 2,
            ':hover': { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.4)' },
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={5} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                Asset
              </Typography>
            </Grid>
            <Grid item xs={7} md={5} display="flex" justifyContent="left">
              {row.collatInfo.tooltip ? (
                <Tooltip title={row.collatInfo.tooltipText}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Image
                      src={row.collatInfo.icon}
                      width={35}
                      height={35}
                      color="inherit"
                    />
                    <Typography variant="subtitle1">
                      {row.collatInfo.display}
                    </Typography>
                  </Stack>
                </Tooltip>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Image
                    src={row.collatInfo.icon}
                    width={35}
                    height={35}
                    color="inherit"
                  />
                  <Typography variant="subtitle1">
                    {row.collatInfo.display}
                  </Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                AVAI Available
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} display="flex" justifyContent="center">
              <Typography variant="subtitle1">
                {fCurrency(row.remainingAVAI)}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                Maxium LTV
              </Typography>
            </Grid>
            <Grid item xs={6} md={2} display="flex" justifyContent="center">
              <Typography variant="subtitle1">
                {fPercent(row.maxLTV)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              display="flex"
              justifyContent="center"
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              <Button
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<Icon icon={editOutline} />}
                onClick={createVault}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
    </div>
  );
};
