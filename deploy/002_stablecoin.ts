import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, catchUnknownSigner } = deployments;

  const { deployer } = await getNamedAccounts();

  const base = await deployments.get('Bank');

  await catchUnknownSigner(
    deploy('AVAI', {
      from: deployer,
      log: true,
      proxy: {
        owner: deployer,
        proxyContract: 'OptimizedTransparentProxy',
        execute: {
          init: {
            methodName: 'initialize',
            args: ['AVAI', base.address],
          },
        },
      },
    })
  );
};
export default func;
func.id = 'AVAI';
func.tags = ['AVAI'];
