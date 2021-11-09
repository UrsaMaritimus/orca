import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743';

  const mainUnderlying = '0x50b7545627a5162f82a992c33b87adc75187b218';

  const mainShareToken = '0x0f7F48d4b66bF5a53d4f21fA6Ffca45f70Cef770';

  await deploy('YakAvaxBTCOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakAvaxBTCOracle';
func.tags = ['YakAvaxBTCOracle'];
