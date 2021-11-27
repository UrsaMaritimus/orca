import { FC } from 'react';

import { Link as ScrollLink } from 'react-scroll';

import { Link, Typography, Container } from '@mui/material';

import { Logo } from '@orca/components';

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
        <Link href="https://avai.finance/">SeaFi Labs</Link>
      </Typography>
      <Typography
        variant="subtitle2"
        fontSize={10}
        color="text.disabled"
        mt={2}
      >
        NOTICE LEGAL DISCLAIMER
        <br /> Content provided on this website and dapp are not intended to be
        financial advice, investment advice, trading advice, or any relation to
        advice. Users should never treat any of OrcaDAO's content as such. The
        OrcaDAO team provide the website as a service and is not responsible
        for, and disclaims all liability for, damages of any kind arising out of
        use, reference to, or reliance on any information contained within this
        website for the public. Information and content within this website is
        updated frequently but non-routinely, with no guarantee to be current,
        correct or complete. In case of confusion, please contact the team for
        clarification directly at support@avai.finance
      </Typography>
    </Container>
  );
};

export default Footer;
