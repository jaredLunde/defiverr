/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import NextLink from 'next/link';
import type {LinkProps as NextLinkProps} from 'next/link';
import * as React from 'react';
import {mq, styles} from '@/styles';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      href,
      locale,
      prefetch,
      replace,
      scroll,
      shallow,
      variant = 'primary',
      className,
      ...props
    },
    ref
  ) {
    return (
      <NextLink
        href={href}
        locale={locale}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <a ref={ref} className={clsx(className, link(variant))} {...props} />
      </NextLink>
    );
  }
);

const link = styles({
  default: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  primary: mq({
    default: ({color}) => ({
      color: color.primary,
    }),
    hover: ({color}) => ({
      ':hover': {
        color: color.primaryHover,
      },
    }),
  }),
  secondary: mq({
    default: ({color}) => ({
      color: color.blueGray600,
    }),
    hover: ({color}) => ({
      ':hover': {
        color: color.primary,
      },
    }),
  }),
});

export interface LinkProps
  extends Omit<NextLinkProps, 'passHref' | 'as'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: 'primary' | 'secondary';
}
