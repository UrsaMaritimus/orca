import { styled } from '@mui/material/styles';

import { Card, CardHeader, Container } from '@mui/material';
import { Connect } from '@orca/components/connect';
import { Page } from '@orca/components/page';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export function Farming(props) {
  // Default return
  return (
    <Connect title={'Yield Farming'}>
      <RootStyle title={`Yield Farming | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="md">
          <Card
            sx={{
              mb: 3,
              height: 160,
              position: 'relative',
            }}
          >
            <CardHeader
              title={'Yield Farming'}
              subheader={'Coming soon to a Main Net near you!'}
            />
          </Card>
        </Container>
      </RootStyle>
    </Connect>
  );
}

export default Farming;
