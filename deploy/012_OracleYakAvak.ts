import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const fujiPriceSource = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const mainPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';

  const fujiUnderlying = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';
  const mainUnderlying = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';

  const fujiShareToken = '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7';
  const mainShareToken = '0x957Ca4a4aA7CDc866cf430bb140753F04e273bC0';

  await deploy('YakAvaxAAVEOracle', {
    from: deployer,
    log: true,
    // Initial rate
    args: [mainPriceSource, mainUnderlying, mainShareToken],
  });
};
export default func;
func.id = 'YakAvaxAAVEOracle';
func.tags = ['YakAvaxAAVEOracle'];
