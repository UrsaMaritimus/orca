import { FC } from 'react';
import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
import roundKeyboardArrowLeft from '@iconify/icons-ic/round-keyboard-arrow-left';
import roundKeyboardArrowRight from '@iconify/icons-ic/round-keyboard-arrow-right';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import { MIconButton } from '../../material-extend/buttons';

// ----------------------------------------------------------------------

const SIZE = 40;

const ICON_SIZE = {
  width: 20,
  height: 20,
};

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between',
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  width: SIZE,
  height: SIZE,
  opacity: 0.48,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: theme.palette.grey[900],

  transition: theme.transitions.create('opacity'),
  '&:hover': {
    opacity: 1,
    background: theme.palette.grey[900],
  },
}));

// ----------------------------------------------------------------------

type Props = {
  arrowLine?: boolean;
  onNext: React.MouseEventHandler<HTMLButtonElement>;
  onPrevious: React.MouseEventHandler<HTMLButtonElement>;
  sx?: any;
};

export const CarouselControlsArrowsBasic2: FC<Props> = ({
  arrowLine,
  onNext,
  onPrevious,
  ...other
}) => {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        {arrowLine ? (
          <Icon
            icon={isRTL ? roundKeyboardArrowRight : roundKeyboardArrowLeft}
            {...ICON_SIZE}
          />
        ) : (
          <Icon icon={isRTL ? arrowRightFill : arrowLeftFill} {...ICON_SIZE} />
        )}
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        {arrowLine ? (
          <Icon
            icon={isRTL ? roundKeyboardArrowLeft : roundKeyboardArrowRight}
            {...ICON_SIZE}
          />
        ) : (
          <Icon icon={isRTL ? arrowLeftFill : arrowRightFill} {...ICON_SIZE} />
        )}
      </ArrowStyle>
    </RootStyle>
  );
};

export default CarouselControlsArrowsBasic2;
