import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
  USDCExchange__factory,
  WAVAXGateway__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

// Test net constants
const minimumCollateralPercentage = 150;
const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
const symbol = 'avaxAVLT';
const name = 'avaxAVLT';
const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

const addMinterBurner = async () => {
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);
  console.log('Connected to avai');

  const exchange = USDCExchange__factory.connect(
    contracts.fuji.USDCExchange.address,
    accounts[0]
  );
  console.log('Connected to USDC Exchange');
  await avai.grantRole(await avai.MINTER_ROLE(), exchange.address);
  await avai.grantRole(await avai.BURNER_ROLE(), exchange.address);
  console.log('Granted roles');
};

addMinterBurner()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
