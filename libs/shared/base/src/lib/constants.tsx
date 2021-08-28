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
      address: '0xa6dd9CA47C7F6f4AADdD4c664Eb8b56AE7004c6d',
    },
  },
};
