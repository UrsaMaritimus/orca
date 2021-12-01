import { useRef, FC } from 'react';

import Slider from 'react-slick';

// material
import { Box, Grid, CardHeader, useTheme, useMediaQuery } from '@mui/material';
import { CarouselControlsArrowsBasic2 } from '@orca/components';

import { FarmTokenInfo } from '@orca/shared';
import { YieldFarm } from './Farm';
import { YourFarmInfo } from './YourFarmToken';

export const YieldFarmInfo: FC = () => {
  const carouselRef = useRef<Slider>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    speed: 1000,
    autoplaySpeed: 10000,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: matches ? 1 : 2,
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
            {Object.keys(FarmTokenInfo).map((app) => {
              if (FarmTokenInfo[app].active)
                return (
                  <YieldFarm
                    key={FarmTokenInfo[app].display}
                    name={FarmTokenInfo[app].display}
                    img={FarmTokenInfo[app].icon}
                    address={FarmTokenInfo[app].address.mainnet}
                  />
                );
            })}
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
