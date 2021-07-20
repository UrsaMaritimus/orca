import { FC } from 'react';

import { Icon } from '@iconify/react';
import moonFill from '@iconify/icons-eva/moon-fill';
import sunFill from '@iconify/icons-eva/sun-fill';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import CardActionArea from '@material-ui/core/CardActionArea';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useTheme } from 'next-themes';

// ----------------------------------------------------------------------

type Props = {
  className?: string;
};

const ThemeMode: FC<Props> = ({ className }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const themeMode = theme === 'system' ? systemTheme : theme;
  return (
    <RadioGroup
      name="themeMode"
      value={themeMode}
      onChange={(event) => {
        const change: string = event.target.value;
        setTheme(change);
      }}
    >
      <Grid container spacing={2.5}>
        {['light', 'dark'].map((mode, index) => (
          <Grid item xs={6} key={mode}>
            <Paper
              sx={{
                width: 1,
                zIndex: 0,
                overflow: 'hidden',
                position: 'relative',
                bgcolor: mode === 'dark' ? 'grey.900' : 'common.white',
                ...(themeMode === mode && {
                  boxShadow: (theme) => theme.shadowExtension.z12,
                }),
              }}
            >
              <CardActionArea sx={{ color: 'primary.main' }}>
                <Box
                  sx={{
                    py: 4,
                    display: 'flex',
                    color: 'text.disabled',
                    justifyContent: 'center',
                    ...(themeMode === mode && {
                      color: 'primary.main',
                    }),
                  }}
                >
                  <Icon
                    icon={index === 0 ? sunFill : moonFill}
                    width={24}
                    height={24}
                  />
                </Box>
                <FormControlLabel
                  label=""
                  value={mode}
                  control={<Radio sx={{ display: 'none' }} />}
                  sx={{
                    top: 0,
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }}
                />
              </CardActionArea>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default ThemeMode;
