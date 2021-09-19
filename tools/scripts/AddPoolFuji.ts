import { ethers } from 'hardhat';

import {
  ORCA__factory,
  PodLeader__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

// Test net constants
const initialRewardsBalance = ethers.utils.parseEther('13406250');
const ALLOC_POINTS = '100';
const DEPOSIT_FEE = 75;

const addAVAIPool = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);

  const orca = ORCA__factory.connect(contracts.fuji.ORCA.address, accounts[0]);
  const podLeader = PodLeader__factory.connect(
    contracts.fuji.PodLeader.address,
    accounts[0]
  );

  // Prepare for sending
  const balance = await orca.balanceOf(accounts[0].address);
  console.log(`Balance of orca: ${ethers.utils.formatEther(balance)}`);
  await orca.increaseAllowance(podLeader.address, balance);
  console.log('Allowance increased');

  // Add AVAI
  await podLeader.add(
    ALLOC_POINTS,
    contracts.fuji.AVAI.address,
    false,
    DEPOSIT_FEE
  );
};

addAVAIPool()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
