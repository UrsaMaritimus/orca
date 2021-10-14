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
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { BigNumber, utils } from 'ethers';

import {
  handleTransaction,
  useAddTransaction,
} from '@orca/components/transaction';
import { Loader } from '@orca/components/loader';
import {
  avaiApprovedExchange,
  approveAvaiExchange,
  redeemFromExchange,
} from '@orca/shared/funcs';
import { fCurrency, fNumber, fPercent } from '@orca/util';
import { tokenInfo } from '@orca/shared/base';

// ------------------------------------------------------

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': theme.palette.secondary.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

//----------------------------------------------------------

type MintProps = {
  token: 'USDC';
  library: Web3Provider;
  chainId: number;
  account: string;
  avaiBalance: BigNumber;
  exchangeBalance: BigNumber;
  mintingFee: BigNumber;
  mutates: any[];
};

export const Redeem: FC<MintProps> = ({
  token,
  library,
  chainId,
  account,
  avaiBalance,
  exchangeBalance,
  mintingFee,
  mutates,
}) => {
  const [redeeming, setRedeeming] = useState<boolean>(false);
  const addTransaction = useAddTransaction();
  const shouldFetch = !!library;

  // Form
  const ValueSchema = Yup.object().shape({
    swapAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatEther(avaiBalance))),
  });

  const formik = useFormik({
    initialValues: {
      swapAmount: undefined,
      returnAmount: 0,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        handleMintAVAI();
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
              utils.formatUnits(
                utils
                  .parseEther(
                    fNumber(Number(values.swapAmount).toFixed(18), 18)
                  )
                  .mul(utils.parseUnits('1', 4).sub(mintingFee))
                  .div(utils.parseUnits('1', 16)),
                6
              )
            )
          )
    );
  }, [values, setFieldValue, mintingFee]);

  // For redeeming USDC for AVAI
  const handleMintAVAI = async () => {
    setRedeeming(true);
    const success = await handleTransaction({
      transaction: redeemFromExchange(
        library,
        chainId,
        utils.parseEther(values.swapAmount ? values.swapAmount.toString() : '0')
      ),
      messages: {
        loading: 'Redeeming USDC...',
        success: 'Succesfully redeemed!',
        error: 'Failed to redeem usdc.',
      },
      mutates,
      chainId,
    });
    addTransaction({
      type: 'redeem',
      amount: utils.parseEther(values.swapAmount.toString()),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    setRedeeming(false);
    resetForm();
    setFieldValue('swapAmount', 0);
  };

  if (typeof account === 'string') {
    return (
      <Container maxWidth="sm">
        <Card>
          <Backdrop sx={{ position: 'absolute', zIndex: 99 }} open={redeeming}>
            <Loader />
          </Backdrop>
          <CardHeader
            title={'AVAI Exchange'}
            avatar={
              <Box
                component="img"
                src={tokenInfo['AVAI'].icon}
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
                      Number(utils.formatEther(avaiBalance)),
                      2,
                      true
                    )} AVAI`}
                  </Typography>
                </Grid>
                {/* How much to use for minting */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
                    <InputTextField
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
                              src={tokenInfo['AVAI'].icon}
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
                                  utils.formatEther(avaiBalance)
                                )
                              }
                              variant="text"
                            >
                              MAX
                            </Button>
                          </InputAdornment>
                        ),
                        disableUnderline: true,
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
                  item
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
                              src={tokenInfo[token].icon}
                              sx={{
                                width: 25,

                                height: 25,
                              }}
                              color="inherit"
                            />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                    />
                  </Box>
                </Grid>
                {/* Lets handle everything now! */}

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  mb={1}
                >
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={avaiBalance.isZero()}
                    sx={{ px: 4 }}
                    loading={redeeming}
                    type="submit"
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
