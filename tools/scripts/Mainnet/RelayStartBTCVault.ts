import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';
import {
  AVAI__factory,
  Bank__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const relayStartBTC = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  const avai = AVAI__factory.connect(contracts.main.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  const vaultNum = 2;
  const btcVault = Bank__factory.connect(await avai.banks(vaultNum), signer);
  console.log('Connected to btc vault');
  await btcVault.createVault();
};

relayStartBTC()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
