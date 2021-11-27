import { FC } from 'react';

import {
  Grid,
  Card,
  Box,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { fCurrency, fNumber } from '@orca/util';
import { AddToken, Loader } from '@orca/components';
import { tokenInfo } from '@orca/shared/base';
import { useFrontPageStats } from '../graph/useFrontPageStats';

export const Stats: FC = () => {
  const { loading: statsLoading, data: stats } = useFrontPageStats();
  // web3 init info
  const { chainId } = useWeb3React<Web3Provider>();
  return (
    <Card
      sx={{
        mt: 2,
        mx: 1.5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        boxShadow: 5,
      }}
    >
      <CardHeader
        title="ORCA"
        avatar={
          <Box
            component="img"
            src={tokenInfo['ORCA'].icon}
            sx={{ width: 40, height: 40 }}
            color="inherit"
          />
        }
      />
      <CardContent>
        {statsLoading && <Loader />}
        {!statsLoading && (
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Marketcap
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.marketcap)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                TVL
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.TVL)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Total Revenue
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.totalRevenue)}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                SeaFund
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fCurrency(stats.totalRevenue * 0.15)}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Circulating ORCA Supply
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.circulatingSupply, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA Per Day
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.orcaPerDay, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA per Month
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.orcaPerMonth, 0, true)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                ORCA Max Supply
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography variant="subtitle1">
                {fNumber(stats.maxSupply, 0, true)}
              </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center">
              <AddToken
                tokenAddress={
                  chainId === 43113
                    ? tokenInfo['ORCA'].address.fuji
                    : chainId === 43114
                    ? tokenInfo['ORCA'].address.mainnet
                    : null
                }
                tokenSymbol="ORCA"
                tokenDecimals={18}
                tokenImage={tokenInfo['ORCA'].icon}
              />
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="center">
              <AddToken
                tokenAddress={
                  chainId === 43113
                    ? tokenInfo['AVAI'].address.fuji
                    : chainId === 43114
                    ? tokenInfo['AVAI'].address.mainnet
                    : null
                }
                tokenSymbol="AVAI"
                tokenDecimals={18}
                tokenImage={tokenInfo['AVAI'].icon}
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
