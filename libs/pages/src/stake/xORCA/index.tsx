import { FC } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';

import {
  Typography,
  Card,
  Grid,
  Stack,
  Box,
  useMediaQuery,
  Divider,
  CardContent,
  Chip,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { fNumber, fPercent } from '@orca/util';
import { getTokenBalance, xORCARatio } from '@orca/web3';
import { utils } from 'ethers';

import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { FarmTokenInfo, DeployedContracts } from '@orca/shared';
import { useFrontPageStats } from './useFrontPageStats';
import { useOrcaPrice } from './useOrcaPrice';

type FarmProps = {
  img: string;
  name: string;
  rewardPerDay: number;
  reward: string;
  rewardImg: string;
  tvl: number;
  apr: number;
  loading: boolean;
  totalStaked: string;
  totalStakedUSD: number;
  color1: string;
  color2: string;
  farm: string;
  link: string;
  pid: string;
};

export const Farm: FC<FarmProps> = ({
  img,
  name,
  color1,
  color2,
  farm,
  link,
}) => {
  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const { loading, data } = useFrontPageStats();

  const { data: orcaPrice } = useOrcaPrice();
  const shouldFetch = !!library;
  const { data: totalStaked, mutate: mutatexORCABalance } = useSWR(
    shouldFetch
      ? [
          `tokenBalancexOrca`,
          library,
          account,
          chainId === 43113
            ? DeployedContracts.fuji.OrcaPod.address
            : chainId === 43114
            ? DeployedContracts.main.OrcaPod.address
            : null,
        ]
      : null,
    getTokenBalance()
  );

  const { data: xOrcaRatio, mutate: mutatexORCARatio } = useSWR(
    shouldFetch ? [`xOrcaRatio`, library, chainId] : null,
    xORCARatio()
  );

  useKeepSWRDataLiveAsBlocksArrive(mutatexORCABalance);
  useKeepSWRDataLiveAsBlocksArrive(mutatexORCARatio);

  return (
    <Card
      sx={{
        my: 2,
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 10%, ${theme.palette.primary.lighter} 100%)`,
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6} display="flex" justifyContent={'center'}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Image src={img} width={44} height={44} color="grey.700" />
              <Stack alignItems={'center'}>
                <Typography sx={{ color: 'grey.800' }} variant="h6">
                  {shouldFetch
                    ? fNumber(
                        Number(
                          utils.formatEther(totalStaked ? totalStaked : 0)
                        ) * (xOrcaRatio ? xOrcaRatio.ratio : 1),
                        4
                      )
                    : '-'}{' '}
                  {name}
                </Typography>
                <Typography sx={{ color: 'grey.700' }} variant="caption">
                  Staked ORCA
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            alignItems="center"
            xs={6}
            display="flex"
            justifyContent="center"
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              <Image
                src={FarmTokenInfo['XORCA'].icon}
                width={44}
                height={44}
                color="grey.700"
              />
              <Stack alignItems="center">
                <Typography sx={{ color: 'grey.800' }} variant="h6">
                  {shouldFetch
                    ? fNumber(
                        Number(
                          utils.formatEther(totalStaked ? totalStaked : 0)
                        ),
                        4
                      )
                    : '-'}{' '}
                  xORCA
                </Typography>
                <Typography sx={{ color: 'grey.700' }} variant="caption">
                  Balance
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Stack alignItems="center">
              <Stack alignItems="center" direction="row" spacing={1}>
                <Image
                  src={FarmTokenInfo['XORCA'].icon}
                  width={25}
                  height={25}
                  color="grey.700"
                />
                <Typography sx={{ color: 'grey.800' }} variant="subtitle2">
                  1 xORCA =
                </Typography>
                <Image src={img} width={25} height={25} color="grey.700" />
                <Typography sx={{ color: 'grey.800' }} variant="subtitle2">
                  {xOrcaRatio ? fNumber(xOrcaRatio.ratio, 4) : 1} ORCA
                </Typography>
              </Stack>
              <Typography sx={{ color: 'grey.700' }} variant="caption">
                Ratio
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Chip
              color="primary"
              label={`APR (estimate): ${
                !loading && orcaPrice && xOrcaRatio
                  ? fPercent(
                      ((data.totalRevenue * 0.4) /
                        data.days /
                        ((chainId === 43113 ? 0.2 : orcaPrice.orcaUSDPrice) *
                          xOrcaRatio.totalSupply *
                          xOrcaRatio.ratio)) *
                        365 *
                        100
                    )
                  : '-'
              }`}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{ color: 'grey.700' }} color="inherit">
          <Grid container spacing={matches ? 2 : 0}>
            <Grid item xs={12} md={5} display="flex" justifyContent="center">
              <Deposit
                account={account}
                library={library}
                name={name}
                img={img}
                farm={farm}
                link={link}
                chainId={chainId}
              />
            </Grid>
            <Grid item xs={12} md={2} display="flex" justifyContent="center">
              <Divider
                variant="middle"
                orientation={matches ? 'horizontal' : 'vertical'}
                flexItem
                sx={{ width: matches ? '100%' : '0%' }}
              />
            </Grid>

            <Grid item xs={12} md={5} display="flex" justifyContent="center">
              <Withdraw
                library={library}
                name={name}
                img={FarmTokenInfo['XORCA'].icon}
                link={link}
                chainId={chainId}
                totalStaked={totalStaked}
              />
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};
