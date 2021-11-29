import last from 'lodash/last';
import React, { FC } from 'react';

import { Breadcrumbs, BreadcrumbsProps, Typography, Box } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

import NextLink from '../../links/NextLink';

// ----------------------------------------------------------------------

const Separator = (
  <Box
    component="span"
    sx={{
      width: 4,
      height: 4,
      borderRadius: '50%',
      bgcolor: 'text.disabled',
    }}
  />
);

function LinkItem({
  link,
}: {
  link: {
    name: string;
    href?: string;
    icon?: React.ReactElement<SvgIconProps>;
  };
}) {
  const { href, name, icon } = link;
  return (
    <NextLink
      href={href}
      key={name}
      variant="body2"
      color="textPrimary"
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        '& > div': { display: 'inherit' },
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </NextLink>
  );
}

type Props = {
  activeLast?: boolean;
  className?: string;
  links: {
    name: string;
    href?: string;
    icon?: React.ReactElement<SvgIconProps>;
  }[];
} & BreadcrumbsProps;

const MBreadcrumbs: FC<Props> = ({ links, activeLast = false, ...other }) => {
  const currentLink = last(links).name;

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ));
  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator={Separator} {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
};

export default MBreadcrumbs;
