import { FC } from 'react';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import ButtonGroup, { ButtonGroupProps } from '@material-ui/core/ButtonGroup';

// ----------------------------------------------------------------------

type ButtonGroupStyleProps = {
  styleProps: {
    color?:
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'white';
    variant?: 'contained' | 'outlined' | 'text';
  };
} & ButtonGroupProps;

const ButtonGroupStyle = styled((props: ButtonGroupStyleProps) => (
  <ButtonGroup {...props} />
))(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  const styleContained = (color) => ({
    boxShadow: theme.shadowExtension[color],
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      borderColor: `${theme.palette[color].dark} !important`,
      '&:hover': {
        backgroundColor: theme.palette[color].dark,
      },
    },
  });

  const styleOutlined = (color) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
      '&:hover': {
        borderColor: `${theme.palette[color].main} !important`,
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  });

  const styleText = (color) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${theme.palette[color].main} !important`,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
    },
  });
  return {
    ...(variant === 'contained' && { ...styleContained(color) }),
    ...(variant === 'outlined' && { ...styleOutlined(color) }),
    ...(variant === 'text' && { ...styleText(color) }),
  };
});
// ----------------------------------------------------------------------
// Typing
type Props = {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'white';
  variant?: 'contained' | 'outlined' | 'text';
} & Omit<ButtonGroupProps, 'color' | 'variant'>;

const MButtonGroup: FC<Props> = ({
  color = 'primary',
  variant = 'outlined',
  children,
  ...other
}) => {
  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonGroup color={color} variant={variant} {...other}>
        {children}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroupStyle
      variant={variant}
      styleProps={{ color, variant }}
      {...other}
    >
      {children}
    </ButtonGroupStyle>
  );
};

export default MButtonGroup;
