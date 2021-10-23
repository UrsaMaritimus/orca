export const routes = {
  APP: {
    CRYPTOS: {
      AVAI: 'https://app.pangolin.exchange/#/swap?outputCurrency=0x346A59146b9b4a77100D369a3d18E8007A9F46a6',
      ORCA: 'https://app.pangolin.exchange/#/swap?outputCurrency=0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
      USDC: 'https://app.pangolin.exchange/#/swap?outputCurrency=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    },
    ROOT: '/',
    VAULTS: {
      USER: '/vaults',
      MONITOR: '/monitor',
      CREATE: '/vaults/create',
    },
    EXCHANGE: {
      USDC: '/exchange/usdc',
    },
    YIELD: {
      FARM: '/yield/farming',
      STAKE: '/yield/staking',
    },
  },
  MEDIUM: {
    INTRODUCTION:
      'https://medium.com/@OrcaDAO/introducing-orcadao-avalanches-native-stablecoin-protocol-2461a25b854d',
    SEAFUND: 'https://medium.com/@OrcaDAO/the-orcadao-seafund-dc2ee5b58a4d',
    LAUNCH: 'https://medium.com/@OrcaDAO/orcadao-protocol-is-live-2276b31eb398',
    LYDIA:
      'https://medium.com/@OrcaDAO/lydia-orcadao-partnership-announcement-cdeab9cf4668',
    AVAWARE:
      'https://medium.com/@OrcaDAO/avaware-orcadao-partnership-b2d8620744cd',
  },
  LANDING: {
    MEDIUM: 'https://medium.com/@OrcaDAO',
    TWITTER: 'https://twitter.com/OrcaDAO',
    GITHUB: 'https://github.com/UrsaMaritimus/orca',
    DOCS: 'https://docs.avai.finance/',
    DISCORD: 'https://discord.gg/KZHbxZvCsU',
    SITE:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4200/vaults'
        : 'https://app.avai.finance/vaults',
  },
  DOCS: 'https://docs.avai.finance/',
  API: {
    VAULT: {
      CREATE: '/api/createVault',
    },
  },
};
