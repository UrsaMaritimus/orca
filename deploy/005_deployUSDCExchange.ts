import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const avai = await deployments.get('AVAI');
  const usdc = await deployments.get('FakeUSDC');

  await deploy('USDCExchange', {
    from: deployer,
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: 'OptimizedTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [usdc.address, avai.address],
        },
      },
    },
  });
};
export default func;
func.id = 'USDCExchange';
func.tags = ['USDCExchange'];
