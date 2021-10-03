import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const addWavaxVault = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  // One for now, will be zero for launch
  const vaultNum = 3;
  const ethVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );

  console.log('Bank address:', ethVault.address);
  await avai.setTreasury(vaultNum, 1);
};

addWavaxVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
