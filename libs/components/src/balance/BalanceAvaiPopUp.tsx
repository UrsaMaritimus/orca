import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';
// Ethers and web3 stuff

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Container,
  Modal,
  Divider,
  Box,
} from '@mui/material';

import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-eva/close-outline';
import externalLinkOutline from '@iconify/icons-eva/external-link-outline';

import { routes } from '@orca/shared';
import { fCurrency, fNumber } from '@orca/util';

import { NextLink } from '../links';
import { seeAVAI } from './atom';
import { useAvaiPrice } from './graph/useAVAIPrice';

export const BalanceInfoAVAI: FC = () => {
  // Account state
  const open = useRecoilValue(seeAVAI);
  const setOpen = useSetRecoilState(seeAVAI);

  const { loading, data } = useAvaiPrice();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Modal
      sx={{
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={handleClick}
    >
      <Container maxWidth="xs">
        <Card>
          <CardHeader
            title={
              <NextLink
                href={routes.APP.VAULTS.USER}
                underline="hover"
                variant="subtitle2"
                color="secondary.dark"
                alignItems="center"
                display="flex"
                onClick={handleClick}
              >
                Get AVAI
                <Icon icon={externalLinkOutline} width={20} height={20} />
              </NextLink>
            }
            action={
              <IconButton onClick={handleClick}>
                <Icon icon={closeIcon} />
              </IconButton>
            }
          />
          <CardContent>
            <Grid container sx={{ p: 2 }} spacing={1}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Image
                  src="/static/cryptos/ic_avai.svg"
                  width={60}
                  height={60}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h4">AVAI</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-start">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  Price (USD)
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Typography variant="subtitle1">
                  {!loading && fCurrency(data.avaiUSDPrice)}
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-start">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  Price (AVAX)
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Typography variant="subtitle1">
                  {!loading && fNumber(data.avaiAVAXPrice, 4, true)}
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-start">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  Circulating Supply
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Typography variant="subtitle1">
                  {!loading &&
                    fNumber(!loading && data.circulatingSupply, 0, true)}
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-start">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary' }}
                >
                  Marketcap (USD)
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Typography variant="subtitle1">
                  {!loading && fCurrency(!loading && data.marketcap)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Modal>
  );
};
