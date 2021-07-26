import { FC, useState } from 'react';

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@material-ui/core';

// components
import { ScrollBar } from '@ursa/components/scroll-bar';

import RowTable, { Row } from './TableRow';

// ----------------------------------------------------------------------

type MainTableProps = {
  rows: Row[];
  collateralType: string;
  debtType: string;
};

const MainTable: FC<MainTableProps> = ({ rows, collateralType, debtType }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <ScrollBar>
        <TableContainer sx={{ minWidth: 800, mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Vault ID
                </TableCell>
                <TableCell align="right">
                  Collateral ({collateralType})
                </TableCell>
                <TableCell align="right">Debt ({debtType})</TableCell>
                <TableCell align="right">Ratio</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <RowTable
                    key={row.vaultID}
                    row={row}
                    collateralType={collateralType}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollBar>
      <TablePagination
        component="div"
        page={page}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default MainTable;
