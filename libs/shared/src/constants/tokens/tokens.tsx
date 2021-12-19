import { DeployedContracts } from '../../deployed';
import { TokenInfo } from './types';

export const ProtocolTokenInfo: { [key: string]: TokenInfo } = {
  AVAI: {
    address: {
      mainnet: DeployedContracts.main.AVAI.address.toLowerCase(),
      fuji: DeployedContracts.fuji.AVAI.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_avai.svg',
    erc20: 'avai',
    display: 'AVAI',
    symbol: 'AVAI',
    decimals: 18,
  },
  ORCA: {
    address: {
      mainnet: DeployedContracts.main.ORCA.address.toLowerCase(),
      fuji: DeployedContracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_orca.svg',
    erc20: 'orca',
    display: 'ORCA',
    symbol: 'ORCA',
    decimals: 18,
  },
  'USDC.e': {
    address: {
      mainnet: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'.toLowerCase(),
      fuji: DeployedContracts.fuji.FakeUSDC.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_usdc.svg',
    erc20: 'usdc.e',
    display: 'USDC.e',
    symbol: 'USDC.e',
    decimals: 18,
  },
  STORM: {
    address: {
      mainnet: '0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b'.toLowerCase(),
      fuji: DeployedContracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_storm.svg',
    erc20: 'storm',
    display: 'STORM',
    symbol: 'STORM',
    decimals: 18,
  },
};
