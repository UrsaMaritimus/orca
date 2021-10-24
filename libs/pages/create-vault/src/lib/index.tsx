import { FC, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { Icon } from '@iconify/react';
import backArrowIos from '@iconify/icons-eva/arrow-ios-back-outline';

import { filter } from 'lodash';

import {
  Container,
  Card,
  IconButton,
  CardHeader,
  styled,
  TablePagination,
  Grid,
  Backdrop,
} from '@mui/material';

import { NextLink } from '@orca/components/links';
import { Page } from '@orca/components/page';
import { Connect } from '@orca/components/connect';
import { routes, tokenInfo } from '@orca/shared/base';
import { Loader } from '@orca/components/loader';
import { baseCollateral, ibtknCollateral } from '@orca/shared/base';

import { VaultCard } from './VaultCard';
import { SortingSelectingHead } from './SortingHeader';
import { useGetVaults } from './getBankInfo';
import { ItemChooser } from './ItemChooser';
//----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

//----------------------------------------------------------------------
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

//----------------------------------------------------------------------

export const CreateVault: FC = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState<'remainingAVAI' | 'maxLTV'>(
    'remainingAVAI'
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState<string>('');
  const [assets, setAssets] = useState<'all' | 'base' | 'ibktn'>('all');
  const [handlingTransaction, setHandlingTransaction] =
    useState<boolean>(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearchSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleAssetChange = (newOption: 'all' | 'base' | 'ibktn') => {
    setAssets(newOption);
  };

  const handleTransaction = (state: boolean) => {
    setHandlingTransaction(state);
  };

  const collateral = filter(tokenInfo, { collateral: true });
  const { loading, rows } = useGetVaults(chainId, collateral);
  if (!loading) {
    return (
      <Connect title={'Vaults'}>
        <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
          <Container maxWidth="md">
            <Card>
              <CardHeader
                title="Create a Vault"
                subheader="Choose your collateral type"
                avatar={
                  <IconButton
                    color="secondary"
                    LinkComponent={NextLink}
                    href={routes.APP.VAULTS.USER}
                  >
                    <Icon icon={backArrowIos} width={30} height={30} />
                  </IconButton>
                }
                sx={{ mb: 3 }}
              />
            </Card>
            <Grid container>
              <Backdrop
                sx={{ position: 'absolute', zIndex: 99 }}
                open={handlingTransaction}
              >
                <Loader />
              </Backdrop>
              <Grid item xs={12}>
                <ItemChooser
                  handleSearchSort={handleSearchSort}
                  handleAssetChange={handleAssetChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
                <SortingSelectingHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
              </Grid>
              <Grid item xs={12}>
                {stableSort(
                  rows
                    .filter((row) =>
                      assets === 'all' || assets === 'base'
                        ? baseCollateral.includes(row.collatInfo.display)
                        : ibtknCollateral.includes(row.collatInfo.display)
                    )
                    .filter((row) =>
                      row.collatInfo.display.toLowerCase().includes(searchText)
                    ),
                  getComparator(order, orderBy)
                ).map((collat) => (
                  <VaultCard
                    row={collat}
                    library={library}
                    chainId={chainId}
                    handleNewTransaction={handleTransaction}
                    account={account}
                  />
                ))}
              </Grid>
              <Grid item xs={12}>
                <TablePagination
                  component="div"
                  page={page}
                  count={
                    stableSort(
                      rows
                        .filter((row) =>
                          assets === 'all' || assets === 'base'
                            ? baseCollateral.includes(row.collatInfo.display)
                            : ibtknCollateral.includes(row.collatInfo.display)
                        )
                        .filter((row) =>
                          row.collatInfo.display
                            .toLowerCase()
                            .includes(searchText)
                        ),
                      getComparator(order, orderBy)
                    ).length
                  }
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </Connect>
    );
  }
  return (
    <Container maxWidth="md">
      <Loader />
    </Container>
  );
};
