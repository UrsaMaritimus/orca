import { ethers } from 'hardhat';

import { OracleBridge__factory } from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

const oracleBridgeTest = async () => {
  const accounts = await ethers.getSigners();
  const avax = OracleBridge__factory.connect(
    contracts.main.YakAvaxJoeOracle.address,
    accounts[0]
  );
  console.log((await avax.latestRoundData())[1]);

  const usdc = OracleBridge__factory.connect(
    contracts.main.YakUsdcJoeOracle.address,
    accounts[0]
  );
  console.log((await usdc.latestRoundData())[1]);
};

oracleBridgeTest()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
