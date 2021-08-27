import { routes } from '@orca/shared/base';
import { Box } from '@material-ui/core';
import { SvgIconStyle } from '@orca/components/svg-icon-style';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const getUSDIcon = (src: string) => (
  <Box
    component="img"
    src={`/static/icons/navbar/${src}.svg`}
    sx={{ width: 22, height: 22 }}
    color="inherit"
  />
);

const ICONS = {
  map: getIcon('ic_map'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  page: getIcon('ic_page'),
  user: getIcon('ic_user'),
  copy: getIcon('ic_copy'),
  error: getIcon('ic_error'),
  charts: getIcon('ic_charts'),
  editor: getIcon('ic_editor'),
  upload: getIcon('ic_upload'),
  animate: getIcon('ic_animate'),
  calendar: getIcon('ic_calendar'),
  elements: getIcon('ic_elements'),
  carousel: getIcon('ic_carousel'),
  language: getIcon('ic_language'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  components: getIcon('ic_components'),
  authenticator: getIcon('ic_authenticator'),
  farm: getIcon('ic_farm'),
  monitor: getIcon('ic_monitor'),
  usdc: getUSDIcon('ic_usdc'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Orca Protocol',
    items: [
      {
        title: 'Your Vaults',
        icon: ICONS.user,
        href: routes.APP.VAULTS.USER,
      },
      {
        title: 'Monitor Vaults',
        icon: ICONS.monitor,
        href: routes.APP.VAULTS.MONITOR,
      },
    ],
  },
  {
    subheader: 'Exchange',
    items: [
      { title: 'USDC Swap', icon: ICONS.usdc, href: routes.APP.EXCHANGE.USDC },
    ],
  },
  {
    subheader: 'Yield',
    items: [
      { title: 'Farming', icon: ICONS.farm, href: routes.APP.YIELD.FARM },
    ],
  },
];

export default navConfig;
