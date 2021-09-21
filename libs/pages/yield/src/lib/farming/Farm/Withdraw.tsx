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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-eva/arrow-right-outline';
import backSpace from '@iconify/icons-eva/backspace-outline';
// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { useFormik, Form, FormikProvider } from 'formik';
import { Loader } from '@orca/components/loader';
import { fPercent, fNumber, colorScale } from '@orca/util';
import { borrowToken } from '@orca/shared/funcs';
import {
  handleTransaction,
  useAddTransaction,
} from '@orca/components/transaction';
import { tokenInfo } from '@orca/shared/base';
// ----------------------------------------------------------------------

export const Withdraw: FC = () => {
  // Set steps
  const steps = ['How much to borrow', 'Borrow'];

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const [activeStep, setActiveStep] = useState(0);
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

  // Form
  const ValueSchema = Yup.object().shape({
    depositAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive'),
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
      {activeStep === 0 && (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container sx={{ m: 2 }}>
              <Grid item sm={6} xs={12}>
                <Typography variant="h6" textAlign="center">
                  Available to borrow:
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12} display="flex" justifyContent="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    component="img"
                    src={tokenInfo['AVAI'].icon}
                    sx={{
                      width: 15,

                      height: 15,
                    }}
                    color="inherit"
                  />
                  <Typography variant="h6" textAlign="center">
                    {fNumber(Number(utils.formatEther('0')), 2)} AVAI
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
              <TextField
                fullWidth
                type="number"
                label="Borrow Amount"
                variant="filled"
                {...getFieldProps('borrowAmount')}
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
                        onClick={() => setFieldValue('depositAmount', 0)}
                        variant="text"
                      >
                        MAX
                      </Button>
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
    </>
  );
};

export default Withdraw;
