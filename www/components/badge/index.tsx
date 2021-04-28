import clsx from 'clsx';
import * as React from 'react';
import {styles} from '@/styles';

/**
 *
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({variant = 'info', className, ...props}, ref) {
    return (
      <span ref={ref} className={clsx(className, badge(variant))} {...props} />
    );
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Select a badge variant
   * @default "info"
   */
  variant?: keyof typeof badge.styles;
}

export const badge = styles({
  default: ({font, color}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10 / 12 + 'em',
    fontWeight: 600,
    letterSpacing: font.tracking.wide,
    lineHeight: font.leading.none,
    height: font.leading.loose,
    textDecoration: 'none',
    borderRadius: '0.25em',
    verticalAlign: 'text-bottom',
    backgroundColor: color.gray200,
  }),

  light: ({color}) => ({
    color: color.indigo700,
    backgroundColor: color.blue100,
  }),

  dark: ({color}) => ({
    color: color.white,
    backgroundColor: color.indigo800,
  }),

  info: ({color}) => ({
    color: color.blue900,
    backgroundColor: color.indigo200,
  }),

  success: ({color}) => ({
    color: color.teal900,
    backgroundColor: color.teal200,
  }),

  danger: ({color}) => ({
    color: color.red900,
    backgroundColor: color.red200,
  }),

  warning: ({color}) => ({
    color: color.orange900,
    backgroundColor: color.orange200,
  }),
});
