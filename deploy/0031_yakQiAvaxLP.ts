import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // avax
  const avaxPriceSource = '0x0A77230d17318075983913bC2145DB16C7366156';
  // qi
  const qiPriceSource = '0x36E039e6391A5E7A7267650979fdf613f659be5D';
  // JLP
  const jlpUnderlying = '0xE530dC2095Ef5653205CF5ea79F8979a7028065c';

  // Share token from yield yak
  const jlpShareToken = '0x0835269bb6943779765937ebEF17e5dC37d68775';

  await deploy('YakOracleLPBridge', {
    from: deployer,
    log: true,
    // Initial rate
    args: [avaxPriceSource, qiPriceSource, jlpUnderlying, jlpShareToken],
  });
};
export default func;
func.id = 'YakAvaxQiLPOracle';
func.tags = ['YakAvaxQiLPOracle'];
