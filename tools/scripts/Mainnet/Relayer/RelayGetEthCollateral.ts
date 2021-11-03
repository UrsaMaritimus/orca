import {
  Currency,
  CurrencyAmount,
  JSBI,
  Pair,
  Percent,
  TokenAmount,
  Trade,
  Token,
  WAVAX,
  Router,
} from '@pangolindex/sdk';

import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';

import {
  ERC20__factory,
  WAVAXGateway__factory,
  Bank__factory,
} from '../../../../libs/shared/contracts/src';

const AVAX_BANK = '0xC029713E92383426C9b387b124C0BF6271d08b80';
const ETH_BANK = '0x4805D6563B36a02C5012c11d6e15552f50066d58';
const GATEWAY = '0x4FFFa5602112fd0C7B327A503F67f229F6D0828A';

const GetBankCollateral = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  const ethBank = Bank__factory.connect(ETH_BANK, signer);
  const ethCollat = await ethBank.vaultCollateral(1);
  await ethBank.withdrawCollateral(1, ethCollat);
};

GetBankCollateral()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
