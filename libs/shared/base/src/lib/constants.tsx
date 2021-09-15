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
