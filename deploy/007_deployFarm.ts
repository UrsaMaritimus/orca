import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const orca = await deployments.get('ORCA');

  const { timestamp } = await ethers.provider.getBlock('latest');

  await deploy('PodLeader', {
    from: deployer,
    log: true,
    args: [
      orca.address,
      timestamp + 10,
      ethers.utils.parseEther('1'),
      deployer,
    ],
  });
};
export default func;
func.id = 'PodLeader';
func.tags = ['PodLeader'];
