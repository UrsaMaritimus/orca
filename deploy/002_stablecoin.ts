import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const base = await deployments.get('BaseVault');
  console.log(base.address);
  await deploy('AVAI', {
    from: deployer,
    args: ['AVAI', base.address],
    log: true,
  });
};
export default func;
func.id = 'AVAI';
func.tags = ['AVAI'];
