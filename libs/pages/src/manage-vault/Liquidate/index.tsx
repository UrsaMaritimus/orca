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
  IconButton,
  Divider,
  Popover,
} from '@mui/material';

import { utils } from 'ethers';
import { fNumber } from '@orca/util';

import { tokenInfo } from '@orca/shared/base';
import { LiquidateVault, LiquidateProps } from './liquidate';

//-----------------------------------------

export const Liquidate: FC<LiquidateProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
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
            <Typography variant="h4">Liquidate Vault</Typography>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box
                component="img"
                src={tokenInfo[token].icon}
                sx={{
                  width: 30,

                  height: 30,
                }}
                color="inherit"
              />
              <Typography variant="h4" sx={{ color: 'grey.500' }}>
                {tokenInfo[token].display}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container my={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography variant="h4">
              Vault{' '}
              {Number(utils.formatUnits(vaultInfo.borrowingPowerUsed, 6)) > 100
                ? 'is'
                : 'not'}{' '}
              ready to be liquidated.
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Stack alignItems="center" direction="row">
              <Typography variant="subtitle2">
                Liquidation Price: $
                {fNumber(
                  !vaultInfo.collateral.isZero()
                    ? tokenInfo[token].underlyingDecimals
                      ? Number(
                          utils.formatUnits(
                            vaultInfo.debt
                              .mul(vaultInfo.peg)
                              .mul(vaultInfo.mcp)
                              .div(
                                vaultInfo.collateral
                                  .mul(100)
                                  .mul(10 ** (18 - tokenInfo[token].decimals))
                              ),
                            8
                          )
                        ) /
                        10 ** (18 - tokenInfo[token].underlyingDecimals)
                      : Number(
                          utils.formatUnits(
                            vaultInfo.debt
                              .mul(vaultInfo.peg)
                              .mul(vaultInfo.mcp)
                              .div(
                                vaultInfo.collateral
                                  .mul(100)
                                  .mul(10 ** (18 - tokenInfo[token].decimals))
                              ),
                            8
                          )
                        )
                    : 0,
                  2
                )}{' '}
                USD
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
              Liquidation Price
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              The liquidation price for this vault is reached when{' '}
              {tokenInfo[token].display} reaches this USD value.
            </Typography>
          </Box>
        </Popover>
      </Container>
    </Card>
  );
};

export default Liquidate;
