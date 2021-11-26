import { Icon } from '@iconify/react';
import { FC } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Card,
  Grid,
  Stack,
  Box,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { fCurrency, fNumber } from '@orca/util';
import { LoadingDots } from '@orca/components/loader';

import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Claim from './Claim';

type FarmProps = {
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: string | false;
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
  contractName: string;
  finished: boolean;
};

export const Farm: FC<FarmProps> = ({
  img,
  name,
  reward,
  rewardImg,
  tvl,
  apr,
  loading,
  totalStaked,
  totalStakedUSD,
  color1,
  color2,
  expanded,
  handleChange,
  farm,
  link,
  contractName,
  finished,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  return (
    <Card
      sx={{
        my: 2,
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 10%, ${theme.palette.primary.lighter} 100%)`,
      }}
    >
      <Accordion
        sx={{
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 10%, ${theme.palette.primary.lighter} 100%)`,
        }}
        expanded={expanded === name}
        onChange={handleChange(name)}
      >
        <AccordionSummary
          expandIcon={
            <Icon
              icon={arrowIosDownwardFill}
              width={20}
              height={20}
              color="grey.700"
            />
          }
          sx={{
            borderBottom: expanded === name ? 1 : 0,
            borderColor: 'grey.600',
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
                  src={img}
                  sx={{ width: 44, height: 44 }}
                  color="grey.700"
                />
                <Stack alignItems={matches ? 'center' : 'flex-start'}>
                  <Typography sx={{ color: 'grey.800' }} variant="h6">
                    {name}
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
                  src={rewardImg}
                  sx={{ width: 44, height: 44 }}
                  color="grey.700"
                />
                <Stack alignItems="center">
                  <Typography sx={{ color: 'grey.800' }} variant="h6">
                    {reward}
                  </Typography>
                  <Typography sx={{ color: 'grey.700' }} variant="caption">
                    Reward
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={4} md={2} display="flex" justifyContent="center">
              <Stack alignItems="center">
                <Typography sx={{ color: 'grey.800' }} variant="h6">
                  {library ? (
                    totalStakedUSD === 0 ? (
                      fCurrency(totalStakedUSD)
                    ) : totalStakedUSD ? (
                      fCurrency(totalStakedUSD)
                    ) : (
                      <LoadingDots />
                    )
                  ) : (
                    '-'
                  )}
                </Typography>
                <Typography sx={{ color: 'grey.700' }} variant="caption">
                  Deposited
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4} md={2} display="flex" justifyContent="center">
              <Stack alignItems="center">
                <Typography sx={{ color: 'grey.800' }} variant="h6">
                  {loading ? <LoadingDots /> : fCurrency(tvl)}
                </Typography>
                <Typography sx={{ color: 'grey.700' }} variant="caption">
                  TVL
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4} md={2} display="flex" justifyContent="center">
              {' '}
              <Stack alignItems="center">
                <Typography sx={{ color: 'grey.800' }} variant="h6">
                  {finished && 'Finished'}
                  {!finished &&
                    (loading ? <LoadingDots /> : fNumber(apr, 0, true))}
                  {!finished && (loading ? '' : '%')}
                </Typography>
                <Typography sx={{ color: 'grey.700' }} variant="caption">
                  APR
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: (theme) => alpha(theme.palette.primary.lighter, 0.35),
          }}
        >
          <Typography sx={{ color: 'grey.700' }} color="inherit">
            <Grid container spacing={matches ? 2 : 0}>
              <Grid item xs={12} md={4}>
                <Deposit
                  account={account}
                  library={library}
                  name={name}
                  img={img}
                  farm={farm}
                  link={link}
                  contractName={contractName}
                  chainId={chainId}
                />
              </Grid>
              <Grid item xs={12} md={1} display="flex" justifyContent="center">
                <Divider
                  variant="middle"
                  orientation={matches ? 'horizontal' : 'vertical'}
                  flexItem
                  sx={{ width: matches ? '100%' : '0%' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Withdraw
                  account={account}
                  library={library}
                  name={name}
                  img={img}
                  farm={farm}
                  link={link}
                  chainId={chainId}
                  totalStaked={totalStaked}
                  totalStakedUSD={totalStakedUSD}
                  contractName={contractName}
                />
              </Grid>
              <Grid item xs={12} md={1} display="flex" justifyContent="center">
                <Divider
                  variant="middle"
                  orientation={matches ? 'horizontal' : 'vertical'}
                  flexItem
                  sx={{ width: matches ? '100%' : '0%' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Claim
                  account={account}
                  library={library}
                  img={rewardImg}
                  contractName={contractName}
                  chainId={chainId}
                  reward={reward}
                />
              </Grid>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};
