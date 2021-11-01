import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0xF096872672F44d6EBA71458D74fe67F9a77a23B9';

  const mainUnderlying = '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664';

  const mainShareToken = '0xeeD4385af3C876E51CA3AB76AD2cFCa1422AC747';

  await deploy('YakUsdcJoeOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakUsdcJoeOracle';
func.tags = ['YakUsdcJoeOracle'];
