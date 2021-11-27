import { FC, useState } from 'react';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
// material
import { visuallyHidden } from '@mui/utils';
import {
  Box,
  Popover,
  TableSortLabel,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';

import { ColorBar } from '@orca/all-components';
// ----------------------------------------------------------------------

type SortingSelectionHeadProps = {
  order: 'asc' | 'desc';
  onRequestSort: any;
  orderBy: string;
};

export const SortingSelectingHead: FC<SortingSelectionHeadProps> = ({
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
    <Grid container alignItems="center" mt={2}>
      <Grid item md={5} display="flex" justifyContent="center">
        <Typography variant="inherit">Asset</Typography>
      </Grid>

      <Grid item md={3} display="flex" justifyContent="center">
        <TableSortLabel
          active={orderBy === 'remainingAVAI'}
          direction={orderBy === 'remainingAVAI' ? order : 'asc'}
          onClick={createSortHandler('remainingAVAI')}
        >
          AVAI Available
          {orderBy === 'remainingAVAI' ? (
            <Box component="span" style={{ ...visuallyHidden }}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      </Grid>

      <Grid item md={2} display="flex" justifyContent="center">
        <TableSortLabel
          active={orderBy === 'maxLTV'}
          direction={orderBy === 'maxLTV' ? order : 'asc'}
          onClick={createSortHandler('maxLTV')}
        >
          <Typography variant="inherit">Max LTV</Typography>
          <IconButton
            onMouseEnter={handleHoverOpen}
            onMouseLeave={handleHoverClose}
            color="secondary"
          >
            <Icon icon={infoOutline} width={20} height={20} />
          </IconButton>
          {orderBy === 'maxLTV' ? (
            <Box component="span" style={{ ...visuallyHidden }}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
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
            The loan to value (LTV) ratio signifies how much collateral has been
            used to borrow against. The max LTV signifies the maximum amount of
            collateral that can be loaned against before risking liquidation.
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

export default SortingSelectingHead;
