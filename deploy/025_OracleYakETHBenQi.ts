import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x976B3D034E162d8bD72D6b9C989d545b839003b0';

  const mainUnderlying = '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab';

  const mainShareToken = '0x7D2d076000611E44740d636843384412399e31b9';

  await deploy('YakBenqiETHOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakBenqiETHOracle';
func.tags = ['YakBenqiETHOracle'];
