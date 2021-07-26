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

import { useAVAXBalance } from '@ursa/hooks';
import { fCurrency } from '@ursa/util';

import { tokenInfo } from './constants';

import { depositCollateral } from './manageVaultFunctions';

// ----------------------------------------------------------------------

const steps = ['How much to deposit', 'Approve Token', 'Deposit'];

type DepositStepperProps = {
  token: string;
  approved: boolean;
  vaultID: number;
  vaultInfo: {
    collateral: number;
    debt: number;
    LTV: number;
    maxLTV: number;
    borrowingPower: number;
    tokenPrice: number;
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
      .lessThan(Number(AVAXBalance)),
  });
  const formik = useFormik({
    initialValues: {
      depositAmount: 0,
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
    isSubmitting,
    handleSubmit,
    getFieldProps,
    resetForm,
  } = formik;

  const handleDeposit = async () => {
    const result = await depositCollateral(
      library,
      vaultID,
      values.depositAmount,
      token,
      chainId
    );
    handleNext();
    // Make a promise for destroying vault
    await toast.promise(
      result.wait(1),
      {
        loading: 'Depositing collateral...',
        success: <b>Collateral deposited!</b>,
        error: <b>Failed to deposit collateral.</b>,
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
                <Box sx={{ m: 2 }}>
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
              <Box sx={{ display: 'flex', pl: 2, pr: 2 }}>
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
              width="90%"
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
                      {fCurrency(values.depositAmount * vaultInfo.tokenPrice)}{' '}
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
                      {(1 -
                        vaultInfo.debt /
                          (vaultInfo.collateral + values.depositAmount) /
                          (100 / vaultInfo.maxLTV)) *
                        100}
                      %
                    </Typography>
                    <Typography variant="caption">
                      {fCurrency(
                        (vaultInfo.collateral + values.depositAmount) *
                          vaultInfo.tokenPrice *
                          (vaultInfo.maxLTV / 100) -
                          vaultInfo.debt
                      )}{' '}
                      USD
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', pl: 2, pr: 2 }}>
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
