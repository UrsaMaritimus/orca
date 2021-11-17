import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x02D35d3a8aC3e1626d3eE09A78Dd87286F5E8e3a';

  const mainUnderlying = '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd';

  const mainShareToken = '0x3a91a592a06390ca7884c4d9dd4cba2b4b7f36d1';

  await deploy('YakJoeOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakJoeOracle';
func.tags = ['YakJoeOracle'];
