import { useState, FC } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
// material
import {
  Box,
  Step,
  Button,
  Stepper,
  StepLabel,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
  Backdrop,
  styled,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-eva/arrow-right-outline';
import backSpace from '@iconify/icons-eva/backspace-outline';
// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useFormik, Form, FormikProvider } from 'formik';

import { utils } from 'ethers';
import { fCurrency, fPercent, fNumber, colorScale } from '@orca/util';
import { withdrawCollateral } from '@orca/web3';

import { Loader, handleTransaction, useAddTransaction } from '@orca/components';
import { BankTokenInfo } from '@orca/shared';

import { StepperProps } from './stepper.type';
import { ImageAspectRatioOutlined } from '@mui/icons-material';

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));
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
  const [alertActive, setAlertActive] = useState<boolean>(false);

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
      .max(
        Number(
          utils.formatUnits(
            vaultInfo.availableWithdraw,
            BankTokenInfo[token].decimals
          )
        )
      ),
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
        values.withdrawAmount
          ? typeof values.withdrawAmount === 'number'
            ? values.withdrawAmount.toFixed(BankTokenInfo[token].decimals)
            : values.withdrawAmount
          : '',
        BankTokenInfo[token].erc20,
        BankTokenInfo[token].decimals,
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
      amount: utils.parseUnits(
        values.withdrawAmount
          ? typeof values.withdrawAmount === 'number'
            ? values.withdrawAmount.toFixed(BankTokenInfo[token].decimals)
            : values.withdrawAmount
          : '',
        BankTokenInfo[token].decimals
      ),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    resetForm();
    handleReset();
  };

  const handleWithdrawHighLTV = async () => {
    setAlertActive(false);
    await handleWithdraw();
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
                    <Image
                      src={BankTokenInfo[token].icon}
                      width={25}
                      height={25}
                      color="inherit"
                    />
                    <Typography variant="h6" textAlign="center">
                      {`${
                        BankTokenInfo[token].underlyingDecimals
                          ? Number(
                              utils.formatUnits(
                                vaultInfo.availableWithdraw,
                                BankTokenInfo[token].decimals
                              )
                            ).toExponential()
                          : fNumber(
                              Number(
                                utils.formatUnits(
                                  vaultInfo.availableWithdraw,
                                  BankTokenInfo[token].decimals
                                )
                              )
                            )
                      } ${BankTokenInfo[token].display}`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mx: 'auto', my: 2, width: { xs: '80%', md: '50%' } }}>
                <InputTextField
                  fullWidth
                  type="number"
                  label="Withdraw Amount"
                  variant="filled"
                  {...getFieldProps('withdrawAmount')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src={BankTokenInfo[token].icon}
                          width={25}
                          height={25}
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
                              utils.formatUnits(
                                vaultInfo.availableWithdraw,
                                BankTokenInfo[token].decimals
                              )
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
                <Grid item xs={6} display="flex" justifyContent="center">
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
                      <Image
                        src={BankTokenInfo[token].icon}
                        width={15}
                        height={15}
                        color="inherit"
                      />
                      <Typography variant="body2">
                        {values.withdrawAmount && values.withdrawAmount}
                      </Typography>
                      <Typography sx={{ ml: 0.5 }} variant="caption">
                        {BankTokenInfo[token].display}
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
                    New LTV
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
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color={
                        values.withdrawAmount &&
                        colorScale(
                          (100 * Number(utils.formatEther(vaultInfo.debt))) /
                            Number(
                              utils.formatUnits(
                                vaultInfo.collateral
                                  .sub(
                                    utils.parseUnits(
                                      typeof values.withdrawAmount === 'number'
                                        ? values.withdrawAmount.toFixed(
                                            BankTokenInfo[token].decimals
                                          )
                                        : values.withdrawAmount,
                                      BankTokenInfo[token].decimals
                                    )
                                  )
                                  .mul(vaultInfo.tokenPrice)
                                  .div(vaultInfo.peg),
                                BankTokenInfo[token].decimals
                              )
                            ),
                          vaultInfo.maxLTV - 30,
                          vaultInfo.maxLTV
                        )
                      }
                    >
                      {values.withdrawAmount &&
                        fPercent(
                          (100 * Number(utils.formatEther(vaultInfo.debt))) /
                            Number(
                              utils.formatUnits(
                                vaultInfo.collateral
                                  .sub(
                                    utils.parseUnits(
                                      values.withdrawAmount
                                        ? typeof values.withdrawAmount ===
                                          'number'
                                          ? values.withdrawAmount.toFixed(
                                              BankTokenInfo[token].decimals
                                            )
                                          : values.withdrawAmount
                                        : '',
                                      BankTokenInfo[token].decimals
                                    )
                                  )
                                  .mul(vaultInfo.tokenPrice)
                                  .div(vaultInfo.peg),
                                BankTokenInfo[token].decimals
                              )
                            )
                        )}
                    </Typography>
                    <Typography
                      variant="caption"
                      textAlign="center"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'grey.600'
                            : 'grey.400',
                      }}
                    >
                      {values.withdrawAmount &&
                        fCurrency(
                          (Number(
                            utils.formatUnits(
                              vaultInfo.collateral,
                              BankTokenInfo[token].decimals
                            )
                          ) -
                            values.withdrawAmount) *
                            Number(utils.formatUnits(vaultInfo.tokenPrice, 8)) *
                            (vaultInfo.maxLTV / 100) -
                            Number(utils.formatEther(vaultInfo.debt))
                        )}{' '}
                      AVAI Available
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid item xs={6} display="flex" justifyContent="center">
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
              <Grid item xs={6} display="flex" justifyContent="center">
                <LoadingButton
                  endIcon={<Icon icon={arrowRight} width={25} height={25} />}
                  variant="contained"
                  onClick={
                    values.withdrawAmount &&
                    (100 * Number(utils.formatEther(vaultInfo.debt))) /
                      Number(
                        utils.formatUnits(
                          vaultInfo.collateral
                            .sub(
                              utils.parseUnits(
                                values.withdrawAmount
                                  ? typeof values.withdrawAmount === 'number'
                                    ? values.withdrawAmount.toFixed(
                                        BankTokenInfo[token].decimals
                                      )
                                    : values.withdrawAmount
                                  : '',
                                BankTokenInfo[token].decimals
                              )
                            )
                            .mul(vaultInfo.tokenPrice)
                            .div(vaultInfo.peg),
                          BankTokenInfo[token].decimals
                        )
                      ) /
                      vaultInfo.maxLTV >
                      0.8
                      ? () => setAlertActive(true)
                      : handleWithdraw
                  }
                  loading={activeStep === steps.length}
                  loadingPosition="end"
                >
                  Submit
                </LoadingButton>
                <Dialog
                  open={alertActive}
                  onClose={() => {
                    setAlertActive(false);
                  }}
                >
                  <DialogTitle>Borrowing close to max LTV</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You will be borrowing at 80% or above of the max LTV (Loan
                      to Value ratio) with this withdrawal. There are risks with
                      sudden price movements of partial liquidation with this
                      borrowing amount. Are you okay with this?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setAlertActive(false);
                      }}
                    >
                      No
                    </Button>
                    <Button onClick={handleWithdrawHighLTV} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </>
        )}
      </>
    </>
  );
};

export default WithdrawStepper;
