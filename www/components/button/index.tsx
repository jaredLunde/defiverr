import * as React from 'react';
import clsx from 'clsx';
import forwardRefAs from 'forward-ref-as';
import {Row} from '@dash-ui/react-layout';
import {responsiveStyles, styles, mq} from '@/styles';
import type {ResponsiveProp} from '@/styles';

/**
 * An accessible component for creating button styles from variants and
 * design tokens. This is a `<button>` by default, but this can
 * be overriden with the `as` prop. Regardless of the node type, this
 * button will be accessible to screen readers.
 */
export const Button = forwardRefAs<'button', ButtonProps>(function Button(
  {
    as: As = 'button',
    variant = 'primary',
    fetching,
    className,
    children,
    ...props
  },
  ref
) {
  const buttonProps = useA11yButton(props);
  return (
    <As
      ref={ref}
      className={clsx(className, {fetching}, button(variant))}
      {...(As === 'button' ? props : buttonProps)}
    >
      {fetching ? (
        <Row align='center' gap='xs' height='1em'>
          <span className={loader('first')} />
          <span className={loader('second')} />
          <span className={loader('third')} />
        </Row>
      ) : (
        children
      )}
    </As>
  );
});

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

export interface ButtonProps {
  /**
   * Select a button variant
   * @default "primary"
   */
  variant?: ResponsiveProp<keyof typeof button.styles>;
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
  default: ({font, elevation, transition, radius, color}) => ({
    ...resetVendorButtonStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: font.leading.none,
    userSelect: 'none',
    fontSize: '0.92em',
    fontWeight: 600,
    letterSpacing: font.tracking.wide,
    padding: `${10 / 16}rem ${20 / 16}rem`,
    borderRadius: radius.primary,
    boxShadow: elevation.md,
    // The border here ensures we get the same size/positioning as
    // the outline button
    border: '1px solid transparent',
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: transition.duration.fast,
    transitionTimingFunction: transition.timing.inOut,

    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: color.gray300,
      color: color.gray600,
      boxShadow: 'none',
    },

    '&.fetching': {
      cursor: 'default',
    },

    ':focus-visible': {
      boxShadow: elevation.outline,
    },
  }),

  primary: mq({
    default: ({color}) => ({
      backgroundColor: color.primary,
      color: color.white,
    }),
    hover: ({color, elevation}) => ({
      '&:hover:not([disabled]):not(.fetching)': {
        backgroundColor: color.primaryHover,
      },
      '&:active:not([disabled]):not(.fetching)': {
        backgroundColor: color.primaryActive,
        boxShadow: elevation.xs,
      },
    }),
  }),

  secondary: mq({
    default: ({color}) => ({
      backgroundColor: color.accent,
      color: color.gray100,
    }),
    hover: ({color, elevation}) => ({
      '&:hover:not([disabled]):not(.fetching)': {
        backgroundColor: color.accentHover,
      },
      '&:active:not([disabled]):not(.fetching)': {
        backgroundColor: color.accentActive,
        boxShadow: elevation.xs,
      },
    }),
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

const loader = styles({
  default: (t) => ({
    display: 'inline-block',
    transform: 'translateZ(0)',
    transformOrigin: 'center',
    border: `${t.borderWidth.hairline} solid currentColor`,
    borderRadius: t.radius.full,
    width: '0.33em',
    height: '0.33em',
    animationFillMode: 'both',
    animation: `${loaderKeyframes} 1.32s infinite ${t.transition.timing.inOut}`,
  }),
  first: {
    animationDelay: '0s',
  },
  second: {
    animationDelay: '0.32s',
  },
  third: {
    animationDelay: '0.16s',
  },
});
