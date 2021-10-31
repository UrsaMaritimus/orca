import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('SnapshotBridge', {
    from: deployer,
    log: true,
    // Initial rate
    args: [
      '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb',
      '0x111E1E97435b57467E79d4930acc4B7EB3d478ad',
      '0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
    ],
  });
};
export default func;
func.id = 'SnapshotBridge';
func.tags = ['SnapshotBridge'];
