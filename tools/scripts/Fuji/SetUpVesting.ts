import { ethers } from 'hardhat';

import {
  ORCA__factory,
  VestingWallet__factory,
  AVAI__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const addInitRewards = async () => {
  // Test net constants
  const vestingAmount = ethers.utils.parseEther('15000000');

  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);

  const orca = ORCA__factory.connect(contracts.fuji.ORCA.address, accounts[0]);
  const wallet = VestingWallet__factory.connect(
    contracts.fuji.VestingWallet.address,
    accounts[0]
  );

  await orca.approve(wallet.address, await orca.totalSupply());
  console.log('Approved orca spending');

  await wallet.receiveToken(vestingAmount);
  console.log('Sent vesting tokens');
};

addInitRewards()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
