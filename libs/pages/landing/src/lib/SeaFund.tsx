import { FC, useRef } from 'react';
// material
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Container,
  Typography,
  Paper,
  Divider,
  Link,
  useMediaQuery,
} from '@mui/material';

import Slider from 'react-slick';

import {
  CarouselControlsArrowsBasic2,
  CarouselControlsPaging2,
  MotionInView,
  varFadeInUp,
} from '@orca/all-components';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
}));

// --------------------------------------------

const nfps: NFPProps[] = [
  {
    name: 'Bahamas Plastic Movement',
    key: 1,
    image: '/static/images/seafund/bahama_plastic.png',
    description:
      'An on the ground approach geared towards raising awareness and finding solutions to plastic pollution. By empowering Bahamians to contribute to hands on citizen science and environmental leadership, they aim to evolve mindsets and spark cultural practices that will be pivotal in executing changes at the policy level.',
    url: 'https://www.bahamasplasticmovement.org/',
  },
  {
    name: 'Beneath The Waves',
    image: '/static/images/seafund/beneath_the_waves.png',
    description:
      'Dedicated to promoting ocean health and using science and technology to catalyze ocean policy. They specifically focus on threatened species conservation and marine protected areas, with a deep affinity for sharks.',
    url: 'https://beneaththewaves.org/',
    key: 2,
  },
  {
    name: 'Oceana',
    image: '/static/images/seafund/Oceana.png',
    description:
      'Runs campaigns to win policy change proven to increase abundance and biodiversity, such as: stopping overfishing through the establishment of science-based catch limits, reducing bycatch, or the incidental catch of non-targeted animals, and protecting important marine habitat.',
    url: 'https://oceana.org/',
    key: 3,
  },
  {
    name: 'Surfrider Foundation',
    image: '/static/images/seafund/surf_rider.png',
    description:
      'Dedicated to the protection and enjoyment of the world’s ocean, waves and beaches, specifically through initiatives in Plastic Reduction, Ocean Protection, Beach Access, Coastal Preservation, and Clean Water',
    url: 'https://www.surfrider.org/about',
    key: 4,
  },
  {
    name: 'Take 3',
    image: '/static/images/seafund/take3.png',
    description:
      'Runs social campaigns dedicated to raising awareness on the human impact of pollution, by recognizing the disconnection between plastic, designed to last forever, but utilized more often for single-use purposes . Take 3 pieces of rubbish with you when you leave the beach, waterway or anywhere, and you have made a difference.',
    url: 'https://www.take3.org/',
    key: 5,
  },
  {
    name: 'The Ocean Cleanup',
    image: '/static/images/seafund/ocean_cleanup.png',
    description:
      'Designing and developing cleanup systems to clean up what is already polluting our oceans and to intercept plastic on its way to the ocean via rivers. Their aim is to have removed 90% of floating ocean plastic by 2040. They plan to do this by cleaning up the legacy plastic - the plastic already floating in the ocean - and by “closing the tap” through river plastic interception.',
    url: 'https://theoceancleanup.com/',
    key: 6,
  },
];

type NFPProps = {
  name: string;
  image: string;
  description: string;
  url: string;
  key: number;
};

//---------------------------------------------

const NFP: FC<NFPProps> = ({ name, image, description, url }) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
      <Paper
        sx={{
          mt: 2,
          mb: 2,
          mx: 1.5,
          borderRadius: 2,
          bgcolor: 'background.neutral',
          boxShadow: 5,
          height: 500,
        }}
      >
        <Grid container p={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box
              component="img"
              alt={name}
              src={image}
              height={225}
              width={225}
              sx={{ objectFit: 'contain' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="grey.700">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="grey.600">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};

export const SeaFund: FC = () => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.down('md'));
  const carouselRef = useRef<Slider>();

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: matched ? 1 : 3,
    slidesToScroll: matched ? 1 : 3,
    autoplay: true,
    speed: 1000,
    pauseOnHover: true,
    ...CarouselControlsPaging2({
      sx: { mt: 3 },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <RootStyle>
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', textAlign: 'center' }}
      >
        <MotionInView variants={varFadeInUp}>
          <Typography
            component="p"
            variant="overline"
            sx={{
              mb: 2,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'grey.500' : 'grey.600',
              display: 'block',
            }}
          >
            Give back to the world
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'grey.300' : 'grey.900',
            }}
          >
            The SeaFund
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <Typography
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light' ? 'grey.300' : 'grey.700',
            }}
          >
            A portion of Orca DAO revenue is distributed to non-for-profit
            initiatives focused on restoration, cleanup, or improvement of
            marine and ocean ecosystems
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <Box sx={{ position: 'relative' }}>
            <Slider ref={carouselRef} {...settings}>
              {nfps.map((nfp) => (
                <NFP
                  key={nfp.key}
                  name={nfp.name}
                  image={nfp.image}
                  description={nfp.description}
                  url={nfp.url}
                />
              ))}
            </Slider>
            <CarouselControlsArrowsBasic2
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
};
