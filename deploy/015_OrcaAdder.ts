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
            '0x69fA005CEe59C3BBd657A38B67E32388910653B4', //pod
            '0xb3308FD93936e5EFb9A1F2C6a513DEf68175Cb5d', // orca
            '0xd00ae08403B9bbb9124bB305C09058E32C39A48c', // wavax
            '0xC1517ac40949643188efF133E2d4d6954eb23378', // usdc
            '0xC3D6CfB63fd93A4Ea277EB66922D12E8EE7CEdC6', //seafund
            '0xC3D6CfB63fd93A4Ea277EB66922D12E8EE7CEdC6', // treasury
            '0xC3D6CfB63fd93A4Ea277EB66922D12E8EE7CEdC6', // dev
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
