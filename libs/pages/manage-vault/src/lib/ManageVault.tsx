/* eslint-disable-next-line */
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useRouter } from 'next/router';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Tab,
  Container,
} from '@material-ui/core';
import { TabList, TabPanel, TabContext } from '@material-ui/lab';

import { Page } from '@ursa/components/page';
export interface ManageVaultsProps {}

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(15),
}));

export function ManageVault(props: ManageVaultsProps) {
  const { account, library } = useWeb3React<Web3Provider>();
  const router = useRouter();
  const { vaultID } = router.query;

  if (typeof account !== 'string')
    return (
      <RootStyle title={`Vaults | ${process.env.NEXT_PUBLIC_TITLE}`}>
        <Container maxWidth="lg">Not connected.</Container>
      </RootStyle>
    );
  // Default return
  return (
    <RootStyle title={`Manage Vault | ${process.env.NEXT_PUBLIC_TITLE}`}>
      {vaultID}
    </RootStyle>
  );
}

export default ManageVault;
