import { useState, FC, useEffect } from 'react';
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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Icon } from '@iconify/react';
import arrowRight from '@iconify/icons-eva/arrow-right-outline';
import backSpace from '@iconify/icons-eva/backspace-outline';
import useSWR from 'swr';

import { useFormik, Form, FormikProvider } from 'formik';
import { utils } from 'ethers';

// Ethers and web3 stuff
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Loader, handleTransaction, useAddTransaction } from '@orca/components';
import {
  AVAI__factory,
  DeployedContracts,
  BankTokenInfo,
  ProtocolTokenInfo,
} from '@orca/shared';
import { payBackToken, avaiBalance } from '@orca/web3';
import { fPercent, fNumber, colorScale, fCurrency } from '@orca/util';
import { StepperProps } from './stepper.type';

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));
// ----------------------------------------------------------------------

export const RepayStepper: FC<StepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  // Set steps
  const steps = ['How much to pay back', 'Repay'];

  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const addTransaction = useAddTransaction();
  // Get AVAI balances
  const shouldFetch = typeof account === 'string' && !!library;
  const { data: balance, mutate: avaiMutate } = useSWR(
    shouldFetch ? ['getAvaiBalanceRepay', library, chainId, account] : null,
    avaiBalance()
  );
  useEffect(() => {
    const avai = AVAI__factory.connect(
      chainId === 43113
        ? DeployedContracts.fuji.AVAI.address
        : chainId === 43114
        ? DeployedContracts.main.AVAI.address
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
      .max(Number(utils.formatEther(vaultInfo.debt))),
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
    handleNext();
    const success = await handleTransaction({
      transaction: payBackToken(
        library,
        vaultID,
        values.repayAmount,
        BankTokenInfo[token].erc20,
        chainId
      ),
      messages: {
        loading: 'Paying back AVAI...',
        success: 'Successfully repayed!',
        error: 'Failed to pay back AVAI.',
      },
      chainId,
    });
    addTransaction({
      type: 'payback',
      amount: utils.parseEther(values.repayAmount.toString()),
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
        {activeStep === 0 && balance && (
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container sx={{ m: 2 }}>
                <Grid item sm={6} xs={12}>
                  <Typography variant="h6" textAlign="center">
                    Available to repay:
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography variant="h6" textAlign="center">
                    {balance.gte(vaultInfo.debt)
                      ? fNumber(Number(utils.formatEther(vaultInfo.debt)))
                      : fNumber(Number(utils.formatEther(balance)))}{' '}
                    AVAI
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mx: 'auto', my: 2, width: { xs: '80%', md: '50%' } }}>
                <InputTextField
                  fullWidth
                  type="number"
                  label="Repay Amount"
                  variant="filled"
                  {...getFieldProps('repayAmount')}
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
                            setFieldValue(
                              'repayAmount',
                              balance.gte(vaultInfo.debt)
                                ? utils.formatEther(vaultInfo.debt)
                                : utils.formatEther(balance)
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
                  error={Boolean(touched.repayAmount && errors.repayAmount)}
                  helperText={touched.repayAmount && errors.repayAmount}
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
        {activeStep >= 1 && balance && (
          <>
            <Box
              p={2}
              borderRadius={1}
              mx="auto"
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
                    <Stack direction="row" spacing={1} alignItems={'center'}>
                      <Image
                        src={ProtocolTokenInfo['AVAI'].icon}
                        width={25}
                        height={25}
                        color="inherit"
                      />
                      <Typography variant="body2">
                        {values.repayAmount}
                      </Typography>
                      <Typography
                        sx={{ ml: 0.25 }}
                        variant="body2"
                      ></Typography>
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
                        values.repayAmount /
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
                      color={
                        values.repayAmount &&
                        colorScale(
                          (100 *
                            (Number(utils.formatEther(vaultInfo.debt)) -
                              values.repayAmount)) /
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
                        )
                      }
                    >
                      {fPercent(
                        (100 *
                          (Number(utils.formatEther(vaultInfo.debt)) -
                            values.repayAmount)) /
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
                        Number(utils.formatEther(vaultInfo.debt)) -
                          values.repayAmount,
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
                      color={
                        values.repayAmount &&
                        colorScale(
                          (100 *
                            (Number(utils.formatEther(vaultInfo.debt)) -
                              values.repayAmount)) /
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
                        )
                      }
                    >
                      {fCurrency(
                        !vaultInfo.collateral.isZero()
                          ? Number(
                              utils.formatUnits(
                                vaultInfo.debt
                                  .sub(
                                    utils.parseUnits(
                                      values.repayAmount
                                        ? typeof values.repayAmount === 'number'
                                          ? values.repayAmount.toFixed(18)
                                          : values.repayAmount
                                        : '0',
                                      18
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
                                (18 -
                                  (BankTokenInfo[token].underlyingDecimals
                                    ? BankTokenInfo[token].underlyingDecimals
                                    : 18))
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
                  onClick={handleRepay}
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

export default RepayStepper;
