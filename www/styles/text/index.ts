import type {DashTokens, StyleMap} from '@dash-ui/styles';
import {compoundStyles, mq, responsiveStyles, styles, tokens} from '@/styles';

export const text = compoundStyles({
  variant: responsiveStyles({
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

/**
 * This creates the default typography styles for your application.
 */
export const typography = responsiveStyles({
  default: mq({
    default: ({font, color}) => ({
      color: color.text,
      textRendering: 'optimizeSpeed',

      'h1,h2,h3': {
        textRendering: 'optimizeLegibility',
        letterSpacing: font.tracking.tight,
      },
      'h1,h2,h3,h4,h5,h6': {
        fontWeight: 'inherit',
      },
      a: {
        color: color.primary,
        textDecoration: 'none',
        textDecorationSkipInk: 'all',

        'strong,b': {
          fontWeight: 700,
        },

        ':hover': {
          cursor: 'pointer',
          color: color.primaryHover,
        },
      },
      b: {
        fontWeight: '700',
      },
      strong: {
        fontWeight: '600',
      },
    }),
    retina: {
      'h1,h2,h3,h4,h5,h6': {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'coolGrayscale',
      },
    },
  }),
  sm: {
    fontSize: rem(14),
    lineHeight: round(24 / 14),
  },
});

/**
 * Rounds units to a fixed number (7)
 * @param num The number to round
 */
export function round(num: number) {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
}
/**
 * Converts `px` to `rem` units
 *
 * @param px A number in `px` to convert to `rem`
 */
export function rem(px: number) {
  return `${round(px / 16)}rem`;
}

/**
 * Converts `px` to `em` units based on a base number.
 *
 * @param px A number in `px` to convert to `em`
 * @param base The base number that the resulting `em` is calculated relative to
 */
export function em(px: number, base: number) {
  return `${round(px / base)}em`;
}

/**
 * Responsive styles for adding spacing to prose
 */
const proseSpacing = responsiveStyles({
  default: {
    fontSize: '1em',
    width: '100%',
    maxWidth: '65ch',
    table: {
      marginTop: em(32, 16),
      marginBottom: em(32, 16),
    },
  },

  sm: {
    p: {
      marginTop: em(16, 14),
      marginBottom: em(16, 14),
    },
    blockquote: {
      marginTop: em(24, 18),
      marginBottom: em(24, 18),
    },
    h1: {
      marginTop: '0',
      marginBottom: em(24, 30),
    },
    h2: {
      marginTop: em(32, 20),
      marginBottom: em(16, 20),
    },
    h3: {
      marginTop: em(28, 18),
      marginBottom: em(8, 18),
    },
    h4: {
      marginTop: em(20, 14),
      marginBottom: em(8, 14),
    },
    img: {
      marginTop: em(24, 14),
      marginBottom: em(24, 14),
    },
    video: {
      marginTop: em(24, 14),
      marginBottom: em(24, 14),
    },
    figure: {
      marginTop: em(24, 14),
      marginBottom: em(24, 14),
    },
    'figure > *': {
      marginTop: '0',
      marginBottom: '0',
    },
    'figure figcaption': {
      marginTop: em(8, 12),
    },
    pre: {
      marginTop: em(20, 12),
      marginBottom: em(20, 12),
    },
    ol: {
      marginTop: em(16, 14),
      marginBottom: em(16, 14),
    },
    ul: {
      marginTop: em(16, 14),
      marginBottom: em(16, 14),
    },
    li: {
      marginTop: em(4, 14),
      marginBottom: em(4, 14),
    },
    '> ul > li p': {
      marginTop: em(8, 14),
      marginBottom: em(8, 14),
    },
    '> ul > li > *:first-child': {
      marginTop: em(16, 14),
    },
    '> ul > li > *:last-child': {
      marginBottom: em(16, 14),
    },
    '> ol > li > *:first-child': {
      marginTop: em(16, 14),
    },
    '> ol > li > *:last-child': {
      marginBottom: em(16, 14),
    },
    'ul ul, ul ol, ol ul, ol ol': {
      marginTop: em(8, 14),
      marginBottom: em(8, 14),
    },
    hr: {
      marginTop: em(40, 14),
      marginBottom: em(40, 14),
    },
    'hr + *': {
      marginTop: '0',
    },
    'h1 + *': {
      marginTop: '0',
    },
    'h2 + *': {
      marginTop: '0',
    },
    'h3 + *': {
      marginTop: '0',
    },
    'h4 + *': {
      marginTop: '0',
    },
    '> :first-child': {
      marginTop: '0',
    },
    '> :last-child': {
      marginBottom: '0',
    },
  },
});

const proseStyles = responsiveStyles({
  default: ({shadow, radius, color, font}) => ({
    ol: {
      counterReset: 'list-counter',
    },
    'ol > li': {
      position: 'relative',
      counterIncrement: 'list-counter',
    },
    'ol > li::before': {
      content: 'counter(list-counter) "."',
      position: 'absolute',
      fontWeight: '400',
      color: color.coolGray600,
    },
    'ul > li': {
      position: 'relative',
    },
    'ul > li::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: color.coolGray400,
      top: `calc(50% - 0.125em)`,
      borderRadius: '50%',
    },
    hr: {
      height: 2,
      backgroundColor: color.coolGray300,
      borderWidth: '0',
      borderRadius: radius.full,
    },
    blockquote: {
      fontWeight: '500',
      fontStyle: 'italic',
      color: color.coolGray800,
      borderWidth: '0 0 0 0.25rem',
      borderLeftColor: color.coolGray300,
      borderStyle: 'solid',
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    'blockquote p:first-of-type::before': {
      content: 'open-quote',
    },
    'blockquote p:last-of-type::after': {
      content: 'close-quote',
    },
    h1: {
      fontWeight: '500',
      border: 0,
    },
    h2: {
      fontWeight: '500',
    },
    h3: {
      fontWeight: '500',
    },
    h4: {
      fontWeight: '600',
    },
    code: {
      fontFamily: font.family.mono,
      color: color.indigo700,
      backgroundColor: color.blue100,
      borderRadius: radius.primary,
      padding: '0.125em 0.25em',
      fontWeight: '400',
    },
    pre: {
      fontFamily: font.family.mono,
      color: color.blue900,
      backgroundColor: color.coolGray200,
      boxShadow: shadow.inner,
      overflowX: 'auto',
    },
    'pre code': {
      backgroundColor: 'transparent',
      borderWidth: '0',
      borderRadius: '0',
      padding: '0',
      fontWeight: '400',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
    },
    'pre code::before': {
      content: '""',
    },
    table: {
      width: '100%',
      tableLayout: 'auto',
      textAlign: 'left',
      borderCollapse: 'collapse',
    },
    thead: {
      fontWeight: '700',
    },
    'thead th': {
      textTransform: 'uppercase',
      fontSize: '0.85em',
      letterSpacing: font.tracking.wide,
      verticalAlign: 'bottom',
    },
    'thead th, tbody tr td': {
      borderTop: `1px solid ${color.coolGray300}`,
      borderBottom: `1px solid ${color.coolGray300}`,
    },
    'tbody td': {
      verticalAlign: 'top',
    },
    'ol > li:before': {
      left: '0',
    },
    'thead th:first-child': {
      paddingLeft: '0',
    },
    'thead th:last-child': {
      paddingRight: '0',
    },
    'tbody td:first-child': {
      paddingLeft: '0',
    },
    'tbody td:last-child': {
      paddingRight: '0',
    },
  }),
  sm: {
    blockquote: {
      paddingLeft: em(20, 18),
    },
    h1: {
      fontSize: em(34, 14),
      lineHeight: round(40 / 30),
    },
    h2: {
      fontSize: em(24, 14),
      lineHeight: round(32 / 20),
    },
    h3: {
      fontSize: em(18, 14),
      lineHeight: round(28 / 18),
    },
    h4: {
      lineHeight: round(20 / 14),
    },
    'figure figcaption': {
      fontSize: em(12, 14),
      lineHeight: round(16 / 12),
    },
    code: {
      fontSize: em(12, 14),
    },
    'h2 code': {
      fontSize: em(18, 20),
    },
    'h3 code': {
      fontSize: em(16, 18),
    },
    pre: {
      fontSize: em(14, 16),
      lineHeight: round(20 / 12),
      borderRadius: rem(4),
      paddingTop: em(8, 12),
      paddingRight: em(12, 12),
      paddingBottom: em(8, 12),
      paddingLeft: em(12, 12),
    },
    'ol > li': {
      paddingLeft: em(22, 14),
    },
    'ol > li:before': {
      left: '0',
    },
    'ul > li': {
      paddingLeft: em(22, 14),
    },
    'ul > li::before': {
      height: em(5, 14),
      width: em(5, 14),
      left: em(3, 14),
    },
    table: {
      fontSize: em(12, 14),
      lineHeight: round(18 / 12),
    },
    'thead th': {
      padding: em(12, 12),
    },
    'tbody td': {
      paddingTop: em(8, 12),
      paddingRight: em(12, 12),
      paddingBottom: em(8, 12),
      paddingLeft: em(12, 12),
    },
  },
});

function css(...args: Parameters<typeof proseSpacing>) {
  return (
    typography.css(...args) +
    proseSpacing.css(...args) +
    proseStyles.css(...args)
  );
}

/**
 * A responsive style instance that creates typography and prose spacing
 * styles for the selected variant.
 */
export const prose = Object.assign(
  function prose(...args: Parameters<typeof proseSpacing>) {
    return styles.cls(css(...args));
  },
  {
    css,
    styles: proseSpacing.styles,
  }
);
