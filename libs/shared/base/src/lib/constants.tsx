import contracts from '@orca/shared/deployments';

import { NextLink } from '@orca/components/links';
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
  tooltip: boolean;
  tooltipText?: React.ReactElement;
  yaktoken: boolean;
  yakBase?: string;
  underlyingDecimals?: number;
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
  },
  YRTAAVEAVAX: {
    address: {
      mainnet: '0x957Ca4a4aA7CDc866cf430bb140753F04e273bC0'.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_avax_aave.png',
    erc20: 'yrtAaveAvax',
    display: 'Yak x Aave: AVAX',
    url: 'YRTAAVEAVAX',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'AVAX',
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that leverages AVAX in AAVE. You will need to deposit AVAX into the
        Yield Yak x Aave pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },
  YRTJOE: {
    address: {
      mainnet: '0x3a91a592a06390ca7884c4d9dd4cba2b4b7f36d1'.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_joe.png',
    erc20: 'yrtJoe',
    display: 'Yak x JOE',
    url: 'YRTJOE',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'JOE',
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that farms JOE through xJOE and Trader Joe's xJOE farm. You will need to
        deposit AVAX into the Yield Yak x Joe pool on their platform, which will
        give you a receipt that can be deposited here for borrowing AVAI.
      </div>
    ),
  },

  YRTAAVEBTC: {
    address: {
      mainnet: '0x0f7F48d4b66bF5a53d4f21fA6Ffca45f70Cef770'.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_btc_aave.png',
    erc20: 'yrtAaveBtc',
    display: 'Yak x Aave: WBTC.e',
    url: 'YRTAAVEBTC',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'WBTC.e',
    underlyingDecimals: 8,
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that leverages WBTC.e in AAVE. You will need to deposit WBTC.e into the
        Yield Yak x Aave pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },
  YRTAAVEETH: {
    address: {
      mainnet: '0xb634a71a54d3382Ff6896eB22244B4a4e54C0a82'.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_eth_aave.png',
    erc20: 'yrtAaveEth',
    display: 'Yak x Aave: WETH.e',
    url: 'YRTAAVEETH',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'WETH.e',
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that leverages WETH.e in AAVE. You will need to deposit WETH.e into the
        Yield Yak x Aave pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },

  YRTQIAVAX: {
    address: {
      mainnet: ''.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_avax_benqi.png',
    erc20: 'yrtQiAvax',
    display: 'Yak x BenQi: AVAX',
    url: 'YRTQIAVAX',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'AVAX',
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that leverages AVAX in BenQi. You will need to deposit AVAX into the
        Yield Yak x BenQi pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },
  YRTQILINK: {
    address: {
      mainnet: ''.toLowerCase(),
      fuji: '0xE1296Be9B7d9C69Ef65B054BD8cE79E326EFA0d7'.toLowerCase(),
    },
    icon: '/static/cryptos/ic_yak_link_benqi.png',
    erc20: 'yrtQiLink',
    display: 'Yak x BenQi: LINK.e',
    url: 'YRTQILINK',
    symbol: 'YRT',
    decimals: 18,
    collateral: true,
    yaktoken: true,
    yakBase: 'LINK.e',
    tooltip: true,
    tooltipText: (
      <div>
        This is a single asset autocompounding pool through{' '}
        <NextLink
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </NextLink>{' '}
        that leverages LINK.e in BenQi. You will need to deposit LINK.e into the
        Yield Yak x BenQi pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    tooltip: false,
    yaktoken: false,
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
    collateral: false,
    tooltip: false,
    yaktoken: false,
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
  {
    name: 'xORCA',
    img: tokenInfo['XORCA'].icon,
    address: tokenInfo['XORCA'].address.mainnet,
    reward: 'ORCA',
    rewardImg: tokenInfo['ORCA'].icon,
  },
];

export const baseCollateral = ['AVAX', 'WBTC.e', 'WETH.e'];
export const ibtknCollateral = [
  'Yak x Aave: AVAX',
  'Yak x Aave: WBTC.e',
  'Yak x Aave: WETH.e',
  'Yak x JOE',
  'Yak x BenQi: LINK.e',
  'Yak x BenQi: AVAX',
];
