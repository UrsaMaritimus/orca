export const routes = {
  HOME: {
    ROOT: '/',
  },
  AUTH: {
    LOGIN_PAGE: '/api/auth/login',
    LOGOUT_PAGE: '/auth/logout',
    SIGN_UP_PAGE: '/api/auth/register',
    SEND_VERIFICATION: '/auth/verify',
    RESET_PASSWORD: '/auth/reset-password',
  },
  APP: {
    ROOT: '/app',
    USER: { PROFILE: '/app/user/profile', ACCOUNT: '/app/user/account' },
    TRADING: {
      CHARTS: '/app/trading/charts',
      BOT: '/app/trading/bot',
    },
  },
  DOCS: 'https://docs.avai.finance/',

  API: {
    UPLOAD_AVATAR: '/api/uploadAvatar',
  },
};
