// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  //For main net: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7 WAVAX
  // For Fuji test net: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c WAVAX

  //0x5498BB86BC934c8D34FDA08E81D444153d0D06aD for AVAX/USD testnet chailink
  //0x9450a29ef091b625e976ce66f2a5818e20791999 for AVAX/USD mainnet
  const minimumCollateralPercentage = 150;
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  //WAVAX
  const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  const stablecoinFactory: ContractFactory = await ethers.getContractFactory(
    'AVAI'
  );

  let Stablecoin: Contract = await stablecoinFactory.deploy('AVAI');
  await Stablecoin.deployed();

  const vault: ContractFactory = await ethers.getContractFactory('AVAXVault');

  let vaultContract = await vault.deploy(
    minimumCollateralPercentage, // collateral
    priceSource_, // chainlink
    name, // name
    symbol, // symbol
    token, // token (WAVAX)
    Stablecoin.address // stablecoin address
  );
  await vaultContract.deployed();
  // The address the Contract WILL have once mined
  console.log(`Stablecoin contract: ${Stablecoin.address}`);

  console.log(`Vault contract: ${vaultContract.address}`);

  // Create treasury vault
  await vaultContract.createVault();
  await vaultContract.setTreasury(1);
  await Stablecoin.addVault(vaultContract.address);

  // Create liquidator
  const Liq: ContractFactory = await ethers.getContractFactory(
    'AVAXLiquidator'
  );
  const liq = await Liq.deploy(Stablecoin.address, vaultContract.address);
  await liq.deployed();
  console.log(`Liquidator contract: ${liq.address}`);
  await vaultContract.setStabilityPool(liq.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
