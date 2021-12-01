/* eslint-disable-next-line */
import { FC, useState } from 'react';
import Image from 'next/image';
import useSwr from 'swr';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import plusCircleOutline from '@iconify/icons-eva/plus-circle-outline';
import minusCircleOutline from '@iconify/icons-eva/minus-circle-outline';
import {
  Card,
  Box,
  Typography,
  Stack,
  Grid,
  Container,
  Popover,
  IconButton,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { utils } from 'ethers';
import { fCurrency, fPercent, fNumber, colorScale } from '@orca/util';

import { ColorBar } from '@orca/components';
import { BankTokenInfo, ProtocolTokenInfo } from '@orca/shared';

import { DepositStepper } from './DepositStepper';
import { WithdrawStepper } from './WithdrawStepper';
import { ActionProps } from './stepper.type';
//-----------------------------------------

export const Deposit: FC<ActionProps> = ({
  token,
  vaultInfo,
  isOwner,
  vaultID,
}) => {
  const [hover, setHover] = useState(null);
  const [value, setValue] = useState('1');

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  // For tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Card
        sx={{
          p: 2,
          mt: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
        }}
      >
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography variant="h4">Deposits in</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Image
                  src={BankTokenInfo[token].icon}
                  width={30}
                  height={30}
                  color="inherit"
                />
                <Typography variant="h4" sx={{ color: 'grey.500' }}>
                  {BankTokenInfo[token].display}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Grid container sx={{ my: 3 }}>
            <Grid item xs={12} sm={3} mt={0.5}>
              <Grid container>
                <Grid
                  item
                  xs={7}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="h6">Collateral</Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="inherit">
                    {BankTokenInfo[token].underlyingDecimals
                      ? Number(
                          utils.formatUnits(
                            vaultInfo.collateral,
                            BankTokenInfo[token].decimals
                          )
                        ).toExponential()
                      : fNumber(
                          Number(
                            utils.formatUnits(
                              vaultInfo.collateral,
                              BankTokenInfo[token].decimals
                            )
                          )
                        )}{' '}
                    {BankTokenInfo[token].display}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>

                {BankTokenInfo[token].yaktoken && (
                  <Grid
                    item
                    xs={5}
                    sm={12}
                    display="flex"
                    justifyContent="center"
                  >
                    {console.log(BankTokenInfo[token])}
                    {console.log(vaultInfo)}
                    <Typography
                      variant="caption"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'grey.600'
                            : 'grey.400',
                      }}
                    >
                      {vaultInfo.yakBalance &&
                        fNumber(
                          BankTokenInfo[token].underlyingDecimals
                            ? Number(vaultInfo.yakBalance) *
                                10 **
                                  (18 - BankTokenInfo[token].underlyingDecimals)
                            : Number(vaultInfo.yakBalance)
                        )}{' '}
                      {BankTokenInfo[token].yakBase}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={7} sm={false}></Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'grey.600'
                          : 'grey.400',
                    }}
                  >
                    {fCurrency(
                      Number(
                        utils.formatUnits(
                          vaultInfo.collateral
                            .mul(vaultInfo.tokenPrice)
                            .div(vaultInfo.peg),
                          BankTokenInfo[token].decimals
                        )
                      )
                    )}{' '}
                    USD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3} mt={0.5}>
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={7}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="h6" textAlign="center">
                    Borrowed
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="inherit"
                    color={colorScale(
                      Number(utils.formatUnits(vaultInfo.LTV, 6)),
                      vaultInfo.maxLTV - 30,
                      vaultInfo.maxLTV
                    )}
                  >
                    {fPercent(
                      Number(utils.formatUnits(vaultInfo.borrowingPowerUsed, 6))
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'grey.600'
                          : 'grey.400',
                    }}
                  >
                    {fCurrency(
                      Number(utils.formatEther(vaultInfo.borrowingPowerUsedUSD))
                    )}{' '}
                    USD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={7}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h6" textAlign="center">
                      Current LTV
                    </Typography>
                    <IconButton
                      onMouseEnter={handleHoverOpen}
                      onMouseLeave={handleHoverClose}
                      color="secondary"
                    >
                      <Icon icon={infoOutline} width={20} height={20} />
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="inherit"
                    color={colorScale(
                      Number(utils.formatUnits(vaultInfo.LTV, 6)),
                      vaultInfo.maxLTV - 30,
                      vaultInfo.maxLTV
                    )}
                  >
                    {fPercent(Number(utils.formatUnits(vaultInfo.LTV, 6)))}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'grey.600'
                          : 'grey.400',
                    }}
                  >
                    Max LTV: {fPercent(vaultInfo.maxLTV)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3} mt={0.5}>
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={7}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h6" textAlign="center">
                      Liquidation Price
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="inherit"
                    color={colorScale(
                      Number(utils.formatUnits(vaultInfo.LTV, 6)),
                      vaultInfo.maxLTV - 30,
                      vaultInfo.maxLTV
                    )}
                  >
                    $
                    {fNumber(
                      !vaultInfo.collateral.isZero()
                        ? BankTokenInfo[token].underlyingDecimals
                          ? Number(
                              utils.formatUnits(
                                vaultInfo.debt
                                  .mul(vaultInfo.peg)
                                  .mul(vaultInfo.mcp)
                                  .div(
                                    vaultInfo.collateral
                                      .mul(100)
                                      .mul(
                                        10 **
                                          (18 - BankTokenInfo[token].decimals)
                                      )
                                  ),
                                8
                              )
                            ) /
                            10 ** (18 - BankTokenInfo[token].underlyingDecimals)
                          : Number(
                              utils.formatUnits(
                                vaultInfo.debt
                                  .mul(vaultInfo.peg)
                                  .mul(vaultInfo.mcp)
                                  .div(
                                    vaultInfo.collateral
                                      .mul(100)
                                      .mul(
                                        10 **
                                          (18 - BankTokenInfo[token].decimals)
                                      )
                                  ),
                                8
                              )
                            )
                        : 0,
                      2
                    )}{' '}
                    USD
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'grey.600'
                          : 'grey.400',
                    }}
                  >
                    Current Price:{' '}
                    {fCurrency(
                      BankTokenInfo[token].underlyingDecimals
                        ? Number(utils.formatUnits(vaultInfo.tokenPrice, 8)) /
                            10 ** (18 - BankTokenInfo[token].underlyingDecimals)
                        : Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                    )}{' '}
                    USD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {isOwner && (
            <TabContext value={value}>
              <Box
                sx={{
                  pt: 2,
                  pb: 2,
                  mr: 1,
                  ml: 1,
                  mt: 3,
                  mb: 3,
                  borderRadius: 1,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
                }}
              >
                <Container maxWidth="lg">
                  <TabList
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                  >
                    <Tab
                      key="Deposit"
                      label={
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Icon
                            icon={plusCircleOutline}
                            width={20}
                            height={20}
                          />{' '}
                          <Typography variant="h4">Deposit</Typography>
                        </Stack>
                      }
                      value={String(1)}
                      sx={{
                        '&.MuiButtonBase-root.MuiTab-root:not(:last-child)': {
                          mr: 0,
                        },
                      }}
                    />
                    <Tab
                      key="Withdraw"
                      label={
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Icon
                            icon={minusCircleOutline}
                            width={20}
                            height={20}
                          />{' '}
                          <Typography variant="h4">Withdraw</Typography>
                        </Stack>
                      }
                      value={String(2)}
                    />
                  </TabList>
                </Container>
              </Box>
              <Box
                sx={{
                  py: 2,
                  mt: 2,
                  width: '100%',
                  borderRadius: 1,
                  bgcolor: 'grey.50012',
                }}
              >
                <TabPanel key="Deposit" value={String(1)}>
                  <DepositStepper
                    token={token}
                    vaultInfo={vaultInfo}
                    approved={token === 'AVAX'}
                    vaultID={vaultID}
                  />
                </TabPanel>
                <TabPanel key="Withdraw" value={String(2)}>
                  <WithdrawStepper
                    token={token}
                    vaultInfo={vaultInfo}
                    vaultID={vaultID}
                  />
                </TabPanel>
              </Box>
            </TabContext>
          )}
        </Container>
      </Card>

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
            The loan to value ratio signifies how much of your{' '}
            {BankTokenInfo[token].display} collateral can be used to borrow
            against. For example, given $100 USD worth of{' '}
            {BankTokenInfo[token].display}, you can borrow{' '}
            {fCurrency(vaultInfo.maxLTV)} USD worth.
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
    </>
  );
};

export default Deposit;
