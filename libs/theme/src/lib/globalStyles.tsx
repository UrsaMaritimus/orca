import { GlobalStyles } from '@mui/material';

export const CustomGlobalStyles = () => {
  return (
    <GlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          '-ms-text-size-adjust': '100%',
          '-webkit-overflow-scrolling': 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          color: '#212B36',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        "[data-theme='dark'] body": {
          backgroundColor: '#161C24',
          color: '#fff',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        // Lazy Load Img
        '.blur-up': {
          WebkitFilter: 'blur(5px)',
          filter: 'blur(5px)',
          transition: 'filter 400ms, -webkit-filter 400ms',
        },
        '.blur-up.lazyloaded ': {
          WebkitFilter: 'blur(0)',
          filter: 'blur(0)',
        },
      }}
    />
  );
};
