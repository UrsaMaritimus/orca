import { FC, useState } from 'react';
import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Stack,
  Typography,
  IconButton,
  Popover,
  Box,
} from '@material-ui/core';

// components
import { ScrollBar } from '@orca/components/scroll-bar';

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

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
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
                <TableCell align="center">
                  Collateral ({collateralType})
                </TableCell>
                <TableCell align="center">Debt ({debtType})</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="inherit">LTV</Typography>
                    <IconButton
                      onMouseEnter={handleHoverOpen}
                      onMouseLeave={handleHoverClose}
                      color="secondary"
                    >
                      <Icon icon={infoOutline} width={25} height={25} />
                    </IconButton>
                  </Stack>{' '}
                </TableCell>
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
      <Popover
        id="mouse-over-popover"
        open={Boolean(hover)}
        anchorEl={hover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleHoverClose}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1" gutterBottom>
            Loan to Value Ratio
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The loan to value (LTV) ratio signifies how much of your{' '}
            {collateralType} collateral has been used to borrow against. The max
            LTV signifies the maximum amount of collateral that can be loaned
            against before risking liquidation.
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default MainTable;
