export const routes = {
  APP: {
    ROOT: '/',
    VAULTS: {
      USER: '/vaults',
      MONITOR: '/monitor',
    },
    YIELD: {
      FARM: '/farming',
    },
  },
  LANDING: {
    MEDIUM: '',
    TWITTER: 'https://twitter.com/0Maritimus',
    GITHUB: 'https://github.com/UrsaMaritimus/orca',
    DOCS: 'https://docs.avai.finance/',
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
