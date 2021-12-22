import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // USDT
  const usdtPriceSource = '0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a';

  const usdtUnderlying = '0xc7198437980c041c805a1edcba50c1ce5db95118';

  const usdtShareToken = '0x07B0E11D80Ccf75CB390c9Be6c27f329c119095A';

  await deploy('YakOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [usdtPriceSource, usdtUnderlying, usdtShareToken],
  });
};
export default func;
func.id = 'YakUsdtBenQiOracle';
func.tags = ['YakUsdtBenQiOracle'];
