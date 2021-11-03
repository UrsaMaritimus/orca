import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // TODO: mainnet
  await deploy('OrcaPod', {
    from: deployer,
    log: true,
    args: ['0x8B1d98A91F853218ddbb066F20b8c63E782e2430'],
  });
};
export default func;
func.id = 'OrcaPod';
func.tags = ['OrcaPod'];
