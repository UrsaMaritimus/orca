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
import { MIconButton } from '@orca/components';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 20,
  height: 20,
};

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  display: 'flex',
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  '&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

type Props = {
  arrowLine?: boolean;
  onNext: React.MouseEventHandler<HTMLButtonElement>;
  onPrevious: React.MouseEventHandler<HTMLButtonElement>;
  sx?: any;
};

export const CarouselControlsArrowsBasic1: FC<Props> = ({
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

export default CarouselControlsArrowsBasic1;
