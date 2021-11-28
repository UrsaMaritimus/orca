import { FC } from 'react';

import { NextLink } from '../links';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
// material

import { TableRow, TableCell, Button } from '@mui/material';

import { routes } from '@orca/shared';
import { fPercent, fNumber, colorScale } from '@orca/util';

// ----------------------------------------------------------------------

export type Row = {
  vaultID: string;
  collateral: string;
  debt: string;
  ratio: string;
};

type TableProps = {
  row: Row;
  collateralType: string;
};

const RowTable: FC<TableProps> = ({ row, collateralType }) => {
  return (
    <TableRow>
      <TableCell component="th" align="center" scope="row">
        {row.vaultID}
      </TableCell>
      <TableCell align="center">{fNumber(Number(row.collateral), 2)}</TableCell>
      <TableCell align="center">{fNumber(Number(row.debt), 2)}</TableCell>
      <TableCell align="center" sx={{ color: colorScale(Number(row.ratio)) }}>
        {fPercent(Number(row.ratio))}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          size="medium"
          color="primary"
          LinkComponent={NextLink}
          href={`${routes.APP.VAULTS.USER}/${collateralType}/${row.vaultID}`}
          startIcon={<Icon icon={editOutline} />}
        >
          Manage
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default RowTable;
