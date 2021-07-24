import { useContext } from 'react';
import { CollapseDrawerContext } from './CollapseDrawerContext';

// ----------------------------------------------------------------------

export const useCollapseDrawer = () => useContext(CollapseDrawerContext);
