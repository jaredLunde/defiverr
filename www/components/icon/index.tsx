import type {DashTokens} from '@dash-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import {compoundStyles, responsiveStyles, styles} from '@/styles';
import type {ResponsiveProp} from '@/styles';
import {text} from '@/styles/text';

/**
 * A component for rendering icon styles from design tokens. Icons
 * must be a component that returns an `<svg>`.
 *
 * If using the `size` prop, your `<svg>` must not have `width` or `height`
 * properties set on it. If using the `color` prop, your `fill` and
 * `strokeColor` props must be set to `"currentColor"`.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {src, color, size = '1em', className, ...props},
  ref
) {
  return (
    <span
      ref={ref}
      className={clsx(className, icon({color, size, src}))}
      role={
        props.hasOwnProperty('role')
          ? props.role
          : props['aria-label']
          ? 'img'
          : void 0
      }
      aria-hidden={!props['aria-label']}
      {...props}
    />
  );
});

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Set a size on the icon. Sizing this way requires that your SVG has no `width`
   * or `height` properties or styles set on it.
   */
  size?: React.ReactText;
  /**
   * Set a color for the icon. Coloring requires that your SVG having `currentColor`
   * as its `fill` or `strokeColor`.
   */
  color?: ResponsiveProp<keyof DashTokens['color']>;
  /**
   * This is the SVG component you want to render as an icon
   */
  src: string;
}

export const icon = compoundStyles({
  default: styles.one({
    display: 'inline-block',
    verticalAlign: 'middle',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    maskSize: 'cover',
    backgroundColor: 'currentColor',
  }),
  src: responsiveStyles.lazy((src: string) => ({
    maskImage: `url("${src}")`,
  })),
  /**
   * A responsive style for adding color to icons
   */
  color: text.styles.color,
  /**
   * A responsive style for icon sizing
   */
  size: responsiveStyles.lazy(
    (
      value:
        | undefined
        | React.ReactText
        | [React.ReactText | undefined, React.ReactText | undefined]
    ) => {
      const initialWidth = Array.isArray(value) ? value[0] : value;
      let height = Array.isArray(value) ? value[1] : value;
      const width =
        initialWidth !== void 0 && initialWidth !== null && initialWidth !== ''
          ? initialWidth
          : height !== void 0 && height !== null && height !== ''
          ? 'auto'
          : '1em';
      height =
        height !== void 0 && height !== null && height !== ''
          ? height
          : initialWidth !== void 0 &&
            initialWidth !== null &&
            initialWidth !== ''
          ? 'auto'
          : '1em';

      return {
        width,
        height,
        contain: width !== 'auto' && height !== 'auto' ? 'strict' : 'none',
      };
    }
  ),
});
