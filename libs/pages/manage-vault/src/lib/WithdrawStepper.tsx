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
} from '@material-ui/core';

import toast from 'react-hot-toast';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useFormik, Form, FormikProvider } from 'formik';

import { BigNumber, utils } from 'ethers';
import { fCurrency, fPercent, fNumber } from '@orca/util';
import { withdrawCollateral } from '@orca/shared/funcs';

import { tokenInfo } from '@orca/shared/base';

// ----------------------------------------------------------------------

type WithdrawStepperProps = {
  token: string;
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

export const WithdrawStepper: FC<WithdrawStepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to withdraw', 'Withdraw'];

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
    try {
      const result = await withdrawCollateral(
        library,
        vaultID,
        values.withdrawAmount,
        tokenInfo[token as string].erc20,
        chainId
      );
      handleNext();
      // Make a promise for destroying vault
      await toast.promise(
        result.wait(1),
        {
          loading: 'Withdrawing collateral...',
          success: <b>Collateral withdrawn!</b>,
          error: <b>Failed to withdraw collateral.</b>,
        },
        {
          style: {
            minWidth: '100px',
          },
          loading: {
            duration: Infinity,
          },
          success: {
            duration: 5000,
          },
        }
      );
      resetForm();
      handleReset();
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
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
      {activeStep === steps.length && (
        <>
          <Box
            p={2}
            borderRadius={1}
            width="90%"
            mx="auto"
            mt={2}
            mb={2}
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
            }}
          >
            <Typography sx={{ my: 1 }}>
              Transaction submitted, awaiting confirmation.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      )}
      <>
        {activeStep === 0 && (
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={{ m: 'auto', width: '60%' }}>
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography variant="h6" textAlign="center">
                    Available to withdraw:
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {`${fNumber(
                      Number(utils.formatEther(vaultInfo.availableWithdraw))
                    )} ${token}`}
                  </Typography>
                </Stack>
                <Box sx={{ m: 2 }}>
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
              </Box>
              <Box
                sx={{ display: 'flex', pl: 2, pr: 2, width: '60%', m: 'auto' }}
              >
                <Button
                  color="inherit"
                  disabled
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flexGrow: 1 }} />

                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        )}
        {activeStep === 1 && (
          <>
            <Box
              p={2}
              borderRadius={1}
              width="50%"
              mx="auto"
              mt={2}
              mb={2}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
              }}
            >
              <Grid container sx={{ mt: 1, mb: 1 }}>
                <Grid item sm={8}>
                  <Typography variant="h5" textAlign="end">
                    Removed Collateral:
                  </Typography>
                </Grid>
                <Grid item sm>
                  <Stack alignItems={'flex-end'}>
                    <Stack direction="row" spacing={1} alignItems={'center'}>
                      <Box
                        component="img"
                        src={tokenInfo[token as string].icon}
                        sx={{
                          width: 15,

                          height: 15,
                        }}
                        color="inherit"
                      />
                      <Typography variant="subtitle1">
                        {values.withdrawAmount} {token}
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      {fCurrency(
                        values.withdrawAmount *
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      USD
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item sm={8} mt={2}>
                  <Typography variant="h5" textAlign="end">
                    New Borrowing Power:{' '}
                  </Typography>
                </Grid>
                <Grid item sm mt={2}>
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="h6">
                      {
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
                        )
                      }
                    </Typography>
                    <Typography variant="caption">
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
            <Box
              sx={{ display: 'flex', pl: 2, pr: 2, width: '60%', m: 'auto' }}
            >
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flexGrow: 1 }} />

              <Button variant="contained" onClick={handleWithdraw}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default WithdrawStepper;
