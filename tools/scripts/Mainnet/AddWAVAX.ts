import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
  WAVAXGateway__factory,
} from '../../../libs/shared/contracts/src';

import contracts from '../../../libs/shared/deployments/src';

// Main net constants
const minimumCollateralPercentage = 150;
const priceSource_ = '0x0A77230d17318075983913bC2145DB16C7366156';
const symbol = 'avaxAVLT';
const name = 'avaxAVLT';
const token = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

const addWavaxVault = async () => {
  const accounts = await ethers.getSigners();
  console.log(contracts.main.AVAI.address);
  const avai = AVAI__factory.connect(contracts.main.AVAI.address, accounts[0]);
  console.log('Connected to avai');
  // Create WAVAX Vault
  await avai.addBank(
    minimumCollateralPercentage,
    priceSource_,
    symbol,
    name,
    token
  );
  console.log('Added new WAVAX Bank');
  // One for now, will be zero for launch
  const vaultNum = 0;
  const wavaxVault = Bank__factory.connect(
    await avai.banks(vaultNum),
    accounts[0]
  );

  console.log('Bank address:', wavaxVault.address);
  // Set up gateway
  const gateway = WAVAXGateway__factory.connect(
    contracts.main.WAVAXGateway.address,
    accounts[0]
  );
  console.log('Connected to gateway');
  await gateway.authorizeVault(wavaxVault.address);
  console.log('Authorized gateway');
  await avai.setGateway(vaultNum, gateway.address);
  console.log('Set new gateway on wavax vault.');
};

addWavaxVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
