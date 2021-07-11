// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const qiStablecoinFactory: ContractFactory = await ethers.getContractFactory(
    'UrsaStablecoin'
  );

  const vault: ContractFactory = await ethers.getContractFactory('VaultNFT');

  let vaultContract = await vault.deploy();

  let UrsaStablecoin: Contract = await qiStablecoinFactory.deploy(
    '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD', // testnet is 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD for AVAX/USD
    150, // Minimum collteral percentage
    'AVAI',
    'AVAI',
    vaultContract.address
  );
  // The address the Contract WILL have once mined
  console.log(UrsaStablecoin.address);
  // The transaction that was sent to the network to deploy the Contract
  console.log(UrsaStablecoin.deployTransaction.hash);
  // The contract is NOT deployed yet; we must wait until it is mined
  await UrsaStablecoin.deployed();

  await vaultContract.setAdmin(UrsaStablecoin.address);

  const firstOwner = await UrsaStablecoin.owner();

  console.log('owner', firstOwner);

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
