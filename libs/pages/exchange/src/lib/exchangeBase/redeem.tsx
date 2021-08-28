import { useEffect, FC, useState } from 'react';
import useSwr from 'swr';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';

import { Icon } from '@iconify/react';
import infoOutline from '@iconify/icons-eva/info-outline';
import plusFill from '@iconify/icons-eva/plus-fill';

import { toast } from 'react-hot-toast';

import {
  Card,
  CardHeader,
  Box,
  Button,
  Typography,
  Stack,
  Popover,
  IconButton,
  Container,
  Grid,
} from '@material-ui/core';

import { MainTable } from '@orca/components/table';
import { useKeepSWRDataLiveAsBlocksArrive } from '@orca/hooks';
import { Bank__factory, VaultContracts } from '@orca/shared/contracts';
import { Loader } from '@orca/components/loader';
import { fShortenNumber } from '@orca/util';
import { getVaults, mintCeiling } from '@orca/shared/funcs';

export const Redeem: FC = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library;

  const [hover, setHover] = useState(null);

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  if (chainId === 43114) {
    return (
      <Card>
        <Typography variant="h1" sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
          {' '}
          Main Net not deployed yet. Please switch to Fuji.
        </Typography>
      </Card>
    );
  }

  if (typeof account === 'string') {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            title={'Under construction'}
            avatar={
              <Box
                component="img"
                src="/static/cryptos/ic_avax.svg"
                sx={{ width: 40, height: 40 }}
                color="inherit"
              />
            }
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon icon={plusFill} />}
              >
                Redeem
              </Button>
            }
          />
        </Card>
        <Card>
          <Grid container>
            <Grid item>Minting Fee</Grid>
            <Grid item>fee</Grid>
          </Grid>
        </Card>
      </Container>
    );
  }

  return (
    <Card>
      <Loader />
    </Card>
  );
};
