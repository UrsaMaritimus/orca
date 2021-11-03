import { ethers } from 'hardhat';

import { Bank__factory } from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const adjustWavaxDebtCeiling = async () => {
  // Main net constants
  const accounts = await ethers.getSigners();
  const vaultNum = 1;
  const vault = Bank__factory.connect(
    '0xC029713E92383426C9b387b124C0BF6271d08b80',
    accounts[0]
  );
  console.log('Connected to wavax vault');
  const numVaults = await vault.vaultCounts();
  let collat = 0;
  let debt = 0;

  for (let index = 1; index <= numVaults.toNumber(); index++) {
    collat += Number(
      ethers.utils.formatEther(await vault.vaultCollateral(index))
    );
  }
  console.log(collat);
};

adjustWavaxDebtCeiling()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
