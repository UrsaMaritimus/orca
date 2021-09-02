/* eslint-disable-next-line */
import { FC, useState } from 'react';
import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

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
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { BigNumber, utils } from 'ethers';
import { fCurrency, fPercent, fNumber } from '@orca/util';

import { tokenInfo } from '@orca/shared/base';
import BorrowStepper from './BorrowStepper';
import RepayStepper from './RepayStepper';
//-----------------------------------------

type BorrowsProps = {
  token: string;
  isOwner: boolean;
  vaultID: number;
  vaultInfo: {
    collateral: BigNumber;
    debt: BigNumber;
    LTV: BigNumber;
    maxLTV: number;
    maxLTVUSD: BigNumber;
    borrowingPowerAvailable: BigNumber;
    borrowingPowerAvailableUSD: BigNumber;
    borrowingPowerUsed: BigNumber;
    borrowingPowerUsedUSD: BigNumber;
    tokenPrice: BigNumber;
    availableWithdraw: BigNumber;
    peg: BigNumber;
    mcp: BigNumber;
    closingFee: BigNumber;
  };
};

export const Borrows: FC<BorrowsProps> = ({
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
    <Card
      sx={{
        pt: 2,
        pb: 2,
        mr: 1,
        ml: 1,
        mt: 2,
        mb: 3,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography variant="h4">Borrows in</Typography>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box
                component="img"
                src={tokenInfo['AVAI'].icon}
                sx={{
                  width: 30,

                  height: 30,
                }}
                color="inherit"
              />
              <Typography variant="h4" sx={{ color: 'grey.500' }}>
                AVAI
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
            <Grid container>
              <Grid item xs={7} sm={12} display="flex" justifyContent="center">
                <Typography variant="h6">Debt</Typography>
              </Grid>
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography variant="inherit">
                  {fNumber(Number(utils.formatEther(vaultInfo.debt)), 2)} AVAI
                </Typography>
              </Grid>
              <Grid item xs={7} sm={false}></Grid>
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  {fNumber(
                    Number(
                      utils.formatEther(
                        vaultInfo.debt
                          .mul(vaultInfo.peg)
                          .div(vaultInfo.tokenPrice)
                      )
                    ),
                    2
                  )}{' '}
                  {token}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
            <Grid container alignItems="center">
              <Grid item xs={7} sm={12} display="flex" justifyContent="center">
                <Typography variant="h6" textAlign="center">
                  Available to Borrow
                </Typography>
              </Grid>
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography variant="inherit" textAlign="center">
                  {fNumber(
                    Number(
                      utils.formatEther(vaultInfo.borrowingPowerAvailableUSD)
                    ),
                    2
                  )}{' '}
                  AVAI
                </Typography>
              </Grid>
              <Grid item xs={7} sm={false}></Grid>
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography
                  variant="caption"
                  sx={{ color: 'grey.500' }}
                  textAlign="center"
                >
                  {fNumber(
                    Number(
                      utils.formatEther(
                        vaultInfo.borrowingPowerAvailableUSD
                          .mul(vaultInfo.peg)
                          .div(vaultInfo.tokenPrice)
                      )
                    )
                  )}{' '}
                  {token}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={7} sm={12} display="flex" justifyContent="center">
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
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography variant="inherit">
                  {fPercent(Number(utils.formatUnits(vaultInfo.LTV, 6)))}{' '}
                </Typography>
              </Grid>
              <Grid item xs={7} sm={false}></Grid>
              <Grid item xs={5} sm={12} display="flex" justifyContent="center">
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  Max LTV: {fPercent(vaultInfo.maxLTV)}
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
                    key="Borrow"
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AttachMoneyIcon />{' '}
                        <Typography variant="h4">Borrow</Typography>
                      </Stack>
                    }
                    value={String(1)}
                  />
                  <Tab
                    key="Pay back"
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MoneyOffIcon />
                        <Typography variant="h4">Repay</Typography>
                      </Stack>
                    }
                    value={String(2)}
                    sx={{ fontSize: 'x-large' }}
                  />
                </TabList>
              </Container>
            </Box>

            <Box
              sx={{
                p: 2,
                mt: 2,
                width: '100%',
                borderRadius: 1,
                bgcolor: 'grey.50012',
              }}
            >
              <TabPanel key="Deposit" value={String(1)}>
                <BorrowStepper
                  token={token}
                  vaultInfo={vaultInfo}
                  vaultID={vaultID}
                />
              </TabPanel>
              <TabPanel key="Withdraw" value={String(2)}>
                <RepayStepper
                  token={token}
                  vaultInfo={vaultInfo}
                  vaultID={vaultID}
                />
              </TabPanel>
            </Box>
            {!vaultInfo.closingFee.isZero() && (
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
                    theme.palette.mode === 'light'
                      ? 'grey.400'
                      : 'warning.light',
                }}
              >
                <Typography variant="h6" textAlign="center" color="grey.600">
                  Note: There is a closing fee when using this Bank of{' '}
                  {vaultInfo.closingFee.toNumber() / 100}%
                </Typography>
              </Box>
            )}
          </TabContext>
        )}
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
    </Card>
  );
};

export default Borrows;
