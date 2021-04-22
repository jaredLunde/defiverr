import {responsiveStyles, mq} from '@/styles';

/**
 * This creates the default typography styles for your application.
 */
export const typography = responsiveStyles({
  default: mq({
    default: ({elevation, radius, font, color}) => ({
      color: color.text,
      textRendering: 'optimizeSpeed',

      'h1,h2,h3': {
        textRendering: 'optimizeLegibility',
        letterSpacing: font.tracking.tight,
      },
      a: {
        color: color.primary,
        textDecoration: 'none',
        textDecorationSkipInk: 'all',
        'strong,b': {
          fontWeight: 'inherit',
          color: color.teal900,
        },
        ':hover': {
          color: color.primaryHover,
        },
      },
      b: {
        fontWeight: '700',
      },
      strong: {
        fontWeight: '600',
      },
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
        boxShadow: elevation.inner,
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
