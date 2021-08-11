import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  // For Mainnet: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
  // For Fuji Testnet: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c
  await deploy('WAVAXGateway', {
    from: deployer,
    log: true,
    args: ['0xd00ae08403B9bbb9124bB305C09058E32C39A48c'],
  });
};
export default func;
func.id = 'gateway';
func.tags = ['WAVAXGateway'];
