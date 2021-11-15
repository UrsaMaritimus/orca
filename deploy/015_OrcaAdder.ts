import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer, owner } = await getNamedAccounts();

  // TODO: testnet
  await deploy('OrcaAdder', {
    from: deployer,
    log: true,
    args: [
      '0x783d6aba0d0754a4b3e1d1d92a80cb45d8fb40c8', // pod
      '0x8b1d98a91f853218ddbb066f20b8c63e782e2430', // orca
      '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // wavax
      '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', // usdc
      '0xcb660A14A6612E0627A4516c3DCdB3838b1190e9', //seafund
      '0x10131d4f3193a59A46d3ab57D765f2604e77B4E3', // treasury
      '0x274280b26debd319c52f611b59926f8f00373907', // dev
      '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5', // orcaLP
      '0xbd918Ed441767fe7924e99F6a0E0B568ac1970D9', // usdc LP
    ],
  });
};
export default func;
func.id = 'OrcaAdder';
func.tags = ['OrcaAdder'];
