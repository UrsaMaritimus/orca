// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const stablecoinFactory: ContractFactory = await ethers.getContractFactory(
    'AVAI'
  );

  let UrsaStablecoin: Contract = await stablecoinFactory.deploy('AVAI');
  await UrsaStablecoin.deployed();

  const vault: ContractFactory = await ethers.getContractFactory('AVAXVault');

  //For main net: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7 WAVAX
  // For Fuji test net: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c WAVAX

  //0x5498BB86BC934c8D34FDA08E81D444153d0D06aD for AVAX/USD testnet chailink
  //0x9450a29ef091b625e976ce66f2a5818e20791999 for AVAX/USD mainnet
  let vaultContract = await vault.deploy(
    150, // collateral
    '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD', // chainlink
    'avAVAX', // name
    'avAVAX', // symbol
    '0xd00ae08403B9bbb9124bB305C09058E32C39A48c', // token (WAVAX)
    UrsaStablecoin.address // stablecoin address
  );
  await vaultContract.deployed();
  // The address the Contract WILL have once mined
  console.log(`Stablecoin contract: ${UrsaStablecoin.address}`);

  console.log(`Vault contract: ${vaultContract.address}`);

  // Test net AVAI = 0x596Ae031C7c2Df05AD7EfFF9b8eBA63F2707B6bB
  // Testnet AVTV = 0x2eb7bA47C1777bBBE6Cb9AAdB8EDA4345E758102
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });