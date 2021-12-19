import { FarmInfo } from '../types';
import { ProtocolTokenInfo } from '../tokens';

export const FarmTokenInfo: { [key: string]: FarmInfo } = {
  'USDC-AVAI': {
    address: {
      mainnet: '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_usdc_avai.svg',
    erc20: 'USDC.e-AVAI',
    display: 'USDC.e-AVAI',
    symbol: 'USDC.e-AVAI',
    decimals: 18,
    reward: 'ORCA',
    rewardImg: ProtocolTokenInfo['ORCA'].icon,
    active: true,
  },
  'AVAI-ORCA': {
    address: {
      mainnet: '0x1a9bd67c82c0e8e47c3ad2fa772fcb9b7a831a37'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_avai_orca.svg',
    erc20: 'AVAI-ORCA',
    display: 'AVAI-ORCA',
    symbol: 'AVAI-ORCA',
    decimals: 18,
    reward: 'ORCA',
    rewardImg: ProtocolTokenInfo['ORCA'].icon,
    active: false,
  },
  'AVAX-ORCA': {
    address: {
      mainnet: '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5'.toLowerCase(),
      fuji: '0x12C97f42bc55Ee0aC369A3ED683179114a9Edd75'.toLowerCase(),
    },
    icon: '/static/farm/ic_avax_orca.svg',
    erc20: 'AVAX-ORCA',
    display: 'AVAX-ORCA',
    symbol: 'AVAX-ORCA',
    decimals: 18,
    reward: 'ORCA',
    rewardImg: ProtocolTokenInfo['ORCA'].icon,
    active: true,
  },
  XORCA: {
    address: {
      mainnet: '0x783d6AbA0D0754a4B3E1d1D92A80CB45d8fB40c8'.toLowerCase(),
      fuji: '0x69fA005CEe59C3BBd657A38B67E32388910653B4'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_xOrca.svg',
    erc20: 'xorca',
    display: 'xORCA',
    symbol: 'xORCA',
    decimals: 18,
    reward: 'ORCA',
    rewardImg: ProtocolTokenInfo['ORCA'].icon,
    active: true,
  },
};
