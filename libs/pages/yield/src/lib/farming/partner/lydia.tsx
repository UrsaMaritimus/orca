import { FC } from 'react';
import { Icon } from '@iconify/react';
import externalLinkOutline from '@iconify/icons-eva/external-link-outline';

import {
  Typography,
  Card,
  Grid,
  Stack,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { NextLink } from '@orca/components/links';

export const LydiaFarm: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      sx={{
        py: 2,
        px: 1,
        mb: 2,
        background: `linear-gradient(135deg, #6c22ca 0%, #b10693 10%, ${theme.palette.primary.lighter} 100%)`,
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid
          item
          xs={6}
          md={3}
          display="flex"
          justifyContent={matches ? 'center' : 'flex-start'}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Box
              component="img"
              src={'/static/farm/ic_lyd.png'}
              sx={{ width: 44, height: 44 }}
              color="grey.700"
            />
            <Stack alignItems={matches ? 'center' : 'flex-start'}>
              <Typography sx={{ color: 'grey.800' }} variant="h6">
                Lydia
              </Typography>
              <Typography sx={{ color: 'grey.700' }} variant="caption">
                Asset
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          alignItems="center"
          xs={6}
          md={3}
          display="flex"
          justifyContent="center"
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Box
              component="img"
              src={'/static/cryptos/ic_orca.png'}
              sx={{ width: 44, height: 44 }}
              color="grey.700"
            />
            <Stack alignItems="center">
              <Typography sx={{ color: 'grey.800' }} variant="h6">
                ORCA
              </Typography>
              <Typography sx={{ color: 'grey.700' }} variant="caption">
                Reward
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} md={2} display="flex" justifyContent="center">
          <Stack alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                component="img"
                src={'/static/cryptos/ic_lyd.png'}
                sx={{ width: 25, height: 25 }}
                color="grey.700"
              />
              <Typography sx={{ color: 'grey.800' }} variant="h6">
                Lydia
              </Typography>
            </Stack>
            <Typography sx={{ color: 'grey.700' }} variant="caption">
              Platform
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} display="flex" justifyContent="center">
          <Stack alignItems="center">
            <NextLink
              href={'https://www.lydia.finance/pools'}
              underline="hover"
              rel="noreferrer"
              variant="subtitle2"
              color="secondary.darker"
              alignItems="center"
              display="flex"
              target="_blank"
            >
              <Typography variant="h5">Go to Farm</Typography>
              <Icon icon={externalLinkOutline} width={40} height={40} />
            </NextLink>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};
