import { FC, useEffect } from 'react';
import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { Icon } from '@iconify/react';
import arrowheadDownOutline from '@iconify/icons-eva/arrowhead-down-outline';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Container,
  Grid,
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { BigNumber, utils } from 'ethers';

import { Loader } from '@orca/components/loader';
import {
  usdApprovedExchange,
  approveUsdExchange,
  mintFromExchange,
} from '@orca/shared/funcs';
import { fNumber, fPercent } from '@orca/util';
import { erc20Tokens, tokenInfo } from '@orca/shared/base';
import { handleTransaction } from '@orca/components/transaction';

// ------------------------------------------------------

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': theme.palette.secondary.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
}));

//----------------------------------------------------------

type MintProps = {
  token: string;
  library: Web3Provider;
  chainId: number;
  account: string;
  usdBalance: BigNumber;
  exchangeBalance: BigNumber;
  mintingFee: BigNumber;
};

export const Mint: FC<MintProps> = ({
  token,
  library,
  chainId,
  account,
  usdBalance,
  exchangeBalance,
  mintingFee,
}) => {
  const shouldFetch = !!library;
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
                  .parseUnits(values.swapAmount.toString(), 6)
                  .mul(utils.parseUnits('1', 16))
                  .div(10075)
              )
            )
          )
    );
  }, [values, setFieldValue]);

  if (chainId === 43114) {
    return (
      <Card>
        <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
          {' '}
          Main Net not deployed yet. Please switch to Fuji.
        </Typography>
      </Card>
    );
  }

  // For approving USDC
  const handleApproveUSDC = async () => {
    handleTransaction({
      transaction: approveUsdExchange(
        library,
        chainId,
        utils.parseEther('1000000000000'),
        token
      ),
      messages: {
        loading: 'Approving USDC...',
        success: 'Succesfully approved!',
        error: 'Failed to approve USDC.',
      },
      mutates: [usdcApprovedMutate],
    });
  };

  // For minting AVAI from USDC
  const handleMintAVAI = async () => {
    await handleTransaction({
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
        success: 'Succesfully minted!',
        error: 'Failed to mint AVAI.',
      },
    });
    resetForm();
  };

  if (typeof account === 'string') {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            title={'USDC Exchange'}
            avatar={
              <Box
                component="img"
                src={erc20Tokens[token].icon}
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
          />

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={{ m: 'auto', width: '60%' }}>
                <Stack>
                  {/* Balances of USD */}
                  <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{ mt: 2 }}
                  >
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      textAlign="left"
                    >
                      Balance:
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      textAlign="right"
                    >
                      {`${fNumber(
                        Number(utils.formatUnits(usdBalance, 6)),
                        2
                      )} ${token}`}
                    </Typography>
                  </Stack>
                  {/* How much to use for minting */}
                  <Box sx={{ m: 1 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Amount"
                      variant="filled"
                      {...getFieldProps('swapAmount')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box
                              component="img"
                              src={erc20Tokens[token].icon}
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
                      }}
                      error={Boolean(touched.swapAmount && errors.swapAmount)}
                      helperText={touched.swapAmount && errors.swapAmount}
                    />
                  </Box>
                  {/* Transition */}
                  <Box sx={{ margin: 'auto' }}>
                    <Icon icon={arrowheadDownOutline} width={25} height={25} />
                  </Box>
                  {/* Displays output in AVAI */}
                  <Box sx={{ m: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent={'space-between'}
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        textAlign="left"
                      >
                        Expected Output
                      </Typography>
                    </Stack>
                    {/* In textfield which has font changed */}
                    <Box sx={{ mb: 2 }}>
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
                              <Box
                                component="img"
                                src={tokenInfo.AVAI.icon}
                                sx={{
                                  width: 25,

                                  height: 25,
                                }}
                                color="inherit"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                  {/* Lets handle everything now! */}
                  <Box
                    sx={{
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      justifyContent="center"
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        sx={{ mr: 1 }}
                        disabled={userUSDApproved}
                        onClick={handleApproveUSDC}
                      >
                        Approve {token}
                      </Button>{' '}
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        disabled={!userUSDApproved}
                        sx={{ px: 4 }}
                        onClick={handleMintAVAI}
                      >
                        Exchange
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Card>
        <Card
          sx={{
            width: 400,
            m: 'auto',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.400' : 'info.lighter',
          }}
        >
          <Grid container sx={{ my: 2 }}>
            <Grid item sm={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Minting Fee
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fPercent(Number(utils.formatUnits(mintingFee, 0)) / 100)}
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography sx={{ ml: 2 }} color="grey.600" variant="subtitle2">
                Available {token} Balance
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography
                sx={{ mr: 2, textAlign: 'right' }}
                variant="subtitle2"
                color="grey.600"
              >
                {fNumber(Number(utils.formatUnits(exchangeBalance, 6)), 2)}
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
