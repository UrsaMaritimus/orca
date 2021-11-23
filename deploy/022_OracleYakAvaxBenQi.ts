import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mainPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';

  const mainUnderlying = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

  const mainShareToken = '0x8B414448de8B609e96bd63Dcf2A8aDbd5ddf7fdd';

  await deploy('YakAvaxBenQiOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakAvaxBenQiOracle';
func.tags = ['YakAvaxBenQiOracle'];
