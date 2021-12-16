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
import { BigNumber, utils } from 'ethers';
import { useFormik, Form, FormikProvider } from 'formik';

import { Loader, handleTransaction, useAddTransaction } from '@orca/components';
import { fPercent, fNumber, colorScale, fCurrency } from '@orca/util';

import { borrowToken } from '@orca/web3';
import { BankTokenInfo, ProtocolTokenInfo } from '@orca/shared';
import { StepperProps } from './stepper.type';

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));
// ----------------------------------------------------------------------

export const BorrowStepper: FC<StepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to borrow', 'Borrow'];

  // web3 init info
  const { library, chainId } = useWeb3React<Web3Provider>();

  const [activeStep, setActiveStep] = useState(0);
  const [alertActive, setAlertActive] = useState<boolean>(false);

  const addTransaction = useAddTransaction();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const maxBorrow = Number(
    utils.formatEther(vaultInfo.borrowingPowerAvailableUSD)
  );

  // Form
  const ValueSchema = Yup.object().shape({
    borrowAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(maxBorrow),
  });
  const formik = useFormik({
    initialValues: {
      borrowAmount: undefined,
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
    setFieldValue,
    handleSubmit,
    getFieldProps,
    resetForm,
  } = formik;

  const handleBorrow = async () => {
    handleNext();
    const success = await handleTransaction({
      transaction: borrowToken(
        library,
        vaultID,
        values.borrowAmount,
        BankTokenInfo[token].erc20,
        chainId
      ),
      messages: {
        loading: 'Borrowing AVAI...',
        success: 'Successfully borrowed!',
        error: 'Failed to borrow AVAI.',
      },
      chainId,
    });
    addTransaction({
      type: 'borrow',
      amount: utils.parseEther(values.borrowAmount.toFixed(18)),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    resetForm();
    handleReset();
  };

  const handleBorrowHighLTV = async () => {
    setAlertActive(false);
    await handleBorrow();
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
                    Available to borrow:
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
                      src={ProtocolTokenInfo['AVAI'].icon}
                      width={25}
                      height={25}
                      color="inherit"
                    />
                    <Typography variant="h6" textAlign="center">
                      {fNumber(
                        Number(
                          utils.formatEther(
                            vaultInfo.borrowingPowerAvailableUSD
                          )
                        ),
                        2
                      )}{' '}
                      AVAI
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mx: 'auto', my: 2, width: { xs: '80%', md: '50%' } }}>
                <InputTextField
                  fullWidth
                  type="number"
                  label="Borrow Amount"
                  variant="filled"
                  {...getFieldProps('borrowAmount')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src={ProtocolTokenInfo['AVAI'].icon}
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
                            setFieldValue('borrowAmount', maxBorrow)
                          }
                          variant="text"
                        >
                          MAX
                        </Button>
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  error={Boolean(touched.borrowAmount && errors.borrowAmount)}
                  helperText={touched.borrowAmount && errors.borrowAmount}
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
                    Added Debt
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
                    <Stack direction="row" spacing={1} alignItems={'flex-end'}>
                      <Image
                        src={ProtocolTokenInfo['AVAI'].icon}
                        width={15}
                        height={15}
                        color="inherit"
                      />
                      <Typography variant="body2">
                        {values.borrowAmount}
                      </Typography>
                      <Typography sx={{ ml: 0.5 }} variant="caption">
                        AVAI
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
                      {fNumber(
                        values.borrowAmount /
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      {BankTokenInfo[token].display}
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
                      color={colorScale(
                        (100 *
                          (Number(utils.formatEther(vaultInfo.debt)) +
                            values.borrowAmount)) /
                          Number(
                            utils.formatUnits(
                              vaultInfo.collateral
                                .mul(vaultInfo.tokenPrice)
                                .div(vaultInfo.peg),
                              BankTokenInfo[token].decimals
                            )
                          ),
                        vaultInfo.maxLTV - 30,
                        vaultInfo.maxLTV
                      )}
                    >
                      {fPercent(
                        (100 *
                          (Number(utils.formatEther(vaultInfo.debt)) +
                            values.borrowAmount)) /
                          Number(
                            utils.formatUnits(
                              vaultInfo.collateral
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
                      {fNumber(
                        Number(utils.formatEther(vaultInfo.debt)) +
                          values.borrowAmount,
                        2
                      )}{' '}
                      AVAI Borrowed
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
                    New Liquidation Price
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
                      color={colorScale(
                        (100 *
                          (Number(utils.formatEther(vaultInfo.debt)) +
                            values.borrowAmount)) /
                          Number(
                            utils.formatUnits(
                              vaultInfo.collateral
                                .mul(vaultInfo.tokenPrice)
                                .div(vaultInfo.peg),
                              BankTokenInfo[token].decimals
                            )
                          ),
                        vaultInfo.maxLTV - 30,
                        vaultInfo.maxLTV
                      )}
                    >
                      {fCurrency(
                        !vaultInfo.collateral.isZero()
                          ? BankTokenInfo[token].underlyingDecimals
                            ? Number(
                                utils.formatUnits(
                                  vaultInfo.debt
                                    .add(
                                      utils.parseEther(
                                        values.borrowAmount
                                          ? typeof values.borrowAmount ===
                                            'number'
                                            ? values.borrowAmount.toFixed(18)
                                            : values.borrowAmount
                                          : '0'
                                      )
                                    )
                                    .mul(vaultInfo.peg)
                                    .mul(vaultInfo.mcp)
                                    .div(
                                      vaultInfo.collateral
                                        .mul(100)
                                        .mul(
                                          10 **
                                            (18 - BankTokenInfo[token].decimals)
                                        )
                                    ),
                                  8
                                )
                              ) /
                              10 **
                                (18 - BankTokenInfo[token].underlyingDecimals)
                            : Number(
                                utils.formatUnits(
                                  vaultInfo.debt
                                    .add(
                                      utils.parseEther(
                                        values.borrowAmount
                                          ? typeof values.borrowAmount ===
                                            'number'
                                            ? values.borrowAmount.toFixed(18)
                                            : values.borrowAmount
                                          : '0'
                                      )
                                    )
                                    .mul(vaultInfo.peg)
                                    .mul(vaultInfo.mcp)
                                    .div(
                                      vaultInfo.collateral
                                        .mul(100)
                                        .mul(
                                          10 **
                                            (18 - BankTokenInfo[token].decimals)
                                        )
                                    ),
                                  8
                                )
                              )
                          : 0
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
                      Current Price:{' '}
                      {fCurrency(
                        BankTokenInfo[token].underlyingDecimals
                          ? Number(utils.formatUnits(vaultInfo.tokenPrice, 8)) /
                              10 **
                                (18 - BankTokenInfo[token].underlyingDecimals)
                          : Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      USD
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
                    (100 *
                      (Number(utils.formatEther(vaultInfo.debt)) +
                        values.borrowAmount)) /
                      Number(
                        utils.formatUnits(
                          vaultInfo.collateral
                            .mul(vaultInfo.tokenPrice)
                            .div(vaultInfo.peg),
                          BankTokenInfo[token].decimals
                        )
                      ) /
                      vaultInfo.maxLTV >
                    0.8
                      ? () => setAlertActive(true)
                      : handleBorrow
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
                      You are borrowing at 80% or above of the max LTV (Loan to
                      Value ratio). There are risks with sudden price movements
                      of partial liquidation with this borrowing amount. Are you
                      okay with this?
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
                    <Button onClick={handleBorrowHighLTV} autoFocus>
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

export default BorrowStepper;
