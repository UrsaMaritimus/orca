/* eslint-disable-next-line */
import { FC, useState } from 'react';
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
import { fCurrency, fPercent, fNumber } from '@orca/util';

import { tokenInfo } from '@orca/shared/base';
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
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 2,
            mt: 2,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Typography variant="h4">Deposits in</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Box
                  component="img"
                  src={tokenInfo[token as string].icon}
                  sx={{
                    width: 30,

                    height: 30,
                  }}
                  color="inherit"
                />
                <Typography variant="h4" sx={{ color: 'grey.500' }}>
                  {token}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
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
                    {fNumber(Number(utils.formatEther(vaultInfo.collateral)))}{' '}
                    {token}
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
                      Number(
                        utils.formatEther(
                          vaultInfo.collateral
                            .mul(vaultInfo.tokenPrice)
                            .div(vaultInfo.peg)
                        )
                      )
                    )}{' '}
                    USD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  <Typography variant="inherit">
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
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
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
                  <Typography variant="inherit">
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
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={7}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="h6" textAlign="center">
                    Borrowing Power
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="inherit">
                    {fPercent(
                      Number(
                        utils.formatUnits(vaultInfo.borrowingPowerAvailable, 6)
                      )
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
                      Number(
                        utils.formatEther(vaultInfo.borrowingPowerAvailableUSD)
                      )
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
        </Card>
      </Container>
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The loan to value ratio signifies how much of your {token}{' '}
            collateral can be used to borrow against. For example, given $100
            USD worth of {token}, you can borrow {fCurrency(vaultInfo.maxLTV)}{' '}
            USD worth.
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default Deposit;
