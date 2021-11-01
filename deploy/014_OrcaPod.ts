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
    // Initial rate
    args: ['0xb3308FD93936e5EFb9A1F2C6a513DEf68175Cb5d'],
  });
};
export default func;
func.id = 'OrcaPod';
func.tags = ['OrcaPod'];
