import { FC } from 'react';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import TimelineDot, { TimelineDotProps } from '@material-ui/lab/TimelineDot';

// ----------------------------------------------------------------------

type Props = {
  color?:
    | 'grey'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  variant?: 'filled' | 'outlined';
} & Omit<TimelineDotProps, 'color' | 'variant'>;

type StyledTimelineDot = {
  styleProps: {
    color:
      | 'grey'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error';
    variant?: 'filled' | 'outlined';
  };
} & TimelineDotProps;

const TimelineDotStyle = styled((props: StyledTimelineDot) => (
  <TimelineDot {...props} />
))(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  return {
    ...(variant === 'filled'
      ? {
          '&.MuiTimelineDot-filled': {
            color: theme.palette[color].contrastText,
            backgroundColor: theme.palette[color].main,
          },
        }
      : {
          '&.MuiTimelineDot-outlined': {
            borderColor: theme.palette[color].main,
          },
        }),
  };
});

const MTimelineDot: FC<Props> = ({
  color = 'grey',
  variant = 'filled',
  className,
  ...other
}) => {
  if (
    color === 'grey' ||
    color === 'inherit' ||
    color === 'primary' ||
    color === 'secondary'
  ) {
    return <TimelineDot color={color} variant={variant} {...other} />;
  }

  return (
    <TimelineDotStyle
      variant={variant}
      styleProps={{ color, variant }}
      {...other}
    />
  );
};

export default MTimelineDot;
