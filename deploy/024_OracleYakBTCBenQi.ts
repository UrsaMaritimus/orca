import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743';

  const mainUnderlying = '0x50b7545627a5162f82a992c33b87adc75187b218';

  const mainShareToken = '0x330cC45c8f60FEF7F9D271a7512542B3d201A48D';

  await deploy('YakBenqiBTCOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakBenqiBTCOracle';
func.tags = ['YakBenqiBTCOracle'];
