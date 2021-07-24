import { FC, useState } from 'react';

import { NextLink } from '@ursa/components/links';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
// material
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { routes } from '@ursa/shared/base';
import { MButton } from '@ursa/components/material-extend/buttons';
// ----------------------------------------------------------------------

export type Row = {
  vaultID: string;
  collateral: string;
  debt: string;
  ratio: string;
};

type TableProps = {
  row: Row;
};

const RowTable: FC<TableProps> = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {row.vaultID}
      </TableCell>
      <TableCell align="right">{row.collateral}</TableCell>
      <TableCell align="right">{row.debt}</TableCell>
      <TableCell align="right">{row.ratio}</TableCell>
      <TableCell align="right">
        <MButton
          variant="contained"
          size="medium"
          color="secondary"
          LinkComponent={NextLink}
          href={`${routes.APP.VAULTS.USER}/${row.vaultID}`}
          startIcon={<Icon icon={editOutline} />}
        >
          Manage
        </MButton>
      </TableCell>
    </TableRow>
  );
};

export default RowTable;
