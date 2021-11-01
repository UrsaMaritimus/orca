import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';

  const mainUnderlying = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

  const mainShareToken = '0xf6cCf601bd024612aAF85440153c2df0524E4607';

  await deploy('YakAvaxJoeOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakAvaxJoeOracle';
func.tags = ['YakAvaxJoeOracle'];
