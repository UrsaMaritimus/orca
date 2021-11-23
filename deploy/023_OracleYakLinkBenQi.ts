import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x49ccd9ca821EfEab2b98c60dC60F518E765EDe9a';

  const mainUnderlying = '0x5947bb275c521040051d82396192181b413227a3';

  const mainShareToken = '0x4084F32A91F4D8636Ca08386EFE70c6E302F1d84';

  await deploy('YakLinkBenqiOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakLinkBenqiOracle';
func.tags = ['YakLinkBenqiOracle'];
