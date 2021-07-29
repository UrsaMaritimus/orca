import { useState, FC, useEffect } from 'react';
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
import useSWR from 'swr';
import { AVAXVault__factory, AVAI__factory } from '@ursa/shared/contracts';
import { contractAddresses } from '@ursa/shared/deployments';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useFormik, Form, FormikProvider } from 'formik';

import { fPercent, fShortenNumber } from '@ursa/util';
import { BigNumber, utils } from 'ethers';
import { tokenInfo } from './constants';

import { payBackToken, getAVAIBalance } from './manageVaultFunctions';

// ----------------------------------------------------------------------

type RepayStepperProps = {
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

export const RepayStepper: FC<RepayStepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to pay back', 'Repay'];

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  // Get AVAI balances
  const shouldFetch = typeof account === 'string' && !!library;
  const { data: balance, mutate: avaiMutate } = useSWR(
    shouldFetch ? [library, chainId, account] : null,
    getAVAIBalance()
  );
  useEffect(() => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? contractAddresses.fuji.AVAI
        : chainId === 43114
        ? // TODO: Update
          contractAddresses.fuji.AVAI
        : null,
      library
    );

    const balanceChange = avai.filters.Transfer();
    avai.on(balanceChange, (from, to, balance) => {
      if (from === account || to === account) {
        avaiMutate(undefined, true);
      }
    });

    return () => {
      avai.removeAllListeners(balanceChange);
    };
  }, [library, account, avaiMutate, chainId]);

  // For form
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
    repayAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatEther(balance))),
  });
  const formik = useFormik({
    initialValues: {
      repayAmount: undefined,
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

  const handleRepay = async () => {
    try {
      const result = await payBackToken(
        library,
        vaultID,
        values.repayAmount,
        token,
        chainId
      );
      handleNext();
      // Make a promise for destroying vault
      await toast.promise(
        result.wait(1),
        {
          loading: 'Paying back AVAI...',
          success: <b>Succesfully repayed!</b>,
          error: <b>Failed to pay back AVAI.</b>,
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
                    Available to repay:
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {fShortenNumber(Number(utils.formatEther(balance)))} AVAI
                  </Typography>
                </Stack>
                <Box sx={{ m: 'auto', width: '60%' }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Repay Amount"
                    variant="filled"
                    {...getFieldProps('repayAmount')}
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
                                'repayAmount',
                                Number(utils.formatEther(balance))
                              )
                            }
                            variant="text"
                          >
                            MAX
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.repayAmount && errors.repayAmount)}
                    helperText={touched.repayAmount && errors.repayAmount}
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
                    Removed Debt:
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
                        {values.repayAmount} AVAI
                      </Typography>
                    </Stack>
                    <Typography variant="caption">
                      {fShortenNumber(
                        values.repayAmount /
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
                          (Number(utils.formatEther(vaultInfo.debt)) -
                            values.repayAmount)) /
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
                        Number(utils.formatEther(vaultInfo.debt)) -
                          values.repayAmount
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

              <Button variant="contained" onClick={handleRepay}>
                Submit
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default RepayStepper;
