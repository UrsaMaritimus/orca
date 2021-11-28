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
  Grid,
} from '@mui/material';

// components
import { ColorBar } from '../colorbar';
import { ScrollBar } from '../scroll-bar';
import { tokenInfo } from '@orca/shared';
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
    <Grid container>
      <Grid item xs={12}>
        <ScrollBar>
          <TableContainer sx={{ maxWidth: '750px', mt: 3, mx: 'auto' }}>
            <Table size={'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ px: 0.5, maxWidth: '250px' }}
                  >
                    Vault ID
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, maxWidth: '250px' }}>
                    Collateral <br />({tokenInfo[collateralType].display})
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, maxWidth: '250px' }}>
                    Debt <br />({debtType})
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0.5, maxWidth: '250px' }}>
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
                        <Icon icon={infoOutline} width={20} height={20} />
                      </IconButton>
                    </Stack>{' '}
                  </TableCell>
                  <TableCell sx={{ p: 0, maxWidth: '20px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    if (row) {
                      return (
                        <RowTable
                          key={row.vaultID}
                          row={row}
                          collateralType={collateralType}
                        />
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollBar>
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
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            The loan to value (LTV) ratio signifies how much of your{' '}
            {collateralType} collateral has been used to borrow against. The max
            LTV signifies the maximum amount of collateral that can be loaned
            against before risking liquidation.
          </Typography>
          <ColorBar />
          <Grid container>
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <Typography variant={'caption'}>Safe</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <Typography variant={'caption'}>Risky</Typography>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Grid>
  );
};

export default MainTable;
