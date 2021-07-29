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
} from '@material-ui/core';

import toast from 'react-hot-toast';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useFormik, Form, FormikProvider } from 'formik';

import { fPercent, fShortenNumber } from '@ursa/util';
import { BigNumber, utils } from 'ethers';
import { tokenInfo } from './constants';

import { borrowToken } from './manageVaultFunctions';

// ----------------------------------------------------------------------

type BorrowStepperProps = {
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

export const BorrowStepper: FC<BorrowStepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to borrow', 'Borrow'];

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();

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
    try {
      const result = await borrowToken(
        library,
        vaultID,
        values.borrowAmount,
        token,
        chainId
      );
      handleNext();
      // Make a promise for destroying vault
      await toast.promise(
        result.wait(1),
        {
          loading: 'Borrowing AVAI...',
          success: <b>Succesfully borrowed!</b>,
          error: <b>Failed to borrow AVAI.</b>,
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
              <Box sx={{ m: 2 }}>
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography variant="h6" textAlign="center">
                    Available to borrow:
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {fShortenNumber(
                      Number(
                        utils.formatEther(vaultInfo.borrowingPowerAvailableUSD)
                      )
                    )}{' '}
                    AVAI
                  </Typography>
                </Stack>
                <Box sx={{ m: 'auto', width: '60%' }}>
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
                            onClick={() =>
                              setFieldValue('borrowAmount', maxBorrow)
                            }
                            variant="text"
                          >
                            MAX
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.borrowAmount && errors.borrowAmount)}
                    helperText={touched.borrowAmount && errors.borrowAmount}
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
                <Grid item sm={6}>
                  <Typography variant="subtitle1" textAlign="center">
                    Added Debt:
                  </Typography>
                </Grid>
                <Grid item sm>
                  <Stack alignItems={'flex-end'}>
                    <Stack direction="row" spacing={1} alignItems={'center'}>
                      <Box
                        component="img"
                        src={tokenInfo['AVAI'].icon}
                        sx={{
                          width: 15,

                          height: 15,
                        }}
                        color="inherit"
                      />
                      <Typography variant="subtitle1">
                        {values.borrowAmount} AVAI
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      {fShortenNumber(
                        values.borrowAmount /
                          Number(utils.formatUnits(vaultInfo.tokenPrice, 8))
                      )}{' '}
                      {token}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item sm={6} mt={2}>
                  <Typography variant="subtitle1" textAlign="center">
                    New LTV:
                  </Typography>
                </Grid>
                <Grid item sm mt={2}>
                  <Stack alignItems={'flex-end'}>
                    <Typography variant="h6">
                      {fPercent(
                        (100 *
                          (Number(utils.formatEther(vaultInfo.debt)) +
                            values.borrowAmount)) /
                          Number(
                            utils.formatEther(
                              vaultInfo.collateral
                                .mul(vaultInfo.tokenPrice)
                                .div(vaultInfo.peg)
                            )
                          )
                      )}
                    </Typography>
                    <Typography variant="caption">
                      {fShortenNumber(
                        Number(utils.formatEther(vaultInfo.debt)) +
                          values.borrowAmount
                      )}{' '}
                      AVAI Borrowed
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

              <Button variant="contained" onClick={handleBorrow}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default BorrowStepper;
