import { experimentalStyled as styled } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Page } from '@ursa/components/page';

import Welcome from './Welcome';

// ----------------------------------------------------------------------
const RootStyle = styled(Page)({});

// ----------------------------------------------------------------------

function DashboardAppView() {
  return (
    <RootStyle title={`Dashboard | ${process.env.NEXT_PUBLIC_TITLE}`}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Welcome />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

export default DashboardAppView;