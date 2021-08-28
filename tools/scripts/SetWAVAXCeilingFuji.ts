import { ethers, deployments } from 'hardhat';

import { AVAI__factory, Bank__factory } from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

const adjustWavaxDebtCeiling = async () => {
  // Test net constants
  const ceiling = ethers.utils.parseEther('10000000');
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);

  // One for now, will be zero for launch
  const vaultNum = 0;
  const wavaxVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );
  await wavaxVault.setDebtCeiling(ceiling);
};

adjustWavaxDebtCeiling()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
