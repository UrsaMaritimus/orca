import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const orca = await deployments.get('ORCA');

  await deploy('PodLeader', {
    from: deployer,
    log: true,
    // Initial rate
    args: [
      orca.address,
      1633046400,
      ethers.utils.parseEther('1.96204337899543'),
      deployer,
    ],
  });
};
export default func;
func.id = 'PodLeader';
func.tags = ['PodLeader'];
