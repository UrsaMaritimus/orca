import { useState, FC } from 'react';
// material
import {
  Box,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';

import { Icon } from '@iconify/react';
import dropletOutline from '@iconify/icons-eva/droplet-outline';
// components
import { ScrollBar } from '@orca/components/scroll-bar';
//
import SortingSelectingHead from './SortingSelectingHead';
import { BigNumber, utils } from 'ethers';
import { fPercent, fCurrency, colorScale } from '@orca/util';
import { routes } from '@orca/shared/base';
import { NextLink } from '@orca/components/links';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

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

type Row = {
  num: number;
  debt: BigNumber;
  cp: BigNumber;
  mcp: BigNumber;
  collateral: BigNumber;
};

type RowProps = {
  rows: Row[];
  collateralType: string;
};

const SortingSelecting: FC<RowProps> = ({ rows, collateralType }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('cp');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty SORTING_SELECTING_TABLE.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Grid container>
      <Grid item xs={12}>
        <ScrollBar>
          <TableContainer sx={{ maxWidth: '750px', mt: 3, mx: 'auto' }}>
            <Table size={'medium'}>
              <SortingSelectingHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.num}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          align="center"
                        >
                          {row.num}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: colorScale(
                              Number(
                                utils.formatUnits(
                                  BigNumber.from(1e8).div(row.cp),
                                  4
                                )
                              ),
                              50,
                              (100 / row.mcp.toNumber()) * 100
                            ),
                            fontWeight: 'bold',
                          }}
                        >
                          {fPercent(
                            Number(
                              utils.formatUnits(
                                BigNumber.from(1e8).div(row.cp),
                                4
                              )
                            )
                          )}{' '}
                        </TableCell>
                        <TableCell align="center">
                          {fCurrency(Number(utils.formatEther(row.collateral)))}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            LinkComponent={NextLink}
                            href={`${routes.APP.VAULTS.USER}/${collateralType}/${row.num}`}
                            startIcon={<Icon icon={dropletOutline} />}
                            disabled={row.cp.gte(row.mcp)}
                          >
                            Liquidate
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 43 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollBar>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SortingSelecting;
