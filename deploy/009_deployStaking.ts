import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const treasury = '0x08eaea50d8f5d423f6904246c7b5f05f9bdb3957';

  await deploy('OrcaStaking', {
    from: deployer,
    log: true,
    // Initial rate
    args: [1633719600, ethers.utils.parseEther('0.00028935185'), treasury],
  });
};
export default func;
func.id = 'OrcaStaking';
func.tags = ['OrcaStaking'];
