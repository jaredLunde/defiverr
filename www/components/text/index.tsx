import type {DashTokens, StyleMap} from '@dash-ui/styles';
import {compoundStyles, responsiveStyles, tokens} from '@/styles';

export const text = compoundStyles({
  variant: responsiveStyles({
    /**
     * These are variants for text styles you want to use most often
     * in your application.
     */
    default: {},
    heading: ({font, color}) => ({
      fontSize: font.size['4xl'],
      lineHeight: font.leading.tight,
      letterSpacing: font.tracking.tight,
      fontWeight: 600,
      color: color.gray800,
    }),
    subheading: ({font, color}) => ({
      fontSize: font.size['2xl'],
      lineHeight: font.leading.tight,
      letterSpacing: font.tracking.tight,
      fontWeight: 500,
      color: color.gray800,
    }),
    caption: ({font, color}) => ({
      fontSize: font.size.xs,
      lineHeight: font.leading.snug,
      letterSpacing: font.tracking.normal,
      fontWeight: 300,
      color: color.gray600,
    }),
    action: ({font}) => ({
      fontSize: font.size.xs,
      lineHeight: font.leading.snug,
      letterSpacing: font.tracking.tight,
      textTransform: 'uppercase',
      textRendering: 'optimizeLegibility',
      fontWeight: 600,
    }),
  }),
  weight: responsiveStyles({
    100: {
      fontWeight: 100,
    },
    200: {
      fontWeight: 200,
    },
    300: {
      fontWeight: 300,
    },
    400: {
      fontWeight: 400,
    },
    500: {
      fontWeight: 500,
    },
    600: {
      fontWeight: 600,
    },
    700: {
      fontWeight: 700,
    },
    800: {
      fontWeight: 800,
    },
    900: {
      fontWeight: 900,
    },
  }),
  align: responsiveStyles({
    left: {
      textAlign: 'left',
    },
    center: {
      textAlign: 'center',
    },
    right: {
      textAlign: 'right',
    },
  }),
  /**
   * Creates `line-height` styles for all of your `font.leading`
   * design tokens.
   */
  leading: responsiveStyles(
    (Object.keys(
      tokens.font.leading
    ) as (keyof DashTokens['font']['leading'])[]).reduce<
      Partial<StyleMap<keyof DashTokens['font']['leading']>>
    >((obj, key) => {
      obj[key] = ({font}) => ({
        lineHeight: font.leading[key],
      });

      return obj;
    }, {})
  ),

  /**
   * Creates `letter-spacing` styles for all of your `font.tracking`
   * design tokens.
   */
  tracking: responsiveStyles(
    (Object.keys(
      tokens.font.tracking
    ) as (keyof DashTokens['font']['tracking'])[]).reduce<
      Partial<StyleMap<keyof DashTokens['font']['tracking']>>
    >((obj, key) => {
      obj[key] = ({font}) => ({
        letterSpacing: font.tracking[key],
      });

      return obj;
    }, {})
  ),

  /**
   * Creates font `color` styles for all of your `color`
   * design tokens.
   */
  color: responsiveStyles(
    (Object.keys(tokens.color) as (keyof DashTokens['color'])[]).reduce<
      Partial<StyleMap<keyof DashTokens['color']>>
    >((obj, key) => {
      obj[key] = ({color}) =>
        ({
          color: color[key],
        } as any);

      return obj;
    }, {})
  ),

  /**
   * Creates `font-family` styles for all of your `font.family`
   * design tokens.
   */
  font: responsiveStyles(
    (Object.keys(
      tokens.font.family
    ) as (keyof DashTokens['font']['family'])[]).reduce<
      Partial<StyleMap<keyof DashTokens['font']['family']>>
    >((obj, key) => {
      obj[key] = ({font}) =>
        ({
          fontFamily: font.family[key],
        } as any);

      return obj;
    }, {})
  ),

  /**
   * Creates `font-size` styles for all of your `font.size`
   * design tokens.
   */
  size: responsiveStyles(
    (Object.keys(
      tokens.font.size
    ) as (keyof DashTokens['font']['size'])[]).reduce<
      Partial<StyleMap<keyof DashTokens['font']['size']>>
    >((obj, key) => {
      obj[key] = ({font}) => ({
        fontSize: font.size[key],
      });

      return obj;
    }, {})
  ),
});
