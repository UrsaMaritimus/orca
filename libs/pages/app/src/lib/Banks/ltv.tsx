import { FC, useState } from 'react';
import { merge } from 'lodash';
import dynamic from 'next/dynamic';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
// material
import { useTheme } from '@mui/material/styles';
import chroma from 'chroma-js';
// utils
import { colorScale, fPercent } from '@orca/util';
import { BaseOptionChart } from '@orca/components/chart';
import {
  Typography,
  Stack,
  Box,
  Popover,
  Grid,
  IconButton,
} from '@mui/material';

import { ColorBar } from '@orca/components/colorbar';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
// ----------------------------------------------------------------------

type LTVProps = {
  ltv: number;
  maxLtv: number;
};

export const LTVWidget: FC<LTVProps> = ({ ltv, maxLtv }) => {
  const color = colorScale(ltv, maxLtv - 30, maxLtv);

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },

    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: chroma(color).brighten(2).hex() },
            { offset: 100, color: chroma(color).darken(1).hex() },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'LTV',
            formatter: () => fPercent(ltv),
          },
        },
      },
    },
  });

  return (
    <Stack alignItems={'center'}>
      <ReactApexChart
        type="radialBar"
        series={[(ltv / maxLtv) * 100]}
        // @ts-expect-error apex chart doesn't like editing this much
        options={chartOptions}
        height={200}
      />

      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onMouseEnter={handleHoverOpen}
          onMouseLeave={handleHoverClose}
          color="secondary"
          sx={{ zIndex: 10000 }}
        >
          <Icon icon={infoOutline} width={20} height={20} />
        </IconButton>
        <Typography variant="caption">Max LTV: </Typography>
        <Typography variant="caption" color={colorScale(maxLtv, 0, maxLtv)}>
          {fPercent(maxLtv)}
        </Typography>
      </Stack>
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
            Loan to Value Ratio
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            The loan to value (LTV) ratio signifies how much collateral has been
            used to borrow against. The max LTV signifies the maximum amount of
            collateral that can be loaned against before risking liquidation.
          </Typography>
          <ColorBar />
          <Grid container>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant={'caption'}>Safe</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <Typography variant={'caption'}>Risky</Typography>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Stack>
  );
};
