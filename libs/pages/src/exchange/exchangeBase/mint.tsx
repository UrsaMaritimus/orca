import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { Icon } from '@iconify/react';
import arrowheadDownOutline from '@iconify/icons-eva/arrowhead-down-outline';
import externalLinkOutline from '@iconify/icons-eva/external-link-outline';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Grid,
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { BigNumber, utils } from 'ethers';

import {
  NextLink,
  Loader,
  handleTransaction,
  useAddTransaction,
} from '@orca/components';
import {
  usdApprovedExchange,
  approveUsdExchange,
  mintFromExchange,
} from '@orca/web3';

import { fCurrency, fNumber, fPercent } from '@orca/util';
import { ProtocolTokenInfo, routes } from '@orca/shared';

// ------------------------------------------------------

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': theme.palette.secondary.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

//----------------------------------------------------------

type MintProps = {
  token: 'USDC.e';
  library: Web3Provider;
  chainId: number;
  account: string;
  usdBalance: BigNumber;
  exchangeBalance: BigNumber;
  mintingFee: BigNumber;
  mutates: any[];
};

export const Mint: FC<MintProps> = ({
  token,
  library,
  chainId,
  account,
  usdBalance,
  exchangeBalance,
  mintingFee,
  mutates,
}) => {
  const [approving, setApproving] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const shouldFetch = !!library;
  const addTransaction = useAddTransaction();
  // Get usdc approved
  const { data: userUSDApproved, mutate: usdcApprovedMutate } = useSWR(
    shouldFetch
      ? [
          `usdcApproveMint${token}`,
          library,
          account,
          chainId,
          usdBalance,
          token,
        ]
      : null,
    usdApprovedExchange()
  );
  // Form
  const ValueSchema = Yup.object().shape({
    swapAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatUnits(usdBalance, 6))),
  });

  const formik = useFormik({
    initialValues: {
      swapAmount: undefined,
      returnAmount: 0,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        handleMintAVAI();
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

  useEffect(() => {
    setFieldValue(
      'returnAmount',
      !values.swapAmount
        ? 0
        : fNumber(
            Number(
              utils.formatEther(
                utils
                  .parseUnits(fNumber(values.swapAmount, 6), 6)
                  .mul(utils.parseUnits('1', 16))
                  .div(10075)
              )
            )
          )
    );
  }, [values, setFieldValue]);

  // For approving USDC
  const handleApproveUSDC = async () => {
    setApproving(true);
    await handleTransaction({
      transaction: approveUsdExchange(
        library,
        chainId,
        utils.parseEther('1000000000000'),
        token
      ),
      messages: {
        loading: 'Approving USDC.e...',
        success: 'Successfully approved!',
        error: 'Failed to approve USDC.e.',
      },
      mutates: [usdcApprovedMutate],
      chainId,
    });
    setApproving(false);
  };

  // For minting AVAI from USDC
  const handleMintAVAI = async () => {
    setMinting(true);
    const success = await handleTransaction({
      transaction: mintFromExchange(
        library,
        chainId,
        utils.parseUnits(
          values.swapAmount ? values.swapAmount.toString() : '0',
          6
        )
      ),
      messages: {
        loading: 'Minting AVAI...',
        success: 'Successfully minted!',
        error: 'Failed to mint AVAI.',
      },
      mutates,
      chainId,
    });
    resetForm();
    setFieldValue('swapAmount', 0);
    addTransaction({
      type: 'mint',
      amount: utils.parseUnits(values.swapAmount.toString(), 6),
      vault: token,
      success: success.success,
      hash: success.hash,
    });
    setMinting(false);
  };

  if (typeof account === 'string') {
    return (
      <Container maxWidth="sm">
        <Card>
          <Backdrop sx={{ position: 'absolute', zIndex: 99 }} open={minting}>
            <Loader />
          </Backdrop>
          <CardHeader
            title={'USDC.e Exchange'}
            avatar={
              <Image
                src={ProtocolTokenInfo[token].icon}
                width={40}
                height={40}
                color="inherit"
              />
            }
            action={
              <NextLink
                href={routes.APP.CRYPTOS.USDC}
                underline="hover"
                variant="subtitle2"
                color="secondary.dark"
                alignItems="center"
                display="flex"
                rel="noreferrer"
                target="_blank"
              >
                Get USDC.e
                <Icon icon={externalLinkOutline} width={20} height={20} />
              </NextLink>
            }
          />

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container>
                {/* Balances of USD */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent={'center'}
                >
                  <Typography variant="h6">Balance:</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent={'center'}
                >
                  <Typography variant="h6">
                    {`${fNumber(
                      Number(utils.formatUnits(usdBalance, 6)),
                      2,
                      true
                    )} ${token}`}
                  </Typography>
                </Grid>
                {/* How much to use for minting */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Box sx={{ mx: 'auto', my: 2, width: '80%' }}>
                    <InputTextField
                      fullWidth
                      type="number"
                      label="Amount"
                      variant="filled"
                      {...getFieldProps('swapAmount')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              src={ProtocolTokenInfo[token].icon}
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
                                  'swapAmount',
                                  utils.formatUnits(usdBalance, 6)
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
                      error={Boolean(touched.swapAmount && errors.swapAmount)}
                      helperText={touched.swapAmount && errors.swapAmount}
                    />
                  </Box>
                </Grid>
                {/* Transition */}
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Icon icon={arrowheadDownOutline} width={25} height={25} />
                </Grid>
                {/* Displays output in AVAI */}
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ mb: 1 }}
                >
                  <Box sx={{ mx: 'auto', mt: 1, width: '80%' }}>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      textAlign="left"
                    >
                      Expected Output
                    </Typography>
                  </Box>
                </Grid>
                {/* In textfield which has font changed */}
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Box sx={{ mx: 'auto', width: '80%' }}>
                    <ReturnTextField
                      fullWidth
                      type="number"
                      label="Amount"
                      variant="filled"
                      disabled
                      {...getFieldProps('returnAmount')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              src={ProtocolTokenInfo.AVAI.icon}
                              width={25}
                              height={25}
                              color="inherit"
                            />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                    />
                  </Box>
                </Grid>
                {/* Lets handle everything now! */}
                <Grid
                  item
                  xs={6}
                  mb={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    sx={{ mr: 1, minWidth: '150px' }}
                    disabled={userUSDApproved}
                    onClick={handleApproveUSDC}
                    loading={approving}
                  >
                    Approve {token}
                  </LoadingButton>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-start">
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={!userUSDApproved || usdBalance.isZero()}
                    sx={{ minWidth: '150px' }}
                    loading={minting}
                    type="submit"
                  >
                    Exchange
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
        <Card
          sx={{
            maxWidth: 300,
            m: 'auto',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.400' : 'info.lighter',
          }}
        >
          <Grid container sx={{ my: 2 }}>
            <Grid item xs={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Minting Fee
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fPercent(Number(utils.formatUnits(mintingFee, 0)) / 100)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Available {token}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fCurrency(Number(utils.formatUnits(exchangeBalance, 6)))}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
