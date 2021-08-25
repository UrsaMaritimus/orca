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
