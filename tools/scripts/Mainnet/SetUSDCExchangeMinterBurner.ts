import { ethers } from 'hardhat';

import {
  AVAI__factory,
  USDCExchange__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const addMinterBurner = async () => {
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.main.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  const exchange = USDCExchange__factory.connect(
    contracts.main.USDCExchange.address,
    accounts[0]
  );
  console.log('Connected to USDC Exchange');
  await avai.grantRole(await avai.MINTER_ROLE(), exchange.address);
  await avai.grantRole(await avai.BURNER_ROLE(), exchange.address);
  console.log('Granted roles');
};

addMinterBurner()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
