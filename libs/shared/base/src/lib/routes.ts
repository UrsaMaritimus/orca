export const routes = {
  APP: {
    ROOT: '/',
    VAULTS: {
      USER: '/vaults',
      MONITOR: '/monitor',
    },
    EXCHANGE: {
      USDC: '/exchange/usdc',
    },
    YIELD: {
      FARM: '/yield/farming',
    },
  },
  MEDIUM: {
    INTRODUCTION:
      'https://medium.com/@OrcaDAO/introducing-orcadao-avalanches-native-stablecoin-protocol-2461a25b854d',
    SEAFUND: 'https://medium.com/@OrcaDAO/the-orcadao-seafund-dc2ee5b58a4d',
  },
  LANDING: {
    MEDIUM: 'https://medium.com/@OrcaDAO',
    TWITTER: 'https://twitter.com/OrcaDAO',
    GITHUB: 'https://github.com/UrsaMaritimus/orca',
    DOCS: 'https://docs.avai.finance/',
    DISCORD: 'https://discord.gg/JC8tAJN6',
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
