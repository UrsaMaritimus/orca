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
  styled,
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

import useSWR from 'swr';

import { Loader, handleTransaction, useAddTransaction } from '@orca/components';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { colorScale, fCurrency, fNumber, fPercent } from '@orca/util';

import {
  depositCollateral,
  getTokenBalance,
  tokenApproved,
  approveToken,
} from '@orca/web3';

import { BankTokenInfo } from '@orca/shared';
import { StepperProps } from './stepper.type';

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

const getAVAXBalance = (library: Web3Provider) => {
  return async (_: string, address: string) => {
    return library
      .getBalance(address)
      .then((balance) => Number(utils.formatEther(balance)));
  };
};

// ----------------------------------------------------------------------

export const DepositStepper: FC<StepperProps> = ({
  token,
  vaultInfo,
  vaultID,
}) => {
  const [approving, setApproving] = useState<boolean>(false);
  // Set steps
  const steps = ['How much to deposit', 'Deposit'];
  // web3 init info
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const shouldFetch = !!library;

  // If AVAX
  const { data: AVAXBalance, mutate } = useSWR(
    shouldFetch && token === 'AVAX'
      ? ['DepositAVAXBalance', account, chainId]
      : null,
    getAVAXBalance(library)
  );

  // IF NOT AVAX. sorry, ugly code here
  const { data: TokenBalance, mutate: tokenMutate } = useSWR(
    shouldFetch && token !== 'AVAX'
      ? [
          'DepositTokenBalance',
          library,
          account,
          chainId === 43114
            ? BankTokenInfo[token].address.mainnet
            : BankTokenInfo[token].address.fuji,
        ]
      : null,
    getTokenBalance()
  );

  useKeepSWRDataLiveAsBlocksArrive(mutate);
  useKeepSWRDataLiveAsBlocksArrive(tokenMutate);

  const addTransaction = useAddTransaction();

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
      .max(
        Number(
          token === 'AVAX'
            ? AVAXBalance
            : TokenBalance
            ? utils.formatUnits(TokenBalance, BankTokenInfo[token].decimals)
            : 0
        )
      ),
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
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
  } = formik;

  const { data: TokenApproved, mutate: tokenApprovedMutate } = useSWR(
    shouldFetch && token !== 'AVAX'
      ? [
          `${token}ApprovedDepositBank'`,
          library,
          account,
          token,
          chainId,
          values.depositAmount && values.depositAmount > 0
            ? Number(values.depositAmount)
            : TokenBalance
            ? Number(
                utils.formatUnits(TokenBalance, BankTokenInfo[token].decimals)
              )
            : 100000,
          BankTokenInfo[token].erc20,
        ]
      : null,
    tokenApproved()
  );
  useKeepSWRDataLiveAsBlocksArrive(tokenApprovedMutate);

  const handleDeposit = async () => {
    handleNext();
    const success = await handleTransaction({
      transaction: depositCollateral(
        library,
        vaultID,
        values.depositAmount,
        BankTokenInfo[token].erc20,
        BankTokenInfo[token].decimals,
        chainId
      ),
      messages: {
        loading: 'Depositing collateral...',
        success: 'Collateral deposited!',
        error: 'Failed to deposit collateral.',
      },
      mutates: [mutate, tokenMutate],
      chainId,
    });
    addTransaction({
      type: 'deposit',
      amount: utils.parseUnits(
        typeof values.depositAmount === 'number'
          ? values.depositAmount.toFixed(BankTokenInfo[token].decimals)
          : values.depositAmount,
        BankTokenInfo[token].decimals
      ),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    resetForm();
    handleReset();
  };

  // For approving token
  const handleApproveToken = async () => {
    setApproving(true);
    await handleTransaction({
      transaction: approveToken(
        library,
        chainId,
        utils.parseEther('1000000000000'),
        BankTokenInfo[token].erc20,
        token
      ),
      messages: {
        loading: `Approving ${BankTokenInfo[token].display}...`,
        success: 'Successfully approved!',
        error: `Failed to approve ${BankTokenInfo[token].display}.`,
      },
      mutates: [tokenApprovedMutate],
      chainId,
    });
    setApproving(false);
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
                      src={BankTokenInfo[token].icon}
                      sx={{
                        width: 15,

                        height: 15,
                      }}
                      color="inherit"
                    />
                    <Typography variant="h6" textAlign="center">
                      {`${
                        BankTokenInfo[token].underlyingDecimals
                          ? Number(
                              TokenBalance
                                ? utils.formatUnits(
                                    TokenBalance,
                                    BankTokenInfo[token].decimals
                                  )
                                : 0
                            ).toExponential()
                          : fNumber(
                              token === 'AVAX'
                                ? AVAXBalance
                                : TokenBalance
                                ? Number(
                                    utils.formatUnits(
                                      TokenBalance,
                                      BankTokenInfo[token].decimals
                                    )
                                  )
                                : 0,
                              4
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
                  label="Deposit Amount"
                  variant="filled"
                  {...getFieldProps('depositAmount')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          component="img"
                          src={BankTokenInfo[token].icon}
                          sx={{
                            width: 25,

                            height: 25,
                          }}
                          color="inherit"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: token !== 'AVAX' && (
                      <InputAdornment position="start">
                        <Button
                          onClick={() =>
                            setFieldValue(
                              'depositAmount',
                              utils.formatUnits(
                                TokenBalance,
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
                        src={BankTokenInfo[token].icon}
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
                        values.depositAmount &&
                        colorScale(
                          (100 * Number(utils.formatEther(vaultInfo.debt))) /
                            Number(
                              utils.formatUnits(
                                vaultInfo.collateral
                                  .add(
                                    utils.parseUnits(
                                      typeof values.depositAmount === 'number'
                                        ? values.depositAmount.toFixed(
                                            BankTokenInfo[token].decimals
                                          )
                                        : values.depositAmount,
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
                      {values.depositAmount &&
                        fPercent(
                          (100 * Number(utils.formatEther(vaultInfo.debt))) /
                            Number(
                              utils.formatUnits(
                                vaultInfo.collateral
                                  .add(
                                    utils.parseUnits(
                                      typeof values.depositAmount === 'number'
                                        ? values.depositAmount.toFixed(
                                            BankTokenInfo[token].decimals
                                          )
                                        : values.depositAmount,
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
                      {fCurrency(
                        (Number(utils.formatEther(vaultInfo.collateral)) +
                          Number(values.depositAmount)) *
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
                {(token === 'AVAX' || TokenApproved) && (
                  <LoadingButton
                    endIcon={<Icon icon={arrowRight} width={25} height={25} />}
                    variant="contained"
                    onClick={handleDeposit}
                    loading={activeStep === steps.length}
                    loadingPosition="end"
                  >
                    Submit
                  </LoadingButton>
                )}
                {token !== 'AVAX' && !TokenApproved && (
                  <LoadingButton
                    variant="contained"
                    onClick={handleApproveToken}
                    loading={approving}
                    loadingPosition="end"
                  >
                    Approve
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </>
    </>
  );
};

export default DepositStepper;
