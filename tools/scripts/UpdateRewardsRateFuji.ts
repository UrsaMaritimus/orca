import { ethers } from 'hardhat';

import {
  ORCA__factory,
  PodLeader__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

// For first two months
const REWARDS_PER_SECOND = ethers.utils.parseEther('1.96204337899543');

const addUpdateRewardsFuji = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);

  const podLeader = PodLeader__factory.connect(
    contracts.fuji.PodLeader.address,
    accounts[0]
  );
  // Update rewards
  await podLeader.setRewardsPerSecond(REWARDS_PER_SECOND);
};

addUpdateRewardsFuji()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
