import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const storm = (await deployments.get('ORCA')).address;
  const amount = 24500;
  // Get block number
  const { timestamp } = await ethers.provider.getBlock('latest');

  await deploy('StormSingleStaking', {
    from: deployer,
    log: true,
    // Initial rate
    args: [storm, timestamp + 600, ethers.utils.parseEther('0.01')],
  });
};
export default func;
func.id = 'Storm';
func.tags = ['Storm'];
