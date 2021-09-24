import { FC } from 'react';

import { merge } from 'lodash';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fCurrency, fNumber } from '@orca/util';
//
import { BaseOptionChart, ChartStyles } from '@orca/components/chart';
import { BigNumber, utils } from 'ethers';

import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// ----------------------------------------------------------------------

const CHART_HEIGHT = 415;
const LEGEND_HEIGHT = 80;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

type RevenueProps = {
  usdTreasury: BigNumber;
  bankTreasury: BigNumber;
};

export const ProtocolRevenue: FC<RevenueProps> = ({
  usdTreasury,
  bankTreasury,
}) => {
  const theme = useTheme();
  const sum =
    Number(utils.formatUnits(usdTreasury, 6)) +
    Number(utils.formatEther(bankTreasury));
  const CHART_DATA = [sum * 0.4, sum * 0.05, sum * 0.15, sum * 0.4];
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.lighter,
      theme.palette.primary.light,
      theme.palette.primary.main,
      theme.palette.primary.dark,
    ],
    labels: ['Insurance', 'Future Dev', 'Charity', 'ORCA Token Holders'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fCurrency(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fCurrency(sum);
              },
            },
          },
        },
      },
    },
  });

  return (
    <Card sx={{ bgcolor: 'background.neutral' }}>
      <ChartStyles />
      <CardHeader title="Orca Protocol Total Revenue" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="donut"
          series={CHART_DATA}
          // @ts-expect-error due to weird differences between string and const
          options={chartOptions}
          height={320}
        />
      </ChartWrapperStyle>
    </Card>
  );
};
