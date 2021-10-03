import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
  WAVAXGateway__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

// Test net constants
const minimumCollateralPercentage = 150;
const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
const symbol = 'avaxAVLT';
const name = 'avaxAVLT';
const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

const test = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.fuji.AVAI.address);
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  // One for now, will be zero for launch
  const vaultNum = 3;
  const wavaxVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );

  console.log('Bank address:', wavaxVault.address);
  console.log(await wavaxVault.minimumCollateralPercentage());
};

test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
