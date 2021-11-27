import { FC, useState } from 'react';

import { NextLink } from '@orca/components';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
// material

import { TableRow, TableCell, Button } from '@mui/material';

import { routes } from '@orca/shared/base';
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
  const [open, setOpen] = useState(false);

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
