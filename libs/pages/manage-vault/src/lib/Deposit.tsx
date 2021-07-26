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
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

import { fCurrency, fPercent } from '@ursa/util';

import { tokenInfo } from './constants';
import { DepositStepper } from './DepositStepper';

//-----------------------------------------

type DepositProps = {
  token: string;
  isOwner: boolean;
  vaultID: number;
  vaultInfo: {
    collateral: number;
    debt: number;
    LTV: number;
    maxLTV: number;
    borrowingPower: number;
    tokenPrice: number;
  };
};

export const Deposit: FC<DepositProps> = ({
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
                <Typography variant="h6" sx={{ color: 'grey.500' }}>
                  {token}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Grid container sx={{ mt: 2 }}>
            <Grid item sm={6}>
              <Stack alignItems="center" sx={{ mt: 0.75 }}>
                <Typography variant="h6">Collateral</Typography>
                <Typography variant="inherit">
                  {vaultInfo.collateral} {token}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  {fCurrency(vaultInfo.collateral * vaultInfo.tokenPrice)} USD
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={6}>
              <Stack alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6" textAlign="center">
                    Maximum LTV
                  </Typography>
                  <IconButton
                    onMouseEnter={handleHoverOpen}
                    onMouseLeave={handleHoverClose}
                    color="secondary"
                  >
                    <Icon icon={infoOutline} width={25} height={25} />
                  </IconButton>
                </Stack>
                <Typography variant="inherit">
                  {fPercent(vaultInfo.maxLTV)}{' '}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  {fCurrency(
                    (vaultInfo.maxLTV / 100) *
                      vaultInfo.collateral *
                      vaultInfo.tokenPrice
                  )}{' '}
                  USD
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <Stack alignItems="center">
                <Typography variant="h6" textAlign="center">
                  Borrowing Power Used
                </Typography>
                <Typography variant="inherit">{vaultInfo.LTV} %</Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  $
                  {vaultInfo.LTV *
                    vaultInfo.maxLTV *
                    vaultInfo.collateral *
                    vaultInfo.tokenPrice}{' '}
                  USD
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={6} sx={{ mt: 2 }}>
              <Stack alignItems="center">
                <Typography variant="h6" textAlign="center">
                  Borrowing Power Available
                </Typography>
                <Typography variant="inherit">
                  {100 - vaultInfo.LTV / vaultInfo.maxLTV} %
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  {fCurrency(
                    (vaultInfo.maxLTV / 100) *
                      vaultInfo.tokenPrice *
                      vaultInfo.collateral -
                      vaultInfo.debt
                  )}{' '}
                  USD
                </Typography>
              </Stack>
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
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon
                            icon={plusCircleOutline}
                            width={30}
                            height={30}
                          />{' '}
                          <Typography variant="h4">Deposit</Typography>
                        </Stack>
                      }
                      value={String(1)}
                    />
                    <Tab
                      key="Withdraw"
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Icon
                            icon={minusCircleOutline}
                            width={30}
                            height={30}
                          />{' '}
                          <Typography variant="h4">Withdraw</Typography>
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
                  <Box
                    sx={{
                      p: 3,
                      minHeight: 180,
                    }}
                  >
                    <DepositStepper
                      token={token}
                      vaultInfo={vaultInfo}
                      approved={token === 'AVAX'}
                      vaultID={vaultID}
                    />
                  </Box>
                </TabPanel>
                <TabPanel key="Withdraw" value={String(2)}>
                  Withdraw
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The loan to value ratio signifies how much of your {token}{' '}
            collateral can be used to borrow against. For example, given $100
            USD worth of {token}, you can borrow ${vaultInfo.maxLTV} USD worth.
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default Deposit;
