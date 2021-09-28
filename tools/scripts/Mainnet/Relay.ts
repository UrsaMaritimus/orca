import { ethers } from 'hardhat';
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from 'defender-relay-client/lib/ethers';
import {
  AVAI__factory,
  Bank__factory,
  USDCExchange__factory,
  PodLeader__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const test = async () => {
  const accounts = await ethers.getSigners();
  const credentials = {
    apiKey: process.env.RELAY_API,
    apiSecret: process.env.RELAY_PRIVATE,
  };

  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider);

  const avai = AVAI__factory.connect(contracts.main.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  const vaultNum = 0;
  const wavaxVault = Bank__factory.connect(await avai.banks(vaultNum), signer);
  console.log('Connected to wavax vault');
  //await wavaxVault.createVault();

  await avai.setTreasury(vaultNum, 1);
  console.log('made treasury and set');
  const exchange = USDCExchange__factory.connect(
    contracts.main.USDCExchange.address,
    accounts[0]
  );
  await exchange.changeTreasury(await signer.getAddress());
  console.log('set exchange treasury');

  const podLeader = PodLeader__factory.connect(
    contracts.main.PodLeader.address,
    accounts[0]
  );

  await podLeader.setTreasury(await signer.getAddress());
  console.log('set podleader treasury');
};

test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
