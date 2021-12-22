import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // USDC
  const usdcPriceSource = '0xF096872672F44d6EBA71458D74fe67F9a77a23B9';

  const usdcUnderlying = '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664';

  const usdcShareToken = '0x0eaC97A78a93B75549D49145dF41DbE9CD520874';

  await deploy('YakOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [usdcPriceSource, usdcUnderlying, usdcShareToken],
  });
};
export default func;
func.id = 'YakUsdcBenQiOracle';
func.tags = ['YakUsdcBenQiOracle'];
