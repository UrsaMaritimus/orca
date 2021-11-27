import Slider from 'react-slick';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useState, useRef, FC } from 'react';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';

//
import { varFadeInRight, MotionContainer } from '@orca/all-components';
import {
  CarouselControlsPaging1,
  CarouselControlsArrowsBasic1,
  CarouselControlsArrowsBasic2,
} from '@orca/all-components';

import { routes } from '@orca/shared/base';

// ----------------------------------------------------------------------

const banners = [
  {
    id: 0,
    title: 'xORCA Launch',
    description: 'Next generateration staking available now!',
    image: '/static/images/xOrcaLaunch.png',
    link: routes.MEDIUM.XORCA,
  },
  {
    id: 1,
    title: 'OrcaDAO SeaFund',
    description: 'Whales helping whales',
    image: '/static/images/SeaFundBanner.svg',
    link: routes.MEDIUM.SEAFUND,
  },
  {
    id: 2,
    title: 'Yield Yak Partnership',
    description: 'Orca teams up with Yield Yak to launch ibTKNs',
    image: '/static/images/Yak Partnership.png',
    link: routes.MEDIUM.YAK,
  },
];

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320,
  },
}));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: number | string;
    title: string;
    description: string;
    image: string;
    link: string;
  };
  isActive: boolean;
};

const CarouselItem: FC<CarouselItemProps> = ({ item, isActive }) => {
  const { image, title, description, link } = item;

  return (
    <Link href={link} target="_blank">
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          }}
        />
        <CarouselImgStyle alt={title} src={image} />
        <CardContent
          sx={{
            bottom: 0,
            width: 1,
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  opacity: 0.48,
                  display: 'block',
                }}
              >
                Medium Articles
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h5" gutterBottom noWrap>
                {title}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="body2" noWrap>
                {description}
              </Typography>
            </motion.div>
          </MotionContainer>
        </CardContent>
      </Box>
    </Link>
  );
};

export default function MediumArticles() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>();
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? banners.length - 1 : 0
  );

  const settings = {
    speed: 1000,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    fade: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {banners.map((app, index) => (
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
    </Card>
  );
}
