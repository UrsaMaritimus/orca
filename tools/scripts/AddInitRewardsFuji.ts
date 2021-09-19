import { ethers } from 'hardhat';

import {
  ORCA__factory,
  PodLeader__factory,
  AVAI__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

const addInitRewards = async () => {
  // Test net constants
  const initialRewardsBalance = ethers.utils.parseEther('20625000');

  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);

  const orca = ORCA__factory.connect(contracts.fuji.ORCA.address, accounts[0]);
  const podLeader = PodLeader__factory.connect(
    contracts.fuji.PodLeader.address,
    accounts[0]
  );

  // Prepare for adding rewards
  const balanceOrca = await orca.balanceOf(accounts[0].address);
  console.log(`Balance of orca: ${ethers.utils.formatEther(balanceOrca)}`);
  await orca.increaseAllowance(podLeader.address, balanceOrca);
  console.log('Allowance increased');
  await podLeader.addRewardsBalance(initialRewardsBalance);
};

addInitRewards()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
