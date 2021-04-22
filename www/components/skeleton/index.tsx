import * as React from 'react';
import clsx from 'clsx';
import {Box} from '@dash-ui/react-layout';
import type {BoxProps} from '@dash-ui/react-layout';
import {styles} from '@/styles';
import forwardRefAs from 'forward-ref-as';

/**
 * A component for rendering a loading placeholder (skeleton)
 */
export const Skeleton = forwardRefAs<'div', SkeletonProps>(function Skeleton(
  {variant = 'rect', width, height, className, ...props},
  ref
) {
  return (
    <Box
      bg='blue500'
      width={variant === 'circle' ? width ?? height : width}
      height={
        variant === 'text'
          ? '1em'
          : variant === 'circle'
          ? width ?? height
          : height
      }
      radius={variant === 'circle' ? 'full' : 'primary'}
      aria-hidden
      className={clsx(skeleton(), className)}
      ref={ref}
      {...props}
    />
  );
});

const skeleton = styles.one({
  display: 'inline-block',
  verticalAlign: 'text-bottom',
  animationName: styles.keyframes({
    '0%': {
      opacity: '0.6',
    },
    '50%': {
      opacity: '1',
    },
    '100%': {
      opacity: '0.6',
    },
  }),
  animationDuration: '1.67s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
});

export interface SkeletonProps extends BoxProps {
  /**
   * Sets the skeleton variant.
   * - `text`: automatically uses a height of `1em`
   * - `rect`: for rectangles, has a `primary` border radius
   * - `circle`: adds a `max` border radius
   * @default rect
   */
  variant?: 'text' | 'circle' | 'rect';
  height?: number;
  width?: number;
}
