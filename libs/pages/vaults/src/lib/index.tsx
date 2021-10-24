/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { styled } from '@mui/material/styles';

import {
  Card,
  CardHeader,
  Typography,
  Stack,
  Container,
  TablePagination,
  Button,
  Grid,
} from '@mui/material';

import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { Loader } from '@orca/components/loader';
import { NextLink } from '@orca/components/links';

import { useGetVaults } from './useVault';
import { VaultCard } from './VaultCard';
import { routes } from '@orca/shared/base';
import SortingSelectingHead from './SortingHeader';
import { ItemChooser } from './ItemChooser';
import { base, ibtkn } from './constants';

//--------------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//--------------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

//--------------------------------------------------------------------------

export function Vaults(props) {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('ratio');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState<string>('');
  const [assets, setAssets] = useState<'all' | 'base' | 'ibktn'>('all');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleAssetChange = (newOption: 'all' | 'base' | 'ibktn') => {
    setAssets(newOption);
  };

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
                  <ItemChooser
                    handleSearchSort={handleSearchSort}
                    handleAssetChange={handleAssetChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  <SortingSelectingHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                </Grid>
                <Grid item xs={12}>
                  {stableSort(
                    rows
                      .filter((row) =>
                        assets === 'all' || assets === 'base'
                          ? base.includes(row.symbol)
                          : ibtkn.includes(row.symbol)
                      )
                      .filter((row) =>
                        row.symbol.toLowerCase().includes(searchText)
                      ),
                    getComparator(order, orderBy)
                  )
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
