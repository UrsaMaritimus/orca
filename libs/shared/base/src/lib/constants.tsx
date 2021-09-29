import contracts from '@orca/shared/deployments';
//-----------------------------------------

type TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
  address: {
    mainnet: string;
    fuji: string;
  };
};

export const tokenInfo: { [key: string]: TokenInfo } = {
  AVAX: {
    address: {
      mainnet: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'.toLowerCase(),
      fuji: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_avax.svg',
    erc20: 'wavax',
    display: 'AVAX',
  },
  AVAI: {
    address: {
      mainnet: contracts.main.AVAI.address.toLowerCase(),
      fuji: contracts.fuji.AVAI.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_avai.svg',
    erc20: 'avai',
    display: 'AVAI',
  },
  ETH: {
    address: {
      mainnet: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'.toLowerCase(),
      fuji: '',
    },
    icon: '/static/cryptos/ic_eth.svg',
    erc20: 'weth.e',
    display: 'WETH.e',
  },
  BTC: {
    address: {
      mainnet: '0x50b7545627a5162F82A992c33b87aDc75187B218'.toLowerCase(),
      fuji: '',
    },
    icon: '/static/cryptos/ic_wbtc.svg',
    erc20: 'wbtc.e',
    display: 'WBTC.e',
  },
  ORCA: {
    address: {
      mainnet: contracts.main.ORCA.address.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_orca.svg',
    erc20: 'orca',
    display: 'ORCA',
  },
  USDC: {
    address: {
      mainnet: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'.toLowerCase(),
      fuji: contracts.fuji.FakeUSDC.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_usdc.svg',
    erc20: 'usdc.e',
    display: 'USDC.e',
  },
  'USDC-AVAI': {
    address: {
      mainnet: '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_usdc_avai.svg',
    erc20: 'USDC-AVAI',
    display: 'USDC.e-AVAI',
  },
  'AVAI-ORCA': {
    address: {
      mainnet: '0x1a9bd67c82c0e8e47c3ad2fa772fcb9b7a831a37'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_avai_orca.svg',
    erc20: 'AVAI-ORCA',
    display: 'AVAI-ORCA',
  },
};

export const farms = [
  {
    name: 'AVAI-ORCA',
    img: tokenInfo['AVAI-ORCA'].icon,
    address: tokenInfo['AVAI-ORCA'].address.mainnet,
    reward: 'ORCA',
    rewardImg: tokenInfo['ORCA'].icon,
  },
  {
    name: 'USDC-AVAI',
    img: tokenInfo['USDC-AVAI'].icon,
    address: tokenInfo['USDC-AVAI'].address.mainnet,
    reward: 'ORCA',
    rewardImg: tokenInfo['ORCA'].icon,
  },
];
