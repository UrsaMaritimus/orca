import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('TimelockController', {
    from: deployer,
    log: true,
    // Initial rate
    args: [
      300,
      ['0x4FB25469d273225e2B777d80e27754776ecBcEE5'],
      [
        '0x6aB5a513a2AaDe2F5C834403e033C8EB7E594B04',
        '0x9F8A5B35f5508071cf2304A670EAB0803F3737aa',
      ],
    ],
  });
};
export default func;
func.id = 'Timelock';
func.tags = ['Timelock'];
