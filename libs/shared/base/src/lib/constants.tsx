import contracts from '@orca/shared/deployments';
//-----------------------------------------

type TokenInfo = {
  icon: string;
  erc20: string;
  display: string;
  decimals: number;
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
    decimals: 18,
  },
  AVAI: {
    address: {
      mainnet: contracts.main.AVAI.address.toLowerCase(),
      fuji: contracts.fuji.AVAI.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_avai.svg',
    erc20: 'avai',
    display: 'AVAI',
    decimals: 18,
  },
  ETH: {
    address: {
      mainnet: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(), // Easier for testing, use same token
    },
    icon: '/static/cryptos/ic_eth.svg',
    erc20: 'weth',
    display: 'WETH.e',
    decimals: 18,
  },
  BTC: {
    address: {
      mainnet: '0x50b7545627a5162F82A992c33b87aDc75187B218'.toLowerCase(),
      fuji: '0x659Db915FeA8C6a67c383E335b0c0e733050ba9E'.toLowerCase(), // Easier for testing, use same token,
    },
    icon: '/static/cryptos/ic_wbtc.svg',
    erc20: 'wbtc',
    display: 'WBTC.e',
    decimals: 8,
  },
  ORCA: {
    address: {
      mainnet: contracts.main.ORCA.address.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_orca.svg',
    erc20: 'orca',
    display: 'ORCA',
    decimals: 18,
  },
  USDC: {
    address: {
      mainnet: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'.toLowerCase(),
      fuji: contracts.fuji.FakeUSDC.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_usdc.svg',
    erc20: 'usdc.e',
    display: 'USDC.e',
    decimals: 18,
  },
  STORM: {
    address: {
      mainnet: '0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b'.toLowerCase(),
      fuji: contracts.fuji.ORCA.address.toLowerCase(),
    },
    icon: '/static/cryptos/ic_storm.svg',
    erc20: 'storm',
    display: 'STORM',
    decimals: 18,
  },
  'USDC-AVAI': {
    address: {
      mainnet: '0xeD7a2B4054757Cfdb632Af15Ad528624F0fFf3B0'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_usdc_avai.svg',
    erc20: 'USDC-AVAI',
    display: 'USDC.e-AVAI',
    decimals: 18,
  },
  'AVAI-ORCA': {
    address: {
      mainnet: '0x1a9bd67c82c0e8e47c3ad2fa772fcb9b7a831a37'.toLowerCase(),
      fuji: '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'.toLowerCase(),
    },
    icon: '/static/farm/ic_avai_orca.svg',
    erc20: 'AVAI-ORCA',
    display: 'AVAI-ORCA',
    decimals: 18,
  },
  'AVAX-ORCA': {
    address: {
      mainnet: '0x73e6CB72a79dEa7ed75EF5eD6f8cFf86C9128eF5'.toLowerCase(),
      fuji: '0x12C97f42bc55Ee0aC369A3ED683179114a9Edd75'.toLowerCase(),
    },
    icon: '/static/farm/ic_avax_orca.svg',
    erc20: 'AVAX-ORCA',
    display: 'AVAI-ORCA',
    decimals: 18,
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
