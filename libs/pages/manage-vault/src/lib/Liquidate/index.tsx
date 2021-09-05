/* eslint-disable-next-line */
import { FC, useState } from 'react';
import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import {
  Card,
  Box,
  Typography,
  Stack,
  Grid,
  Container,
  Popover,
  IconButton,
  Divider,
} from '@mui/material';

import { BigNumber, utils } from 'ethers';
import { fCurrency, fPercent } from '@orca/util';

import { tokenInfo } from '@orca/shared/base';
import { LiquidateVault } from './liquidate';

//-----------------------------------------

type LiquidateProps = {
  token: 'AVAX';
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
  };
};

export const Liquidate: FC<LiquidateProps> = ({
  token,
  vaultInfo,
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
              <Typography variant="h4">Liquidate Vault</Typography>
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
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Collateral</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography variant="body2">
                    {utils.formatEther(vaultInfo.collateral)}
                  </Typography>
                  <Typography sx={{ ml: 0.5 }} variant="caption">
                    {token}
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8} display="flex" justifyContent="flex-end">
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
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={7}>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="subtitle1" textAlign="center">
                      LTV
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
                <Grid item xs={5} display="flex" justifyContent="flex-end">
                  <Typography variant="body2">
                    {fPercent(Number(utils.formatUnits(vaultInfo.LTV, 6)))}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>
                <Grid item xs={5} display="flex" justifyContent="flex-end">
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
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs={7}>
                  <Typography variant="subtitle1">Borrowing Power</Typography>
                </Grid>
                <Grid item xs={5} display="flex" justifyContent="flex-end">
                  <Typography variant="body2">
                    {fPercent(
                      Number(
                        utils.formatUnits(vaultInfo.borrowingPowerAvailable, 6)
                      )
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={7} sm={false}></Grid>
                <Grid item xs={5} display="flex" justifyContent="flex-end">
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
          {Number(utils.formatUnits(vaultInfo.borrowingPowerUsed, 6)) > 100 && (
            <>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <LiquidateVault
                vaultInfo={vaultInfo}
                vaultID={Number(vaultID)}
                token={token}
              />
            </>
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
            USD worth of {token}, you can borrow {fCurrency(vaultInfo.maxLTV)}{' '}
            USD worth.
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default Liquidate;
