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
const WBTC_BANK = '0x1eA60d781376C06693dFB21d7e5951cAEc13F7E4';
const GATEWAY = '0x4FFFa5602112fd0C7B327A503F67f229F6D0828A';

const Transfer = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);
  const bank = Bank__factory.connect(WBTC_BANK, signer);

  await bank.transferVault(1, '0xd22B0D27B6D7E96191890d21E7Dc924B934A4E35');
};

Transfer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
