import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const orca = await deployments.get('ORCA');

  const { timestamp } = await ethers.provider.getBlock('latest');
  const duration = 60 * 60 * 24 * 365 * 2;

  const teamPay = await deploy('TeamPayment', {
    from: deployer,
    log: true,
    args: [orca.address, [deployer], [50]],
  });

  await deploy('VestingWallet', {
    from: deployer,
    log: true,
    args: [
      orca.address,
      teamPay.address,
      timestamp, // TODO: Update for mainnet
      duration,
      true,
    ],
  });
};
export default func;
func.id = 'Vesting';
func.tags = ['Vesting'];
