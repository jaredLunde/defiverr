import clsx from 'clsx';
import * as React from 'react';
import {compoundStyles, responsiveStyles, styles} from '@/styles';
import type {ResponsiveProp} from '@/styles';

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  function Avatar({src, defaultSrc, size = 'sm', className, ...props}, ref) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <img
        ref={ref}
        src={src || defaultSrc}
        className={clsx(className, avatar({size}))}
        aria-hidden={!props['aria-label']}
        {...props}
      />
    );
  }
);

const avatar = compoundStyles({
  default: styles.one((t) => ({
    display: 'flex',
    objectFit: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    borderRadius: '0.333em',
  })),
  size: responsiveStyles.lazy((value: number | string) => {
    if (['xs', 'sm', 'md', 'lg', 'xl'].includes(String(value))) {
      return {
        xs: {
          width: 16,
          height: 16,
        },
        sm: {
          width: 24,
          height: 24,
        },
        md: {
          width: 32,
          height: 32,
        },
        lg: {
          width: 72,
          height: 72,
        },
        xl: {
          width: 144,
          height: 144,
        },
      }[value] as {width: number; height: number};
    }

    return {width: value, height: value};
  }),
});

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  defaultSrc?: string;
  size?: ResponsiveProp<number | (('xs' | 'sm' | 'md' | 'lg' | 'xl') & string)>;
}
