import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const stablecoin = await deployments.get('AVAI');

  const vault = await deployments.get('AVAXVault');

  await deploy('AVAXLiquidator', {
    log: true,
    from: deployer,
    args: [stablecoin.address, vault.address],
  });
};
export default func;
func.id = 'init';
func.tags = ['AVAXVault'];
