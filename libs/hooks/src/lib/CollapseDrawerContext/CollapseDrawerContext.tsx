import { FC } from 'react';
import { createContext, useState, useEffect } from 'react';
// material
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const initialState = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onHoverEnter: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onHoverLeave: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const CollapseDrawerContext = createContext(initialState);

const CollapseDrawerProvider: FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (isMobile) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isMobile]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
};

export { CollapseDrawerProvider, CollapseDrawerContext };
