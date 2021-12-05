import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';

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

import { fCurrency, fNumber } from '@orca/util';
import { Link } from '../links';

import { routes } from '@orca/shared';
import { seeORCA } from './atom';
import { useOrcaPrice } from './graph/useOrcaPrice';

export const BalanceInfoOrca: FC = () => {
  // Account state
  const open = useRecoilValue(seeORCA);
  const setOpen = useSetRecoilState(seeORCA);

  const handleClick = () => {
    setOpen(false);
  };

  const { data, loading } = useOrcaPrice();

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
              <Link
                href={routes.APP.CRYPTOS.ORCA}
                underline="hover"
                variant="subtitle2"
                color="secondary.dark"
                alignItems="center"
                display="flex"
                onClick={handleClick}
                rel="noreferrer"
                target="_blank"
              >
                Get ORCA
                <Icon icon={externalLinkOutline} width={20} height={20} />
              </Link>
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
                  src="/static/cryptos/ic_orca.svg"
                  width={60}
                  height={60}
                  color="inherit"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h4">ORCA</Typography>
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
                  {!loading && fCurrency(data.orcaUSDPrice)}
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
                  {!loading && fNumber(data.orcaAVAXPrice, 4, true)}
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
