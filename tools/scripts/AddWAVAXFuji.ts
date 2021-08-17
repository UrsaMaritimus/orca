import { ethers, deployments } from 'hardhat';

import {
  AVAI__factory,
  BaseVault__factory,
  WAVAXGateway__factory,
} from '../../libs/shared/contracts/src';

import contracts from '../../libs/shared/deployments/src';

// Test net constants
const minimumCollateralPercentage = 150;
const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
const symbol = 'avaxAVLT';
const name = 'avaxAVLT';
const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

const addWavaxVault = async () => {
  const accounts = await ethers.getSigners();
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);

  // Create WAVAX Vault
  await avai.addVault(
    minimumCollateralPercentage,
    priceSource_,
    symbol,
    name,
    token
  );

  // One for now, will be zero for launch
  const vaultNum = 2;
  const wavaxVault = BaseVault__factory.connect(
    await avai.vaults(vaultNum),
    accounts[0]
  );
  await wavaxVault.createVault();
  await wavaxVault.setTreasury(1);
  console.log(wavaxVault.address);
  // Set up gateway
  const gateway = WAVAXGateway__factory.connect(
    contracts.fuji.WAVAXGateway.address,
    accounts[0]
  );
  console.log(gateway.address);
  await gateway.authorizeVault(wavaxVault.address);
  await wavaxVault.setGateway(gateway.address);
};

addWavaxVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
