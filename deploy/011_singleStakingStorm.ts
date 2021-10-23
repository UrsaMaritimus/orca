import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const storm = '0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b';
  const amount = 24500;
  // Get block number
  const { timestamp } = await ethers.provider.getBlock('latest');

  await deploy('StormSingleStaking', {
    from: deployer,
    log: true,
    // Initial rate
    args: [storm, timestamp + 7200, ethers.utils.parseEther('0.009176573')],
  });
};
export default func;
func.id = 'Storm';
func.tags = ['Storm'];
