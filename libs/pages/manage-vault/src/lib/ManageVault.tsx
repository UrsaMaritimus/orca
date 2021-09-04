/* eslint-disable-next-line */
import { useState, useEffect } from 'react';
import useSwr from 'swr';

import { Icon } from '@iconify/react';
import backArrowIos from '@iconify/icons-eva/arrow-ios-back-outline';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { useRouter } from 'next/router';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  IconButton,
  Container,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Popover,
  Box,
  Typography,
  Tab,
  Stack,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// Custom stuff
import { NextLink } from '@orca/components/links';
import { Page } from '@orca/components/page';
import { routes } from '@orca/shared/base';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { Loader } from '@orca/components/loader';
import { Connect } from '@orca/components/connect';
import { handleTransaction } from '@orca/components/transaction';
import {
  getVaultInfo,
  vaultOwner,
  deleteVault,
  getVault,
} from '@orca/shared/funcs';

import { Deposit } from './Deposit';
import { Borrows } from './Borrows';
import { Liquidate } from './Liquidate';
import { tokenInfo } from '@orca/shared/base';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

//-----------------------------------------

export function ManageVault() {
  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;
  // Get the url unfo
  const router = useRouter();
  const { vaultID, token } = router.query;

  // Handles which tab
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handles destroying vault
  const [openDestroy, setOpenDestroy] = useState(false);
  const handleClickOpen = () => {
    setOpenDestroy(true);
  };
  const handleClose = () => {
    setOpenDestroy(false);
  };
  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  // Destroy the vault
  const handleCloseDestroy = async () => {
    setOpenDestroy(false);
    handleTransaction({
      transaction: deleteVault(
        library,
        Number(vaultID),
        tokenInfo[token as string].erc20,
        chainId
      ),
      messages: {
        loading: 'Destroying vault...',
        success: 'Vault destroyed!',
        error: 'Vault failed to be destroyed.',
      },
      chainId,
    });

    router.push(routes.APP.VAULTS.USER);
  };

  // Vault info using SWR
  const { data: vaultInfo, mutate: vaultInfoMutate } = useSwr(
    shouldFetch
      ? [
          'getVaultInfo',
          library,
          chainId,
          tokenInfo[token as string].erc20,
          vaultID,
        ]
      : null,
    getVaultInfo()
  );
  useKeepSWRDataLiveAsBlocksArrive(vaultInfoMutate);

  // Is owner?
  const { data: isOwner, mutate: vaultOwnerMutate } = useSwr(
    shouldFetch
      ? [
          'vaultOwner',
          library,
          vaultID,
          account,
          tokenInfo[token as string].erc20,
          chainId,
        ]
      : null,
    vaultOwner()
  );
  useKeepSWRDataLiveAsBlocksArrive(vaultOwnerMutate);

  // Keep all the information up to date
  useEffect(() => {
    if (library) {
      // Change this in the future
      const vault = getVault(
        tokenInfo[token as string].erc20,
        library,
        chainId
      );
      // Set events up for updating
      const depositedCollateral = vault.filters.DepositCollateral();
      vault.on(depositedCollateral, (vaultId, amount) => {
        if (vaultID === vaultId.toString()) {
          console.log(
            `EMIT: ${vaultId} deposited more collateral of amount ${amount}`
          );
          vaultInfoMutate(undefined, true);
        }
      });

      const withdrawCollateral = vault.filters.WithdrawCollateral();
      vault.on(withdrawCollateral, (vaultId, amount) => {
        if (vaultID === vaultId.toString()) {
          console.log(
            `EMIT: ${vaultId} withdrew collateral of amount ${amount}`
          );
          vaultInfoMutate(undefined, true);
        }
      });

      return () => {
        vault.removeAllListeners(depositedCollateral);
        vault.removeAllListeners(withdrawCollateral);
      };
    }
  }, [library, account, vaultInfoMutate, chainId, token, vaultID]);

  return (
    <Connect title={'Manage Vault'}>
      <RootStyle title={`Manage Vault | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <TabContext value={value}>
          <Container maxWidth="sm">
            <Card>
              <CardHeader
                title={`${token} Vault #${vaultID}`}
                subheader={'Vault information '}
                avatar={
                  <IconButton
                    color="secondary"
                    LinkComponent={NextLink}
                    href={routes.APP.VAULTS.USER}
                  >
                    <Icon icon={backArrowIos} width={30} height={30} />
                  </IconButton>
                }
                sx={{ mb: 3 }}
                action={
                  isOwner ? (
                    vaultInfo && vaultInfo.debt.isZero() ? (
                      <IconButton color="secondary" onClick={handleClickOpen}>
                        <Icon icon={trash2Outline} width={30} height={30} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onMouseEnter={handleHoverOpen}
                        onMouseLeave={handleHoverClose}
                        color="info"
                      >
                        <Icon icon={trash2Outline} width={30} height={30} />
                      </IconButton>
                    )
                  ) : undefined
                }
              />
              {isOwner && (
                <Box sx={{ p: 2, mt: 2, width: '100%', borderRadius: 1 }}>
                  <TabList
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                  >
                    <Tab
                      key="Collateral"
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="h4">Collateral</Typography>
                        </Stack>
                      }
                      value={String(1)}
                    />
                    <Tab
                      key="Loans"
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="h4">Loans</Typography>
                        </Stack>
                      }
                      value={String(2)}
                      sx={{ fontSize: 'x-large' }}
                    />
                  </TabList>
                </Box>
              )}
            </Card>
            {vaultInfo ? (
              <>
                <TabPanel key="Deposit" value={String(1)}>
                  <Deposit
                    token={token as 'AVAX'}
                    vaultInfo={vaultInfo}
                    isOwner={isOwner}
                    vaultID={Number(vaultID)}
                  />
                </TabPanel>
                <TabPanel key="Loans" value={String(2)}>
                  <Borrows
                    vaultInfo={vaultInfo}
                    vaultID={Number(vaultID)}
                    isOwner={isOwner}
                    token={token as string}
                  />
                </TabPanel>
              </>
            ) : (
              <Card
                sx={{
                  mt: 2,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
                }}
              >
                <Loader />
              </Card>
            )}

            {!isOwner && vaultInfo && (
              <Liquidate
                vaultInfo={vaultInfo}
                vaultID={Number(vaultID)}
                isOwner={isOwner}
                token={token as string}
              />
            )}
          </Container>
        </TabContext>

        {
          // Dialogs an popovers for use in the page
        }
        <Dialog open={openDestroy} onClose={handleClose}>
          <DialogTitle>Destroy the vault?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you destroy this vault, you will be returned all deposited
              collateral and have to make a new vault in the future to take more
              0% interest loans. Do you wish to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleCloseDestroy} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
              Pay back debt
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Cannot destroy vault while it has debt in it. Please repay the
              debt before you can destroy the vault.
            </Typography>
          </Box>
        </Popover>
      </RootStyle>
    </Connect>
  );
}

export default ManageVault;
