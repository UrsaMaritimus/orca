import { FC, useState } from 'react';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
// material
import { visuallyHidden } from '@material-ui/utils';
import {
  Box,
  Popover,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Typography,
  IconButton,
} from '@material-ui/core';

// ----------------------------------------------------------------------

type SortingSelectionHeadProps = {
  order: 'asc' | 'desc';
  onRequestSort: any;
  rowCount: number;
  orderBy: string;
};

const SortingSelectingHead: FC<SortingSelectionHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={'num'}
          align={'center'}
          padding={'normal'}
          sortDirection={orderBy === 'num' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'num'}
            direction={orderBy === 'num' ? order : 'asc'}
            onClick={createSortHandler('num')}
          >
            <Typography variant="inherit">Vault #</Typography>

            {orderBy === 'num' ? (
              <Box component="span" sx={{ ...visuallyHidden }}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key={'cp'}
          align={'center'}
          padding={'normal'}
          sortDirection={orderBy === 'cp' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'cp'}
            direction={orderBy === 'cp' ? order : 'asc'}
            onClick={createSortHandler('cp')}
          >
            <Typography variant="inherit">LTV</Typography>
            <IconButton
              onMouseEnter={handleHoverOpen}
              onMouseLeave={handleHoverClose}
              color="secondary"
            >
              <Icon icon={infoOutline} width={25} height={25} />
            </IconButton>

            {orderBy === 'cp' ? (
              <Box component="span" sx={{ ...visuallyHidden }}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key={'collateral'}
          align={'center'}
          padding={'normal'}
          sortDirection={orderBy === 'collateral' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'collateral'}
            direction={orderBy === 'collateral' ? order : 'asc'}
            onClick={createSortHandler('collateral')}
          >
            Collateral (USD)
            {orderBy === 'collateral' ? (
              <Box component="span" sx={{ ...visuallyHidden }}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key={'debt'}
          align={'center'}
          padding={'normal'}
          sortDirection={orderBy === 'debt' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'debt'}
            direction={orderBy === 'debt' ? order : 'asc'}
            onClick={createSortHandler('debt')}
          >
            Debt (USD)
            {orderBy === 'debt' ? (
              <Box component="span" sx={{ ...visuallyHidden }}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
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
            The loan to value (LTV) ratio signifies how much collateral has been
            used to borrow against. The max LTV signifies the maximum amount of
            collateral that can be loaned against before risking liquidation.
          </Typography>
        </Box>
      </Popover>
    </TableHead>
  );
};

export default SortingSelectingHead;
