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
} from '@material-ui/core';

import { BigNumber, utils } from 'ethers';
import { fCurrency, fPercent } from '@orca/util';

import { tokenInfo } from '@orca/shared/base';
import { LiquidateVault } from './liquidate';

//-----------------------------------------

type LiquidateProps = {
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
                  {utils.formatEther(vaultInfo.collateral)} {token}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
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
              </Stack>
            </Grid>
            <Grid item sm={6}>
              <Stack alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6" textAlign="center">
                    Current LTV
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
                  {fPercent(Number(utils.formatUnits(vaultInfo.LTV, 6)))}{' '}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  Max LTV: {fPercent(vaultInfo.maxLTV)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item sm={12} sx={{ mt: 2 }}>
              <Stack alignItems="center">
                <Typography variant="h6" textAlign="center">
                  Borrowing Power Used
                </Typography>
                <Typography variant="inherit">
                  {fPercent(
                    Number(utils.formatUnits(vaultInfo.borrowingPowerUsed, 6))
                  )}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.500' }}>
                  {fCurrency(
                    Number(utils.formatEther(vaultInfo.borrowingPowerUsedUSD))
                  )}{' '}
                  USD
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          {Number(utils.formatUnits(vaultInfo.borrowingPowerUsed, 6)) > 100 && (
            <>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <LiquidateVault
                vaultInfo={vaultInfo}
                vaultID={Number(vaultID)}
                token={token as string}
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
