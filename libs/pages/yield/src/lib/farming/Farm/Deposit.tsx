import { FC, useState } from 'react';
import * as Yup from 'yup';
import useSWR from 'swr';

import { Icon } from '@iconify/react';
import externalLinkOutline from '@iconify/icons-eva/external-link-outline';
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

// Ethers and web3 stuff
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import { useFormik, Form, FormikProvider } from 'formik';

import { handleTransaction, NextLink } from '@orca/components';
import {
  approveTokenFarm,
  getTokenBalance,
  tokenApprovedFarm,
  depositFarm,
} from '@orca/shared/funcs';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { fNumber } from '@orca/util';

const ReturnTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.grey[700],
  },
  '& .MuiFilledInput-root': {
    background: 'rgb(232, 241, 250)',
    borderRadius: theme.shape.borderRadiusSm,
  },
}));

type DepositProps = {
  img: string;
  name: string;
  account: string;
  library: Web3Provider;
  farm: string;
  link: string;
  pid: string;
  chainId: number;
};

// ----------------------------------------------------------------------

export const Deposit: FC<DepositProps> = ({
  img,
  name,
  account,
  library,
  farm,
  link,
  pid,
  chainId,
}) => {
  const [approving, setApproving] = useState<boolean>(false);
  const [depositing, setDepositing] = useState<boolean>(false);

  const shouldFetch = !!library;

  const { data: farmBalance, mutate: mutateFarmBalance } = useSWR(
    shouldFetch ? [`tokenBalance${name}`, library, account, farm] : null,
    getTokenBalance()
  );
  const { data: tokenIsApproved, mutate: mutateTokenApproved } = useSWR(
    shouldFetch
      ? [
          `tokenApproved${name}`,
          library,
          account,
          chainId,
          farm,
          utils.formatEther(farmBalance ? farmBalance : 1e10),
        ]
      : null,
    tokenApprovedFarm()
  );
  useKeepSWRDataLiveAsBlocksArrive(mutateFarmBalance);
  useKeepSWRDataLiveAsBlocksArrive(mutateTokenApproved);

  // Form
  const ValueSchema = Yup.object().shape({
    depositAmount: Yup.number()
      .required('Deposit amount required')
      .moreThan(0, 'Must be larger than zero.')
      .positive('Must be positive')
      .max(Number(utils.formatEther(farmBalance ? farmBalance : 0))),
  });

  const formik = useFormik({
    initialValues: {
      depositAmount: 0,
    },
    validationSchema: ValueSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setDepositing(true);
        await handleTransaction({
          transaction: depositFarm(
            library,
            chainId,
            Number(pid),
            values.depositAmount ===
              Number(utils.formatEther(farmBalance ? farmBalance : 0))
              ? utils.formatEther(farmBalance ? farmBalance : 0)
              : values.depositAmount
          ),
          messages: {
            loading: `Depositing ${name}...`,
            success: 'Successfully deposited!',
            error: `Failed to deposit ${name}.`,
          },
          mutates: [mutateFarmBalance],
          chainId,
        });
        setDepositing(false);
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

  const handleApprove = async () => {
    setApproving(true);
    await handleTransaction({
      transaction: approveTokenFarm(library, chainId, farm, 1e10),
      messages: {
        loading: `Approving ${name}...`,
        success: 'Successfully approved!',
        error: `Failed to approve ${name}.`,
      },
      mutates: [mutateTokenApproved],
      chainId,
    });
    setApproving(false);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Wallet:</Typography>
          </Grid>
          <Grid item xs={9} display="flex" justifyContent="flex-end">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                component="img"
                src={img}
                sx={{
                  width: 15,

                  height: 15,
                }}
                color="inherit"
              />
              <Typography variant="subtitle1" textAlign="center">
                {shouldFetch
                  ? fNumber(
                      Number(utils.formatEther(farmBalance ? farmBalance : 0)),
                      4
                    )
                  : '-'}{' '}
                {name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <NextLink
              href={link}
              underline="hover"
              rel="noreferrer"
              variant="subtitle2"
              color="secondary.darker"
              alignItems="center"
              display="flex"
              target="_blank"
            >
              Get LP
              <Icon icon={externalLinkOutline} width={20} height={20} />
            </NextLink>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1, mb: 2 }}>
          <ReturnTextField
            fullWidth
            type="number"
            label="Deposit Amount"
            variant="filled"
            disabled={!shouldFetch}
            {...getFieldProps('depositAmount')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component="img"
                    src={img}
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
                        'depositAmount',
                        Number(utils.formatEther(farmBalance ? farmBalance : 0))
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
            error={Boolean(touched.depositAmount && errors.depositAmount)}
            helperText={touched.depositAmount && errors.depositAmount}
          />
        </Box>
        <Grid container>
          <Grid item xs={6} display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
              size="large"
              disabled={
                !shouldFetch ||
                tokenIsApproved ||
                (farmBalance && farmBalance.isZero())
              }
              sx={{ mr: 1 }}
              loading={approving}
              onClick={handleApprove}
            >
              Approve
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              variant="contained"
              size="large"
              disabled={
                !shouldFetch ||
                !tokenIsApproved ||
                (farmBalance && farmBalance.isZero())
              }
              loading={depositing}
              type="submit"
            >
              Deposit
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default Deposit;
