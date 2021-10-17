import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('FakeBTC', {
    from: deployer,
    log: true,
  });
};
export default func;
func.id = 'btc';
func.tags = ['FakeBTC'];
func.skip = async (env) => (await env.network.name) === 'mainnet';
