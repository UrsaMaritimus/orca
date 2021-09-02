import { useState, FC } from 'react';
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
} from '@material-ui/core';

import LoadingButton from '@material-ui/lab/LoadingButton';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-eva/arrow-right-outline';
import backSpace from '@iconify/icons-eva/backspace-outline';
import { handleTransaction } from '@orca/components/transaction';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';
import { useFormik, Form, FormikProvider } from 'formik';

import { Loader } from '@orca/components/loader';
import { useAVAXBalance } from '@orca/hooks';
import { fCurrency, fPercent } from '@orca/util';
import { depositCollateral } from '@orca/shared/funcs';

import { tokenInfo } from '@orca/shared/base';

// ----------------------------------------------------------------------

type DepositStepperProps = {
  token: string;
  approved: boolean;
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

export const DepositStepper: FC<DepositStepperProps> = ({
  token,
  approved,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  let steps: string[];
  approved
    ? (steps = ['How much to deposit', 'Deposit'])
    : (steps = ['How much to deposit', 'Approve Token', 'Deposit']);

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { data: AVAXBalance } = useAVAXBalance(account as string);

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
    depositAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(AVAXBalance)),
  });
  const formik = useFormik({
    initialValues: {
      depositAmount: undefined,
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

  const { errors, touched, values, handleSubmit, getFieldProps, resetForm } =
    formik;

  const handleDeposit = async () => {
    handleNext();
    await handleTransaction({
      transaction: depositCollateral(
        library,
        vaultID,
        values.depositAmount,
        tokenInfo[token as string].erc20,
        chainId
      ),
      messages: {
        loading: 'Depositing collateral...',
        success: 'Collateral deposited!',
        error: 'Failed to deposit collateral.',
      },
    });

    resetForm();
    handleReset();
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
      <>
        {activeStep === 0 && (
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container sx={{ m: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Typography variant="h6" textAlign="center">
                    Available to deposit:
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
                      {token === 'AVAX' && `${AVAXBalance} AVAX`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Deposit Amount"
                  variant="filled"
                  {...getFieldProps('depositAmount')}
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
                  }}
                  error={Boolean(touched.depositAmount && errors.depositAmount)}
                  helperText={touched.depositAmount && errors.depositAmount}
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
        {activeStep === 1 && !approved && <div>To be implemented</div>}
        {activeStep >= 1 && approved && (
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
                  <Typography variant="subtitle1">Amount</Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                  sm={7}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Stack alignItems="flex-end">
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
                      <Typography variant="body2">
                        {values.depositAmount && values.depositAmount}
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
                      {values.depositAmount &&
                        fCurrency(
                          values.depositAmount *
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
                      {values.depositAmount &&
                        // Recacalculate what their new borrowing power will be
                        fPercent(
                          Number(
                            utils.formatUnits(
                              utils.parseUnits('100', 6).sub(
                                vaultInfo.debt
                                  .mul(1e8)
                                  .mul(vaultInfo.peg)
                                  .div(
                                    vaultInfo.collateral
                                      .mul(vaultInfo.tokenPrice)
                                      .add(
                                        utils
                                          .parseEther(
                                            values.depositAmount.toString()
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
                        (Number(utils.formatEther(vaultInfo.collateral)) +
                          values.depositAmount) *
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
                  onClick={handleDeposit}
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

export default DepositStepper;
