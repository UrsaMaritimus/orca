import Slider from 'react-slick';
import { filter } from 'lodash';

import { useState, useRef, FC } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import {
  CardContent,
  Box,
  Paper,
  Typography,
  Grid,
  CardHeader,
  useMediaQuery,
  Stack,
} from '@mui/material';

//
import {
  CarouselControlsPaging1,
  CarouselControlsArrowsBasic2,
} from '@orca/components/carousel';

import { tokenInfo } from '@orca/shared/base';
import { BigNumber, utils } from 'ethers';
import { fCurrency } from '@orca/util';

import { LTVWidget } from './ltv';

// ----------------------------------------------------------------------
type BankInfoItem = {
  collateral: BigNumber;
  debt: BigNumber;
  ltv: BigNumber;
  maxLtv: number;
  name: string;
  id: string;
  message?: string;
};

type CarouselItemProps = {
  item: BankInfoItem;
  isActive: boolean;
};

const CarouselItem: FC<CarouselItemProps> = ({ item, isActive }) => {
  const { collateral, debt, ltv, name, message, maxLtv } = item;

  return (
    <Paper
      sx={{
        mt: 2,
        mb: 2,
        mx: 1.5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        boxShadow: 5,
      }}
    >
      <CardHeader
        title={filter(tokenInfo, (info) => info.erc20 === name)[0].display}
        avatar={
          <Box
            component="img"
            src={filter(tokenInfo, (info) => info.erc20 === name)[0].icon}
            sx={{ width: 40, height: 40 }}
            color="inherit"
          />
        }
      />
      <CardContent>
        {message && (
          <Grid container sx={{ pt: 13, pb: 16 }}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography variant="h6">{message}</Typography>
            </Grid>
          </Grid>
        )}
        {!message && (
          <Grid container>
            <Grid item xs={6}>
              <Stack alignItems="center">
                <Typography variant="h6">Collateral</Typography>
                <Typography variant="body2" color="primary.main">
                  {fCurrency(Number(utils.formatEther(collateral)))}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack alignItems="center">
                <Typography variant="h6">Debt</Typography>
                <Typography variant="body2" color="warning.light">
                  {fCurrency(Number(utils.formatEther(debt)))}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <LTVWidget
                ltv={Number(utils.formatUnits(ltv, 2))}
                maxLtv={maxLtv}
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Paper>
  );
};

type BankInfoProps = {
  data: BankInfoItem[];
};

export const BankInfo: FC<BankInfoProps> = ({ data }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const carouselRef = useRef<Slider>();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? data.length - 1 : 0
  );

  const settings = {
    speed: 1000,
    autoplaySpeed: 5000,
    dots: false,
    arrows: false,
    autoplay: false,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: matches ? 1 : 2,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselControlsPaging1({
      color: 'secondary.main',
      sx: {
        bottom: 'auto',
        right: 'auto',
      },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  const extra = [
    {
      name: 'wbtc.e',
      debt: BigNumber.from(0),
      collateral: BigNumber.from(0),
      ltv: BigNumber.from(0),
      maxLtv: 0,
      id: 'wbtc.e',
      message: 'Coming soon!',
    },
    {
      name: 'weth.e',
      debt: BigNumber.from(0),
      collateral: BigNumber.from(0),
      ltv: BigNumber.from(0),
      maxLtv: 0,
      id: 'weth.e',
      message: 'Coming soon!',
    },
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <CardHeader
        title="Stable Coin Banks"
        subheader="Use your crypto as collateral to borrow AVAI"
      />
      <Slider ref={carouselRef} {...settings}>
        {data.map((app, index) => (
          <CarouselItem
            key={app.id}
            item={app}
            isActive={index === currentIndex}
          />
        ))}
        {data.length === 1 &&
          extra.map((app, index) => (
            <CarouselItem
              key={app.id}
              item={app}
              isActive={index === currentIndex}
            />
          ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Box>
  );
};

export default BankInfo;
