import { ethers, deployments } from 'hardhat';

import { AVAI__factory, Bank__factory } from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

const adjustWavaxClosingFee = async () => {
  // Test net constants
  const fee = ethers.utils.parseUnits('75', 0);
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);

  // One for now, will be zero for launch
  const vaultNum = 0;
  const wavaxVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );
  console.log(await wavaxVault.closingFee());
  await wavaxVault.setClosingFee(fee);
  console.log(await wavaxVault.closingFee());
};

adjustWavaxClosingFee()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
