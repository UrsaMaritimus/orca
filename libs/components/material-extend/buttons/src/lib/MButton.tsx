import { forwardRef } from 'react';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';

// ----------------------------------------------------------------------

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
} & Omit<ButtonProps, 'color' | 'variant'>;

type StyledButtonProps = {
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
} & ButtonProps;

const ButtonStyle = styled((props: StyledButtonProps) => <Button {...props} />)(
  ({ theme, styleProps }) => {
    const { color, variant } = styleProps;
    const styleContained = (color) => ({
      boxShadow: theme.shadowExtension[color],
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      '&:hover': {
        backgroundColor: theme.palette[color].dark,
      },
    });

    const styleOutlined = (color) => ({
      color: theme.palette[color].main,
      border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
      '&:hover': {
        border: `1px solid ${theme.palette[color].main}`,
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
    });

    const styleText = (color) => ({
      color: theme.palette[color].main,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity
        ),
      },
    });
    return {
      ...(variant === 'contained' && { ...styleContained(color) }),
      ...(variant === 'outlined' && { ...styleOutlined(color) }),
      ...(variant === 'text' && { ...styleText(color) }),
    };
  }
);

// ----------------------------------------------------------------------

// Typings similar to HTML Button Element

const MButton = forwardRef<HTMLButtonElement, Props>(
  ({ color = 'primary', variant = 'text', children, ...other }, ref) => {
    if (color === 'inherit' || color === 'primary' || color === 'secondary') {
      return (
        <Button ref={ref} color={color} variant={variant} {...other}>
          {children}
        </Button>
      );
    }

    return (
      <ButtonStyle
        ref={ref}
        variant={variant}
        styleProps={{ color, variant }}
        {...other}
      >
        {children}
      </ButtonStyle>
    );
  }
);

export default MButton;
