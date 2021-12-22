import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // DAI
  const daiPriceSource = '0x51D7180edA2260cc4F6e4EebB82FEF5c3c2B8300';

  const daiUnderlying = '0xd586e7f844cea2f87f50152665bcbc2c279d8d70';

  const daiShareToken = '0x9669Fe1ea0d8883661289461b90a10B71Ae400Ee';

  await deploy('YakOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [daiPriceSource, daiUnderlying, daiShareToken],
  });
};
export default func;
func.id = 'YakDaiBenQiOracle';
func.tags = ['YakDaiBenQiOracle'];
