import { useState, useRef, FC } from 'react';

import Slider from 'react-slick';
import { filter } from 'lodash';

// material
import { useTheme } from '@mui/material/styles';
import {
  CardContent,
  Box,
  Card,
  Typography,
  Grid,
  CardHeader,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { CarouselControlsArrowsBasic2 } from '@orca/components/carousel';

import { farms } from '@orca/shared/base';
import { YieldFarm } from './Farm';
import { YourFarmInfo } from './YourFarmToken';

export const YieldFarmInfo: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const carouselRef = useRef<Slider>();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? farms.length - 1 : 0
  );
  const settings = {
    speed: 1000,
    autoplaySpeed: 10000,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    pauseOnHover: true,
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box sx={{ position: 'relative' }}>
          <CardHeader
            title="Yield Farm"
            subheader="Earn ORCA and participate in the DAO"
          />
          <Slider ref={carouselRef} {...settings}>
            {farms.map((app) => (
              <YieldFarm
                key={app.name}
                name={app.name}
                img={app.img}
                address={app.address}
              />
            ))}
          </Slider>
          <CarouselControlsArrowsBasic2
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ position: 'relative' }}>
          <CardHeader
            title="Claim Rewards"
            subheader="Claim your earned ORCA"
          />
          <YourFarmInfo />
        </Box>
      </Grid>
    </Grid>
  );
};
