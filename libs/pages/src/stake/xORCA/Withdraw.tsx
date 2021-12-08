import { FC, useState } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';

// material
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { utils, BigNumber } from 'ethers';
// Ethers and web3 stuff
import { Web3Provider } from '@ethersproject/providers';
import { useFormik, Form, FormikProvider } from 'formik';

import { handleTransaction } from '@orca/components';
import { getTokenBalance, withdrawxORCA } from '@orca/web3';
import { fCurrency, fNumber } from '@orca/util';

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.grey[700],
  },
  '& .MuiFilledInput-root': {
    background: 'rgb(232, 241, 250)',
  },
}));

type WithdrawProps = {
  img: string;
  name: string;
  library: Web3Provider;
  link: string;
  chainId: number;
  totalStaked: BigNumber;
};

// ----------------------------------------------------------------------

export const Withdraw: FC<WithdrawProps> = ({
  img,
  name,
  library,
  chainId,
  totalStaked,
}) => {
  const [withdrawing, setWithdrawing] = useState<boolean>(false);

  const shouldFetch = !!library;

  // Form
  const ValueSchema = Yup.object().shape({
    withdrawAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatEther(totalStaked ? totalStaked : 0))),
  });

  const formik = useFormik({
    initialValues: {
      withdrawAmount: 0,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setWithdrawing(true);
        await handleTransaction({
          transaction: withdrawxORCA(
            library,
            chainId,
            values.withdrawAmount ===
              Number(utils.formatEther(totalStaked ? totalStaked : 0))
              ? utils.formatEther(totalStaked ? totalStaked : 0)
              : values.withdrawAmount
          ),
          messages: {
            loading: `Withdrawing ${name}...`,
            success: 'Successfully withdrawn!',
            error: `Failed to withdraw ${name}.`,
          },
          chainId,
        });
        setWithdrawing(false);
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error(error);
        resetForm();
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, setFieldValue, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={5}>
            <Typography variant="subtitle1">xORCA Balance:</Typography>
          </Grid>
          <Grid item xs={7} display="flex" justifyContent="flex-end">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Image src={img} width={15} height={15} color="inherit" />
              <Typography variant="subtitle1" textAlign="center">
                {shouldFetch
                  ? fNumber(
                      Number(utils.formatEther(totalStaked ? totalStaked : 0)),
                      4
                    )
                  : '-'}{' '}
                xORCA
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Typography variant="subtitle2" textAlign="center" color="grey.600">
              {shouldFetch ? 'xOrca ratio price' : '-'}{' '}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1, mb: 2 }}>
          <ReturnTextField
            fullWidth
            type="number"
            label="Withdraw Amount"
            variant="filled"
            disabled={!shouldFetch}
            {...getFieldProps('withdrawAmount')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image src={img} width={25} height={25} color="inherit" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Button
                    onClick={() =>
                      setFieldValue(
                        'withdrawAmount',
                        Number(utils.formatEther(totalStaked ? totalStaked : 0))
                      )
                    }
                    variant="text"
                    color="secondary"
                    disabled={!shouldFetch}
                  >
                    MAX
                  </Button>
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            error={Boolean(touched.withdrawAmount && errors.withdrawAmount)}
            helperText={touched.withdrawAmount && errors.withdrawAmount}
          />
        </Box>
        <Grid container>
          <Grid item xs={12} display="flex" justifyContent="center">
            <LoadingButton
              variant="contained"
              size="large"
              disabled={
                !shouldFetch ||
                Number(utils.formatEther(totalStaked ? totalStaked : 0)) === 0
              }
              loading={withdrawing}
              type="submit"
            >
              Withdraw
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default Withdraw;
