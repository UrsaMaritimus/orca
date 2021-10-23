import { FC } from 'react';

import { NextLink } from '@orca/components/links';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
import { Card, Grid, Typography, Box, Stack, Button } from '@mui/material';
import { fPercent, fCurrency, colorScale } from '@orca/util';
import { routes } from '@orca/shared/base';

type VaultCardProps = {
  row: {
    vaultID: string;
    collateral: string;
    debt: string;
    ratio: string;
    symbol: string;
    icon: string;
    type: string;
  };
};

export const VaultCard: FC<VaultCardProps> = ({ row }) => {
  if (row) {
    return (
      <NextLink
        href={`${routes.APP.VAULTS.USER}/${row.type}/${row.vaultID}`}
        underline="none"
      >
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
            <Grid item xs={7} md={4} display="flex" justifyContent="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={row.icon}
                  sx={{ width: 35, height: 35 }}
                  color="inherit"
                />
                <Typography variant="subtitle1">{row.symbol}</Typography>
                <Typography variant="subtitle1">#{row.vaultID}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                Collateral
              </Typography>
            </Grid>
            <Grid item xs={6} md={2} display="flex" justifyContent="center">
              <Typography variant="subtitle1">
                {fCurrency(Number(row.collateral))}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                Debt
              </Typography>
            </Grid>
            <Grid item xs={6} md={2} display="flex" justifyContent="center">
              <Typography variant="subtitle1">
                {fCurrency(Number(row.debt))}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography variant="h6" color="text.secondary">
                LTV
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              sx={{ color: colorScale(Number(row.ratio)) }}
              display="flex"
              justifyContent="center"
            >
              <Typography variant="subtitle1">
                {fPercent(Number(row.ratio))}
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
                LinkComponent={NextLink}
                href={`${routes.APP.VAULTS.USER}/${row.type}/${row.vaultID}`}
                startIcon={<Icon icon={editOutline} />}
              >
                Manage
              </Button>
            </Grid>
          </Grid>
        </Card>
      </NextLink>
    );
  }
  return <></>;
};
