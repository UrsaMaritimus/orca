import { FC } from 'react';
import TopBar from './TopBar';
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

const HomeLayout: FC = ({ children }) => {
  return (
    <Box sx={{ height: '100%' }}>
      <TopBar />
      <Box sx={{ height: '100%' }}>{children}</Box>
    </Box>
  );
};

export default HomeLayout;
