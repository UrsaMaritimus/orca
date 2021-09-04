import { useState, FC } from 'react';
import * as Yup from 'yup';
// material
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
  Backdrop,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-eva/arrow-right-outline';
import backSpace from '@iconify/icons-eva/backspace-outline';
// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useFormik, Form, FormikProvider } from 'formik';

import { utils } from 'ethers';
import { fCurrency, fPercent, fNumber } from '@orca/util';
import { withdrawCollateral } from '@orca/shared/funcs';

import { Loader } from '@orca/components/loader';
import { tokenInfo } from '@orca/shared/base';
import {
  handleTransaction,
  useAddTransaction,
} from '@orca/components/transaction';
import { StepperProps } from './stepper.type';
// ----------------------------------------------------------------------

export const WithdrawStepper: FC<StepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to withdraw', 'Withdraw'];
  const addTransaction = useAddTransaction();
  // web3 init info
  const { library, chainId } = useWeb3React<Web3Provider>();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // Form
  const ValueSchema = Yup.object().shape({
    withdrawAmount: Yup.number()
      .required('Withdraw amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatEther(vaultInfo.availableWithdraw))),
  });
  const formik = useFormik({
    initialValues: {
      withdrawAmount: undefined,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        handleNext();
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

  const handleWithdraw = async () => {
    handleNext();
    const success = await handleTransaction({
      transaction: withdrawCollateral(
        library,
        vaultID,
        values.withdrawAmount,
        tokenInfo[token as string].erc20,
        chainId
      ),
      messages: {
        loading: 'Withdrawing collateral...',
        success: 'Collateral withdrawn!',
        error: 'Failed to withdraw collateral.',
      },
      chainId,
    });
    addTransaction({
      type: 'withdraw',
      amount: utils.parseEther(values.withdrawAmount.toString()),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    resetForm();
    handleReset();
  };
  return (
    <>
      <Backdrop
        sx={{ position: 'absolute', zIndex: 99 }}
        open={activeStep === steps.length}
      >
        <Loader />
      </Backdrop>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = { completed: false };
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <>
        {activeStep === 0 && (
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container sx={{ m: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Typography variant="h6" textAlign="center">
                    Available to withdraw:
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src={tokenInfo[token as string].icon}
                      sx={{
                        width: 15,

                        height: 15,
                      }}
                      color="inherit"
                    />
                    <Typography variant="h6" textAlign="center">
                      {`${fNumber(
                        Number(utils.formatEther(vaultInfo.availableWithdraw))
                      )} ${token}`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Withdraw Amount"
                  variant="filled"
                  {...getFieldProps('withdrawAmount')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          component="img"
                          src={tokenInfo[token as string].icon}
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
                              'withdrawAmount',
                              utils.formatEther(vaultInfo.availableWithdraw)
                            )
                          }
                          variant="text"
                        >
                          MAX
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    touched.withdrawAmount && errors.withdrawAmount
                  )}
                  helperText={touched.withdrawAmount && errors.withdrawAmount}
                />
              </Box>
              <Grid container>
                <Grid item xs={6} display="flex" justifyContent="center">
                  <Button
                    color="inherit"
                    disabled
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    startIcon={<Icon icon={backSpace} width={25} height={25} />}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid xs={6} display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Icon icon={arrowRight} width={25} height={25} />}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        )}
        {activeStep >= 1 && (
          <>
            <Box
              p={2}
              borderRadius={1}
              mx={'auto'}
              width="95%"
              mt={2}
              mb={2}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
              }}
            >
              <Grid container sx={{ mt: 1, mb: 1 }}>
                <Grid
                  item
                  xs={3}
                  sm={5}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Typography variant="subtitle1" textAlign="center">
                    Amount
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                  sm={7}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Stack alignItems={'flex-end'}>
                    <Stack direction="row" spacing={0.5} alignItems={'center'}>
                      <Box
                        component="img"
                        src={tokenInfo[token as string].icon}
                        sx={{
                          width: 15,

                          height: 15,
                        }}
                        color="inherit"
                      />
                      <Typography variant="body2">
                        {values.withdrawAmount}
                      </Typography>
                      <Typography sx={{ ml: 0.5 }} variant="caption">
                        {token}
                      </Typography>
                    </Stack>
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
                        values.withdrawAmount *
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      USD
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={5}
                  mt={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Typography variant="subtitle1" textAlign="center">
                    Borrowing Power
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm={7}
                  mt={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="subtitle2">
                      {values.withdrawAmount &&
                        // Recacalculate what their new borrowing power will be
                        fPercent(
                          Number(
                            vaultInfo.collateral.eq(
                              utils.parseEther(values.withdrawAmount.toString())
                            )
                              ? 0
                              : utils.formatUnits(
                                  utils.parseUnits('100', 6).sub(
                                    vaultInfo.debt
                                      .mul(1e8)
                                      .mul(vaultInfo.peg)
                                      .div(
                                        vaultInfo.collateral
                                          .mul(vaultInfo.tokenPrice)
                                          .sub(
                                            utils
                                              .parseEther(
                                                values.withdrawAmount.toString()
                                              )
                                              .mul(vaultInfo.tokenPrice)
                                          )
                                      )
                                      .mul(vaultInfo.mcp)
                                      .div(100)
                                  ),
                                  6
                                )
                          )
                        )}
                    </Typography>
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
                        (Number(utils.formatEther(vaultInfo.collateral)) -
                          values.withdrawAmount) *
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8)) *
                          (vaultInfo.maxLTV / 100) -
                          Number(utils.formatEther(vaultInfo.debt))
                      )}{' '}
                      USD
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid xs={6} display="flex" justifyContent="center">
                <LoadingButton
                  startIcon={<Icon icon={backSpace} width={25} height={25} />}
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  loading={activeStep === steps.length}
                >
                  Back
                </LoadingButton>
              </Grid>
              <Grid xs={6} display="flex" justifyContent="center">
                <LoadingButton
                  endIcon={<Icon icon={arrowRight} width={25} height={25} />}
                  variant="contained"
                  onClick={handleWithdraw}
                  loading={activeStep === steps.length}
                  loadingPosition="end"
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </>
        )}
      </>
    </>
  );
};

export default WithdrawStepper;
