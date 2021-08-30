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
  LANDING: {
    MEDIUM: 'https://medium.com/@SeaFi_Labs',
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
