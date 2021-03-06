import { FC, useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type ItemChooserProps = {
  handleSearchSort: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAssetChange: (newOption: 'all' | 'base' | 'ibktn') => void;
};

export const ItemChooser: FC<ItemChooserProps> = ({
  handleSearchSort,
  handleAssetChange,
}) => {
  const [option, setOption] = useState<'all' | 'base' | 'ibktn'>('all');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: 'all' | 'base' | 'ibktn'
  ) => {
    setOption(newOption);
    handleAssetChange(newOption);
  };
  return (
    <Grid container sx={{ my: 2 }}>
      <Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
      <Grid item xs={12} sm={6} display="flex" justifyContent="center">
        <ToggleButtonGroup
          color="primary"
          value={option}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="all">All Assets</ToggleButton>

          <ToggleButton value="base">Base Assets</ToggleButton>
          <ToggleButton value="ibtkn">Interest Bearing</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item xs={12} sm={3} display="flex" justifyContent="center">
        <TextField
          sx={{ m: { xs: 2, sm: 1, md: 0 } }}
          id="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search Assets"
          onChange={handleSearchSort}
        />
      </Grid>
    </Grid>
  );
};
