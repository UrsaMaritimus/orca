import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // avax
  const avaxPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';
  //joe
  const joePriceSource = '0x02D35d3a8aC3e1626d3eE09A78Dd87286F5E8e3a';
  // JLP
  const jlpUnderlying = '0x454e67025631c065d3cfad6d71e6892f74487a15';

  // Share token from yield yak
  const jlpShareToken = '0x450C5582DB7827ccd79440F3ec0DCc09FAd23CB3';

  await deploy('YakOracleLPBridge', {
    from: deployer,
    log: true,
    // Initial rate
    args: [avaxPriceSource, joePriceSource, jlpUnderlying, jlpShareToken],
  });
};
export default func;
func.id = 'YakAvaxJoeLPOracle';
func.tags = ['YakAvaxJoeLPOracle'];
