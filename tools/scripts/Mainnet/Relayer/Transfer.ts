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

const Transfer = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  const avaiOrcaLP = ERC20__factory.connect(
    '0x1A9Bd67c82C0e8E47C3ad2FA772FCb9B7A831A37',
    signer
  );
  await avaiOrcaLP.transfer(
    '0x9F8A5B35f5508071cf2304A670EAB0803F3737aa',
    await avaiOrcaLP.balanceOf(await signer.getAddress())
  );

  const avaxOrcaLP = ERC20__factory.connect(
    '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5',
    signer
  );
  await avaxOrcaLP.transfer(
    '0x9F8A5B35f5508071cf2304A670EAB0803F3737aa',
    await avaxOrcaLP.balanceOf(await signer.getAddress())
  );
};

Transfer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
