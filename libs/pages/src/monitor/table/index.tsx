import { useState, FC } from 'react';
import Image from 'next/image';
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
  Typography,
  Stack,
} from '@mui/material';

import { Icon } from '@iconify/react';
import dropletOutline from '@iconify/icons-eva/droplet-outline';
// components
import { ScrollBar, Link } from '@orca/components';
//
import SortingSelectingHead from './SortingSelectingHead';
import { fPercent, fCurrency, colorScale } from '@orca/util';
import { routes, BankInfo } from '@orca/shared';

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
  collateral: number;
  debt: number;
  cp: number;
  mcp: number;
  ratio: number;
  collatInfo: BankInfo;
};

type RowProps = {
  rows: Row[];
};

const SortingSelecting: FC<RowProps> = ({ rows }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('ratio');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={`${row.collatInfo.erc20}${row.num}`}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          align="center"
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Image
                              src={row.collatInfo.icon}
                              width={30}
                              height={30}
                              color="inherit"
                            />
                            <Typography variant="subtitle1">
                              {row.collatInfo.display}
                            </Typography>
                            <Typography variant="subtitle1">
                              #{row.num}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">
                          {fCurrency(row.collateral)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: colorScale(row.ratio, 0.75, 1),
                            fontWeight: 'bold',
                          }}
                        >
                          {fPercent(row.ratio * 100)}{' '}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            LinkComponent={Link}
                            href={`${routes.APP.VAULTS.USER}/${
                              row.collatInfo.url
                                ? row.collatInfo.url
                                : row.collatInfo.display
                            }/${row.num}`}
                            startIcon={<Icon icon={dropletOutline} />}
                            disabled={row.cp >= row.mcp}
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
