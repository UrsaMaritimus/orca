import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // TODO mainnet
  // Get block number
  const { timestamp } = await ethers.provider.getBlock('latest');
  const treasury = '0xd19bf8951b0db2cebaadfc9dcfbf2a73f22c42ea';
  const rate = ethers.utils.parseEther('0.00073853615');

  await deploy('OrcaStaking', {
    from: deployer,
    log: true,
    // Initial rate
    args: [timestamp + 120, rate, treasury],
  });
};
export default func;
func.id = 'Staking';
func.tags = ['Staking'];
