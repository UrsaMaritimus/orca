//-----------------------------------------

type TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
};

export const tokenInfo: { [key: string]: TokenInfo } = {
  AVAX: {
    icon: '/static/cryptos/ic_avax.svg',
    erc20: 'wavax',
    display: 'AVAX',
  },
  AVAI: {
    icon: '/static/cryptos/ic_avai.svg',
    erc20: 'avai',
    display: 'AVAI',
  },
  ETH: {
    icon: '/static/cryptos/ic_eth.svg',
    erc20: 'weth.e',
    display: 'WETH.e',
  },
  BTC: {
    icon: '/static/cryptos/ic_wbtc.svg',
    erc20: 'wbtc.e',
    display: 'WBTC.e',
  },
};

type ERC20TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
  mainnet: { address: string };
  fuji: { address: string };
};

export const erc20Tokens: { [key: string]: ERC20TokenInfo } = {
  USDC: {
    icon: '/static/cryptos/ic_usdc.svg',
    erc20: 'usdc.e',
    display: 'USDC',
    mainnet: {
      address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    },
    fuji: {
      address: '0xC1517ac40949643188efF133E2d4d6954eb23378',
    },
  },
};

export const farmConstants = {
  avai: {
    img: '/static/farm/ic_avai.svg',
    address: '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385',
  },
  usdcAvai: {
    img: '/static/farm/ic_usdc_avai.svg',
    address: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217',
    test: '0xe28984e1ee8d431346d32bec9ec800efb643eef4',
  },
  reward: {
    img: '/static/cryptos/ic_orca.svg',
    address: '0xb3308fd93936e5efb9a1f2c6a513def68175cb5d',
  },
};

export const farms = [
  {
    name: 'AVAI',
    img: '/static/farm/ic_avai.svg',
    address: '0x41f8511b889D2e32A889DAD14a9EeD9c2c737385',
    reward: 'ORCA',
    rewardImg: '/static/cryptos/ic_orca.svg',
  },
  {
    name: 'USDC-AVAI',
    img: '/static/farm/ic_usdc_avai.svg',
    address: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217',
    reward: 'ORCA',
    rewardImg: '/static/cryptos/ic_orca.svg',
  },
];
