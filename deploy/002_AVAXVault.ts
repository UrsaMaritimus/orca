import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  //For main net: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7 WAVAX
  // For Fuji test net: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c WAVAX

  //0x5498BB86BC934c8D34FDA08E81D444153d0D06aD for AVAX/USD testnet chainlink
  //0x9450a29ef091b625e976ce66f2a5818e20791999 for AVAX/USD mainnet
  const priceSource_ = '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD';
  const symbol = 'avAVAX';
  const name = 'avAVAX';
  //WAVAX
  const token = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const stablecoin = await deployments.get('AVAI');

  const vault = await deploy('AVAXVault', {
    from: deployer,
    log: true,
    args: [priceSource_, name, symbol, token, stablecoin.address],
  });
};
export default func;
func.id = 'init';
func.tags = ['AVAXVault'];
