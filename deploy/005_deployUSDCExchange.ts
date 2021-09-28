import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const avai = await deployments.get('AVAI');

  const usdc =
    network.name === 'fuji'
      ? (await deployments.get('FakeUSDC')).address
      : '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664';

  await deploy('USDCExchange', {
    from: deployer,
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: 'OptimizedTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [usdc, avai.address],
        },
      },
    },
  });
};
export default func;
func.id = 'USDCExchange';
func.tags = ['USDCExchange'];
