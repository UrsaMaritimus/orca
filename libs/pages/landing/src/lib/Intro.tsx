import { FC } from 'react';

import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from '@material-ui/core/styles';

import {
  Box,
  Grid,
  Card,
  Typography,
  Container,
  useMediaQuery,
} from '@material-ui/core';

import {
  varFadeInDown,
  varFadeInUp,
  MotionInView,
} from '@orca/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/icons/ic_design.svg',
    title: '1 AVAI ≈ 1 USD',
    description: 'AVAI is backed by at least 150% crypto-based collateral.',
  },
  {
    icon: '/static/icons/ic_code.svg',
    title: 'Orca DAO',
    description: 'Community controlled through the governing token POD',
  },
  {
    icon: '/static/icons/accounting.svg',
    title: 'Zero Interest Loans',
    description: 'Decentralized zero interest loans, all under your control.',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  margin: 'auto',
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main),
}));

// ----------------------------------------------------------------------

type Props = {
  className?: string;
};

const MinimalHelps: FC<Props> = ({ className }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              gutterBottom
              variant="overline"
              align="center"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              AVAI Finance
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" align="center">
              Collateral-backed stablecoin
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle
                  className={
                    (index === 0 && 'cardLeft') || (index === 1 && 'cardCenter')
                  }
                >
                  <CardIconStyle
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      ...(index === 0 && {
                        filter: (theme) => shadowIcon(theme.palette.info.main),
                      }),
                      ...(index === 1 && {
                        filter: (theme) => shadowIcon(theme.palette.error.main),
                      }),
                    }}
                  />
                  <Typography variant="h5" paragraph>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
};

export default MinimalHelps;
