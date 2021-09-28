import { ethers } from 'hardhat';

import { AVAI__factory } from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const adjustWavaxDebtCeiling = async () => {
  // Main net constants
  const ceiling = ethers.utils.parseEther('10000000');
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.main.AVAI.address, accounts[0]);

  const vaultNum = 0;
  await avai.setDebtCeiling(vaultNum, ceiling);
};

adjustWavaxDebtCeiling()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
