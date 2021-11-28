import { Link } from '@mui/material';

import { BankInfo } from '../types';

export const BankTokenInfo: { [key: string]: BankInfo } = {
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
  ETH: {
    address: {
      mainnet: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB'.toLowerCase(),
      fuji: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'.toLowerCase(), // Easier for testing, use same token
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
        that leverages WETH.e in AAVE. You will need to deposit WETH.e into the
        Yield Yak x Aave pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },

  YRTQIAVAX: {
    address: {
      mainnet: '0x8B414448de8B609e96bd63Dcf2A8aDbd5ddf7fdd'.toLowerCase(),
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
        that leverages AVAX in BenQi. You will need to deposit AVAX into the
        Yield Yak x BenQi pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },
  YRTQILINK: {
    address: {
      mainnet: '0x4084F32A91F4D8636Ca08386EFE70c6E302F1d84'.toLowerCase(),
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
        <Link
          href="https://yieldyak.com/farms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Yield Yak
        </Link>{' '}
        that leverages LINK.e in BenQi. You will need to deposit LINK.e into the
        Yield Yak x BenQi pool on their platform, which will give you a receipt
        that can be deposited here for borrowing AVAI.
      </div>
    ),
  },
};
