import clsx from 'clsx';
import * as React from 'react';
import {mq, responsiveStyles, styles} from '@/styles';
import type {ResponsiveProp} from '@/styles';
import {row} from '@/styles/layout';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {variant = 'primary', fetching, size = 'sm', className, children, ...props},
    ref
  ) {
    return (
      <button
        ref={ref}
        className={clsx(className, {fetching}, button(variant, size))}
        {...props}
      >
        {fetching ? loaderElement : children}
      </button>
    );
  }
);

export function useA11yButton<P>(
  props: P
): React.HTMLAttributes<HTMLElement> & P {
  const clickedMouse = React.useRef(false);

  return {
    ...props,
    role: 'button',
    tabIndex: 0,
    onTouchStart(e) {
      clickedMouse.current = true;
      (props as any).onTouchStart?.(e);
    },
    onMouseDown(e) {
      clickedMouse.current = true;
      (props as any).onMouseDown?.(e);
    },
    onClick(e) {
      // Only fire onClick if the keyboard was not used to initiate the click
      clickedMouse.current && (props as any).onClick?.(e);
      clickedMouse.current = false;
    },
    onKeyDown(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        (props as any).onClick?.(e);
      }
    },
  };
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Select a button variant
   * @default "primary"
   */
  variant?: ResponsiveProp<'primary' | 'secondary'>;
  size?: ResponsiveProp<'sm' | 'md' | 'lg'>;
  fetching?: boolean;
}

/**
 * Resets all vendor `<button>` styles
 */
export const resetVendorButtonStyles = {
  padding: 0,
  border: 'none',
  font: 'inherit',
  color: 'inherit',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  appearance: 'none',
  userSelect: 'none',
  cursor: 'default',
  verticalAlign: 'middle',
  MozFocusInner: {
    border: 0,
    padding: 0,
    margin: 0,
  },
} as const;

/**
 * These are variants for solid button styles you want to use most often
 * in your application.
 */
export const button = responsiveStyles({
  /**
   * The default variant adds shared styles to the button
   */
  default: ({font, transition, radius, color, shadow}) => ({
    ...resetVendorButtonStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: font.tracking.tight,
    lineHeight: font.leading.none,
    userSelect: 'none',
    fontSize: font.size.sm,
    fontWeight: 600,
    padding: `${10 / 16}rem ${16 / 16}rem`,
    borderRadius: radius.primary,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: transition.duration.fast,
    transitionTimingFunction: transition.timing.inOut,

    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: color.gray300,
      color: color.gray600,
    },

    '&.fetching': {
      cursor: 'default',
    },

    ':focus-visible': {
      boxShadow: shadow.outline,
    },
  }),

  primary: mq({
    default: ({color}) => ({
      backgroundColor: color.primary,
      color: color.white,
    }),
    hover: ({color}) => ({
      '&:hover:not([disabled]):not(.fetching)': {
        color: color.white,
        textDecoration: 'none',
        backgroundColor: color.primaryHover,
      },
      '&:active:not([disabled]):not(.fetching)': {
        color: color.white,
        textDecoration: 'none',
        backgroundColor: color.primaryActive,
      },
    }),
  }),

  secondary: mq({
    default: ({color}) => ({
      backgroundColor: color.secondary,
      color: color.white,
    }),
    hover: ({color}) => ({
      '&:hover:not([disabled]):not(.fetching)': {
        color: color.white,
        textDecoration: 'none',
        backgroundColor: color.secondaryHover,
      },
      '&:active:not([disabled]):not(.fetching)': {
        color: color.white,
        textDecoration: 'none',
        backgroundColor: color.secondaryActive,
      },
    }),
  }),

  sm: {},

  md: ({font}) => ({
    fontSize: font.size.base,
    fontWeight: 500,
    padding: `${16 / 16}rem ${22 / 16}rem`,
  }),

  lg: ({font}) => ({
    fontSize: font.size.lg,
    fontWeight: 500,
    padding: `${22 / 16}rem ${30 / 16}rem`,
  }),
});

const loaderKeyframes = styles.keyframes({
  '0%,80%,100%': {
    transform: 'scale(1)',
  },
  '40%': {
    transform: 'scale(0)',
  },
});

export const loader = styles({
  default: (t) => ({
    display: 'inline-block',
    transform: 'translateZ(0)',
    transformOrigin: 'center',
    backgroundColor: 'currentColor',
    borderRadius: t.radius.full,
    width: '0.33em',
    height: '0.33em',
    animationFillMode: 'both',
    animation: `${loaderKeyframes} 1.32s infinite ${t.transition.timing.inOut}`,
  }),
  first: {
    animationDelay: '0s',
  },
  second: (t) => ({
    animationDelay: '0.32s',
    marginLeft: t.gap.xs,
  }),
  third: (t) => ({
    animationDelay: '0.16s',
    marginLeft: t.gap.xs,
  }),
});

export const loaderElement = (
  <span className={row({height: '1em', display: 'inlineBlock'})}>
    <span className={loader('first')} />
    <span className={loader('second')} />
    <span className={loader('third')} />
  </span>
);
