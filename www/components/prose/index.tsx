import * as React from 'react';
import {Box} from '@dash-ui/react-layout';
import type {BoxProps} from '@dash-ui/react-layout';
import forwardRefAs from 'forward-ref-as';
import clsx from 'clsx';
import {styles, responsiveStyles} from '@/styles';
import type {ResponsiveProp} from '@/styles';
import {typography, em} from '@/components/typography';
/**
 * A component for long form writing where you want the default
 * typography styles to have precendent and you do not want to
 * manage spacing on your own, e.g. Markdown.
 */
export const Prose = forwardRefAs<'article', ProseProps>(function Prose(
  {variant = 'sm', className, ...props},
  ref
) {
  return (
    <Box
      as='article'
      ref={ref as any}
      className={clsx(className, prose(variant))}
      {...props}
    />
  );
});

export interface ProseProps extends BoxProps {
  /**
   * Select a prose variant
   * @default "sm"
   */
  variant?: ResponsiveProp<keyof typeof prose.styles>;
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

function css(...args: Parameters<typeof proseSpacing>) {
  return typography.css(...args) + proseSpacing.css(...args);
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
