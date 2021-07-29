import { FC, useState } from 'react';

import { NextLink } from '@ursa/components/links';

import { Icon } from '@iconify/react';
import editOutline from '@iconify/icons-eva/edit-outline';
// material

import { TableRow, TableCell, Button } from '@material-ui/core';

import { routes } from '@ursa/shared/base';
import { fPercent, fShortenNumber } from '@ursa/util';

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
      <TableCell component="th" scope="row">
        {row.vaultID}
      </TableCell>
      <TableCell align="center">
        {fShortenNumber(Number(row.collateral))}
      </TableCell>
      <TableCell align="center">{fShortenNumber(Number(row.debt))}</TableCell>
      <TableCell align="center">{fPercent(Number(row.ratio))}</TableCell>
      <TableCell align="right">
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
