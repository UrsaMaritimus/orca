/* eslint-disable-next-line */
import { useState, FC } from 'react';
import useSwr from 'swr';

import { useRouter } from 'next/router';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Button,
  Container,
} from '@material-ui/core';
import { TabList, TabPanel, TabContext } from '@material-ui/lab';

import { tokenInfo } from './constants';

//-----------------------------------------

type BorrowsProps = {
  isOwner: boolean;
  vaultID: number;
  vaultInfo: {
    collateral: number;
    debt: number;
    LTV: number;
    maxLTV: number;
    borrowingPower: number;
    tokenPrice: number;
  };
};

export const Borrows: FC<BorrowsProps> = ({ vaultInfo, isOwner, vaultID }) => {
  return (
    <Card
      sx={{
        pt: 2,
        pb: 2,
        mr: 1,
        ml: 1,
        mt: 2,
        mb: 3,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography variant="h4">Borrows in</Typography>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Box
                component="img"
                src={tokenInfo['AVAI'].icon}
                sx={{
                  width: 30,

                  height: 30,
                }}
                color="inherit"
              />
              <Typography variant="h6" sx={{ color: 'grey.500' }}>
                AVAI
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Card>
  );
};

export default Borrows;
