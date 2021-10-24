import { FC } from 'react';

import { NextLink } from '@orca/components/links';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
import { Card, Grid, Typography, Box, Stack, Button } from '@mui/material';
import { fPercent, fCurrency, colorScale } from '@orca/util';
import { routes, TokenInfo } from '@orca/shared/base';

type VaultCardProps = {
  row: {
    maxLTV: number;
    key: string;
    remainingAVAI: number;
    collatInfo: TokenInfo;
  };
};

export const VaultCard: FC<VaultCardProps> = ({ row }) => {
  return (
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
        <Grid item xs={7} md={5} display="flex" justifyContent="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src={row.collatInfo.icon}
              sx={{ width: 35, height: 35 }}
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
          <Typography variant="subtitle1">{fPercent(row.maxLTV)}</Typography>
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
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
