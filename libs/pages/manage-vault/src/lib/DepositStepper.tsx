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

import { handleTransaction } from '@orca/components/transaction';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';
import { useFormik, Form, FormikProvider } from 'formik';

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
              <Box sx={{ m: 2 }}>
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography variant="h6" textAlign="center">
                    Available to deposit:
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {token === 'AVAX' && <>{`${AVAXBalance} AVAX`}</>}
                  </Typography>
                </Stack>
                <Box sx={{ m: 'auto', width: '60%' }}>
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
                    error={Boolean(
                      touched.depositAmount && errors.depositAmount
                    )}
                    helperText={touched.depositAmount && errors.depositAmount}
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
        {activeStep === 1 && !approved && <div>To be implemented</div>}
        {activeStep === 1 && approved && (
          <>
            <Box
              p={2}
              borderRadius={1}
              mx="auto"
              width="50%"
              mt={2}
              mb={2}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
              }}
            >
              <Grid container sx={{ mt: 1, mb: 1 }}>
                <Grid item sm={8}>
                  <Typography variant="subtitle1" textAlign="center">
                    Added Collateral:
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
                        {values.depositAmount} {token}
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      {fCurrency(
                        values.depositAmount *
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      USD
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item sm={8} mt={2}>
                  <Typography variant="subtitle1" textAlign="center">
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
                        )
                      }
                    </Typography>
                    <Typography variant="caption">
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
            <Box
              sx={{ display: 'flex', pl: 2, pr: 2, mx: 'auto', width: '60%' }}
            >
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flexGrow: 1 }} />

              <Button variant="contained" onClick={handleDeposit}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default DepositStepper;
