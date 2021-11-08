import contracts from '@orca/shared/deployments';

//-----------------------------------------

export type TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
  decimals: number;
  symbol: string;
  collateral: boolean;
  url?: string;
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
    url: 'AVAX',
    display: 'AVAX',
    symbol: 'WAVAX',
    decimals: 18,
    collateral: true,
  },
  AVAI: {
    address: {
      mainnet: contracts.main.AVAI.address.toLowerCase(),
      fuji: contracts.fuji.AVAI.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_avai.svg',
    erc20: 'avai',
    display: 'AVAI',
    symbol: 'AVAI',
    decimals: 18,
    collateral: false,
  },
  ETH: {
    address: {
      mainnet: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(), // Easier for testing, use same token
    },
    icon: '/static/cryptos/ic_eth.svg',
    erc20: 'weth',
    url: 'ETH',
    display: 'WETH.e',
    symbol: 'WETH.e',
    decimals: 18,
    collateral: true,
  },
  BTC: {
    address: {
      mainnet: '0x50b7545627a5162F82A992c33b87aDc75187B218'.toLowerCase(),
      fuji: '0x659Db915FeA8C6a67c383E335b0c0e733050ba9E'.toLowerCase(), // Easier for testing, use same token,
    },
    icon: '/static/cryptos/ic_wbtc.svg',
    erc20: 'wbtc',
    url: 'BTC',
    display: 'WBTC.e',
    symbol: 'WBTC.e',
    decimals: 8,
    collateral: true,
  },
  ORCA: {
    address: {
      mainnet: contracts.main.ORCA.address.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_orca.svg',
    erc20: 'orca',
    display: 'ORCA',
    symbol: 'ORCA',
    decimals: 18,
    collateral: false,
  },
  USDC: {
    address: {
      mainnet: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'.toLowerCase(),
      fuji: contracts.fuji.FakeUSDC.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_usdc.svg',
    erc20: 'usdc.e',
    display: 'USDC.e',
    symbol: 'USDC.e',
    decimals: 18,
    collateral: false,
  },
  STORM: {
    address: {
      mainnet: '0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b'.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_storm.svg',
    erc20: 'storm',
    display: 'STORM',
    symbol: 'STORM',
    decimals: 18,
    collateral: false,
  },
  YRTAAVEAVAX: {
    address: {
      mainnet: '0x957Ca4a4aA7CDc866cf430bb140753F04e273bC0'.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_avax_aave.png',
    erc20: 'yrtAaveAvax',
    display: 'Yak AAVE AVAX',
    url: 'YRTAAVEAVAX',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
  },
  YRTJOEAVAX: {
    address: {
      mainnet: ''.toLowerCase(),
      fuji: ''.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_avax_joe.png',
    erc20: 'yrtJoeAvax',
    display: 'Yak Joe AVAX',
    url: 'YRTJOEAVAX',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
  },
  YRTJOEUSDC: {
    address: {
      mainnet: ''.toLowerCase(),
      fuji: ''.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_usdc_joe.png',
    erc20: 'yrtJoeUsdc',
    display: 'Yak Joe USDC.e',
    url: 'YRTJOEUSDC',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
  },
  'USDC-AVAI': {
    address: {
      mainnet: '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_usdc_avai.svg',
    erc20: 'USDC-AVAI',
    display: 'USDC.e-AVAI',
    symbol: 'USDC.e-AVAI',
    decimals: 18,
    collateral: false,
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
    collateral: false,
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
    collateral: false,
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
  {
    name: 'AVAX-ORCA',
    img: tokenInfo['AVAX-ORCA'].icon,
    address: tokenInfo['AVAX-ORCA'].address.mainnet,
    reward: 'ORCA',
    rewardImg: tokenInfo['ORCA'].icon,
  },
];

export const baseCollateral = ['AVAX', 'WBTC.e', 'WETH.e'];
export const ibtknCollateral = ['Yak AAVE AVAX'];
