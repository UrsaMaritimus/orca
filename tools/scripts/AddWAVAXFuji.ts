import { ethers } from 'hardhat';

import {
  AVAI__factory,
  Bank__factory,
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
  console.log(contracts.fuji.AVAI.address);
  const avai = AVAI__factory.connect(contracts.fuji.AVAI.address, accounts[0]);
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
  await wavaxVault.createVault();
  await wavaxVault.setTreasury(1);
  console.log('Bank address:', wavaxVault.address);
  // Set up gateway
  const gateway = WAVAXGateway__factory.connect(
    contracts.fuji.WAVAXGateway.address,
    accounts[0]
  );
  console.log('Connected to gateway');
  await gateway.authorizeVault(wavaxVault.address);
  console.log('Authorized gateway');
  await wavaxVault.setGateway(gateway.address);
  console.log('Set new gateway on wavax vault.');
};

addWavaxVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
