import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x976B3D034E162d8bD72D6b9C989d545b839003b0';

  const mainUnderlying = '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab';

  const mainShareToken = '0xb634a71a54d3382Ff6896eB22244B4a4e54C0a82';

  await deploy('YakAvaxETHOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakAvaxETHOracle';
func.tags = ['YakAvaxETHOracle'];
