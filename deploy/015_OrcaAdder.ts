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
    proxy: {
      owner: owner,
      proxyContract: 'OptimizedTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [
            '0x783d6AbA0D0754a4B3E1d1D92A80CB45d8fB40c8', //pod
            '0x8b1d98a91f853218ddbb066f20b8c63e782e2430', // orca
            '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // wavax
            '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', // usdc
            '0xcb660A14A6612E0627A4516c3DCdB3838b1190e9', //seafund
            '0x10131d4f3193a59A46d3ab57D765f2604e77B4E3', // treasury
            '0x274280b26debd319c52f611b59926f8f00373907', // dev
            4000, // treasury amount
            500, // dev amount
            1500, // seafund amount
            4000, // pod amount
          ],
        },
      },
    },
  });
};
export default func;
func.id = 'OrcaAdder';
func.tags = ['OrcaAdder'];
