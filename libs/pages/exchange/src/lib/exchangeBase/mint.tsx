import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { Icon } from '@iconify/react';
import arrowheadDownOutline from '@iconify/icons-eva/arrowhead-down-outline';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { BigNumber, utils } from 'ethers';

import { Loader } from '@orca/components/loader';
import {
  usdApprovedExchange,
  approveUsdExchange,
  mintFromExchange,
} from '@orca/shared/funcs';
import { fCurrency, fNumber, fPercent } from '@orca/util';
import { erc20Tokens, tokenInfo } from '@orca/shared/base';
import {
  handleTransaction,
  useAddTransaction,
} from '@orca/components/transaction';

// ------------------------------------------------------

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': theme.palette.secondary.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
}));

//----------------------------------------------------------

type MintProps = {
  token: 'USDC';
  library: Web3Provider;
  chainId: number;
  account: string;
  usdBalance: BigNumber;
  exchangeBalance: BigNumber;
  mintingFee: BigNumber;
};

export const Mint: FC<MintProps> = ({
  token,
  library,
  chainId,
  account,
  usdBalance,
  exchangeBalance,
  mintingFee,
}) => {
  const [approving, setApproving] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const shouldFetch = !!library;
  const addTransaction = useAddTransaction();
  // Get usdc approved
  const { data: userUSDApproved, mutate: usdcApprovedMutate } = useSWR(
    shouldFetch
      ? [
          `usdcApproveMint${token}`,
          library,
          account,
          chainId,
          usdBalance,
          token,
        ]
      : null,
    usdApprovedExchange()
  );
  // Form
  const ValueSchema = Yup.object().shape({
    swapAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatUnits(usdBalance, 6))),
  });

  const formik = useFormik({
    initialValues: {
      swapAmount: undefined,
      returnAmount: 0,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        resetForm();
        setSubmitting(false);
      }
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
  } = formik;

  useEffect(() => {
    setFieldValue(
      'returnAmount',
      !values.swapAmount
        ? 0
        : fNumber(
            Number(
              utils.formatEther(
                utils
                  .parseUnits(fNumber(values.swapAmount, 6).toString(), 6)
                  .mul(utils.parseUnits('1', 16))
                  .div(10075)
              )
            )
          )
    );
  }, [values, setFieldValue]);

  if (chainId === 43114) {
    return (
      <Card>
        <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
          {' '}
          Main Net not deployed yet. Please switch to Fuji.
        </Typography>
      </Card>
    );
  }

  // For approving USDC
  const handleApproveUSDC = async () => {
    setApproving(true);
    await handleTransaction({
      transaction: approveUsdExchange(
        library,
        chainId,
        utils.parseEther('1000000000000'),
        token
      ),
      messages: {
        loading: 'Approving USDC...',
        success: 'Succesfully approved!',
        error: 'Failed to approve USDC.',
      },
      mutates: [usdcApprovedMutate],
      chainId,
    });
    setApproving(false);
  };

  // For minting AVAI from USDC
  const handleMintAVAI = async () => {
    setMinting(true);
    const success = await handleTransaction({
      transaction: mintFromExchange(
        library,
        chainId,
        utils.parseUnits(
          values.swapAmount ? values.swapAmount.toString() : '0',
          6
        )
      ),
      messages: {
        loading: 'Minting AVAI...',
        success: 'Succesfully minted!',
        error: 'Failed to mint AVAI.',
      },
      chainId,
    });
    addTransaction({
      type: 'mint',
      amount: utils.parseUnits(values.swapAmount.toString(), 6),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    setMinting(false);
    resetForm();
  };

  if (typeof account === 'string') {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            title={'USDC Exchange'}
            avatar={
              <Box
                component="img"
                src={erc20Tokens[token].icon}
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
          />

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container>
                {/* Balances of USD */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent={'center'}
                >
                  <Typography variant="h6">Balance:</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent={'center'}
                >
                  <Typography variant="h6">
                    {`${fNumber(
                      Number(utils.formatUnits(usdBalance, 6)),
                      2
                    )} ${token}`}
                  </Typography>
                </Grid>
                {/* How much to use for minting */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Amount"
                      variant="filled"
                      {...getFieldProps('swapAmount')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              component="img"
                              src={erc20Tokens[token].icon}
                              sx={{
                                width: 25,

                                height: 25,
                              }}
                              color="inherit"
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="start">
                            <Button
                              onClick={() =>
                                setFieldValue(
                                  'swapAmount',
                                  utils.formatUnits(usdBalance, 6)
                                )
                              }
                              variant="text"
                            >
                              MAX
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(touched.swapAmount && errors.swapAmount)}
                      helperText={touched.swapAmount && errors.swapAmount}
                    />
                  </Box>
                </Grid>
                {/* Transition */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Icon icon={arrowheadDownOutline} width={25} height={25} />
                </Grid>
                {/* Displays output in AVAI */}
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ mb: 1 }}
                >
                  <Box sx={{ mx: 'auto', mt: 1, width: '80%' }}>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      textAlign="left"
                    >
                      Expected Output
                    </Typography>
                  </Box>
                </Grid>
                {/* In textfield which has font changed */}
                <Grid
                  xs={12}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Box sx={{ mx: 'auto', width: '80%' }}>
                    <ReturnTextField
                      fullWidth
                      type="number"
                      label="Amount"
                      variant="filled"
                      disabled
                      {...getFieldProps('returnAmount')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              component="img"
                              src={tokenInfo.AVAI.icon}
                              sx={{
                                width: 25,

                                height: 25,
                              }}
                              color="inherit"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                {/* Lets handle everything now! */}
                <Grid
                  item
                  xs={6}
                  mb={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    sx={{ mr: 1, minWidth: '150px' }}
                    disabled={userUSDApproved}
                    onClick={handleApproveUSDC}
                    loading={approving}
                  >
                    Approve {token}
                  </LoadingButton>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-start">
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={!userUSDApproved || usdBalance.isZero()}
                    sx={{ minWidth: '150px' }}
                    onClick={handleMintAVAI}
                    loading={minting}
                  >
                    Exchange
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
        <Card
          sx={{
            maxWidth: 300,
            m: 'auto',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.400' : 'info.lighter',
          }}
        >
          <Grid container sx={{ my: 2 }}>
            <Grid item xs={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Minting Fee
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fPercent(Number(utils.formatUnits(mintingFee, 0)) / 100)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Available {token}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fCurrency(Number(utils.formatUnits(exchangeBalance, 6)))}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
