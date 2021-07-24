import { FC } from 'react';

import { Link as ScrollLink } from 'react-scroll';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Logo } from '@ursa/components/logo';

// ----------------------------------------------------------------------

const Footer: FC = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <ScrollLink to="move_top" spy={true} smooth={true}>
        <Logo sx={{ mb: 1, mx: 'auto' }} />
      </ScrollLink>

      <Typography variant="caption">
        © All rights reserved
        <br /> Made by &nbsp;
        <Link href="https://avai.finance/">Ursa DAO</Link>
      </Typography>
    </Container>
  );
};

export default Footer;
