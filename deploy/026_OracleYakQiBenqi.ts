import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x36E039e6391A5E7A7267650979fdf613f659be5D';

  const mainUnderlying = '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5';

  const mainShareToken = '0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7';

  await deploy('YakQiBenqiOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakQiBenqiOracle';
func.tags = ['YakQiBenqiOracle'];
