import { FC, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { styled } from '@mui/material/styles';

import {
  Grid,
  Card,
  CardHeader,
  Button,
  Typography,
  IconButton,
  Container,
  Stack,
  Modal,
  Divider,
  Box,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { utils } from 'ethers';

import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-eva/close-outline';
import diagonalUp from '@iconify/icons-eva/diagonal-arrow-right-up-outline';
import copyIcon from '@iconify/icons-eva/copy-outline';
import checkmarkCircle from '@iconify/icons-eva/checkmark-circle-outline';

import { fNumber, formatEtherscanLink, shortenHex } from '@orca/util';
import { NextLink } from '@orca/components/links';

import {
  useRemoveTransactions,
  transactionState,
} from '@orca/components/transaction';

import { seeAccount } from './atom';

const ModifiedJazzicon = styled(Jazzicon)({
  width: 32,
  height: 32,
});

export const AccountInfo: FC = () => {
  // Copy state
  const [copied, setCopied] = useState<boolean>(false);
  // Account state
  const open = useRecoilValue(seeAccount);
  const setOpen = useSetRecoilState(seeAccount);
  //Transaction state
  const transactions = useRecoilValue(transactionState);
  const removeTranscations = useRemoveTransactions();

  //web3
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const handleClick = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(setCopied, 1000, false);
  };

  if (account)
    return (
      <Modal
        sx={{
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={handleClick}
      >
        <Container maxWidth="xs">
          <Card>
            <CardHeader
              title={'Account'}
              action={
                <IconButton onClick={handleClick}>
                  <Icon icon={closeIcon} />
                </IconButton>
              }
            />
            <Grid container sx={{ mb: 2 }}>
              <Grid item my={1} xs={12} display="flex" justifyContent="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ModifiedJazzicon address={account} />

                  <Typography variant="h3">{`${shortenHex(
                    account,
                    4
                  )}`}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <NextLink
                  href={formatEtherscanLink('Account', [
                    chainId as number,
                    account,
                  ])}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    '&:hover': { opacity: 0.48 },
                  }}
                >
                  <Stack direction="row" spacing="1px" alignItems="center">
                    <Icon icon={diagonalUp} width={20} height={20} />
                    <Typography variant="caption">
                      View on C-Chain Explorer
                    </Typography>
                  </Stack>
                </NextLink>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <CopyToClipboard text={account} onCopy={handleCopy}>
                  <NextLink
                    underline="none"
                    href=""
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      transition: (theme) =>
                        theme.transitions.create('opacity', {
                          duration: theme.transitions.duration.shortest,
                        }),
                      '&:hover': { opacity: 0.48 },
                    }}
                  >
                    {!copied ? (
                      <Stack direction="row" spacing="2px" alignItems="center">
                        <Icon icon={copyIcon} width={20} height={20} />
                        <Typography variant="caption">Copy Address</Typography>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing="2px" alignItems="center">
                        <Icon icon={checkmarkCircle} width={20} height={20} />
                        <Typography variant="caption">Copied</Typography>
                      </Stack>
                    )}
                  </NextLink>
                </CopyToClipboard>
              </Grid>
              <Grid item my={2} xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'grey.600' : 'grey.400',
                    fontWeight: 'bold',
                    ml: 3,
                    mt: 0.5,
                  }}
                >
                  Recent Transactions
                </Typography>
              </Grid>
              <Grid item xs={6} mb={1} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mr: 3 }}
                  onClick={removeTranscations}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'grey.600'
                          : 'grey.400',
                      fontWeight: 'bold',
                    }}
                  >
                    Clear all
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                {transactions.length === 0 && (
                  <Grid container>
                    <Grid xs={12} display="flex" justifyContent="center" mt={1}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'grey.500',
                          fontWeight: 'bold',
                        }}
                      >
                        Your transactions will show up here.
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {transactions.length > 0 &&
                  [...transactions].reverse().map((transaction) => {
                    return (
                      <NextLink
                        href={formatEtherscanLink('Transaction', [
                          chainId,
                          transaction.hash,
                        ])}
                        key={transaction.hash}
                        underline="none"
                        target="_blank"
                        sx={{}}
                      >
                        <Grid
                          container
                          sx={{
                            color: 'text.secondary',
                            transition: (theme) =>
                              theme.transitions.create('opacity', {
                                duration: theme.transitions.duration.shortest,
                              }),
                            '&:hover': { opacity: 0.48 },
                          }}
                        >
                          <Grid item xs={10}>
                            <Typography
                              variant="body2"
                              sx={{
                                ml: 3,
                              }}
                            >
                              {transaction.type.charAt(0).toUpperCase() +
                                transaction.type.slice(1)}{' '}
                              {transaction.type === 'mint'
                                ? fNumber(
                                    utils.formatUnits(transaction.amount, 6),
                                    2
                                  )
                                : fNumber(
                                    utils.formatEther(transaction.amount),
                                    2
                                  )}{' '}
                              {transaction.type === 'borrow' ||
                              transaction.type === 'payback' ||
                              transaction.type === 'mint'
                                ? 'AVAI'
                                : transaction.vault}{' '}
                              in {transaction.vault}{' '}
                              {transaction.type === 'mint' ||
                              transaction.type === 'redeem'
                                ? 'Exchange'
                                : 'Bank'}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <Box mr={2}>
                              <Icon
                                icon={checkmarkCircle}
                                width={20}
                                height={20}
                                style={{ color: '#2BB673' }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </NextLink>
                    );
                  })}
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Modal>
    );
  return <> </>;
};
