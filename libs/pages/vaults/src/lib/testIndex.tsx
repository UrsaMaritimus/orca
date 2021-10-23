/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Container,
  TablePagination,
  Button,
  Grid,
  Paper,
} from '@mui/material';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { Loader } from '@orca/components/loader';
import { NextLink } from '@orca/components/links';

import { useGetVaults } from './useVault';
import { VaultCard } from './VaultCard';
import { routes } from '@orca/shared/base';

//--------------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

//--------------------------------------------------------------------------

export function Vaults(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const { loading, rows } = useGetVaults(library, chainId, account);
  // Default return
  return (
    <Connect title={'Vaults'}>
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="md">
          <Card
            sx={{
              mb: 3,
              pb: 3,
              position: 'relative',
            }}
          >
            <CardHeader
              title={'Your vaults'}
              subheader={'Manage your borrowing here'}
              action={
                <Button
                  href={routes.APP.VAULTS.CREATE}
                  LinkComponent={NextLink}
                  sx={{ mt: 2, mb: 2, textAlign: 'center' }}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  <Typography>Create Vault</Typography>
                </Button>
              }
            />
          </Card>

          {!loading ? (
            rows ? (
              <Grid container>
                <Grid item xs={12}>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data) => (
                      <VaultCard row={data} />
                    ))}
                </Grid>
                <Grid item xs={12}>
                  <TablePagination
                    component="div"
                    page={page}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
            ) : (
              <Stack alignItems="center">
                <Typography
                  variant="h1"
                  color="inherit"
                  sx={{ mt: 2, mb: 2, textAlign: 'center' }}
                >
                  No vaults created yet.
                </Typography>

                <Button
                  href={routes.APP.VAULTS.CREATE}
                  LinkComponent={NextLink}
                  sx={{ mt: 2, mb: 2, textAlign: 'center' }}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  <Typography>Create a vault to start!</Typography>
                </Button>
              </Stack>
            )
          ) : (
            <Card>
              <Loader />
            </Card>
          )}
        </Container>
      </RootStyle>
    </Connect>
  );
}

export default Vaults;
