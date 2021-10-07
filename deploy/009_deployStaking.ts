import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const treasury = '0xd19bf8951b0db2cebaadfc9dcfbf2a73f22c42ea';

  await deploy('OrcaStaking', {
    from: deployer,
    log: true,
    // Initial rate
    args: [1633646456, ethers.utils.parseEther('0.00028935185'), treasury],
  });
};
export default func;
func.id = 'OrcaStaking';
func.tags = ['OrcaStaking'];
