import dashMq from '@dash-ui/mq';
import {DashProvider} from '@dash-ui/react';
import responsive from '@dash-ui/responsive';
import type {
  Responsive,
  ResponsiveLazy,
  ResponsiveOne,
  ResponsiveStyle,
} from '@dash-ui/responsive';
import {createStyles} from '@dash-ui/styles';
import type {DashTokens, Style, StylesLazy, StylesOne} from '@dash-ui/styles';

/**
 * These are the media queries you're using throughout your app.
 * These media queries will be available in media query props and
 * through the `mq()` helper below.
 */
export const mediaQueries = {
  min: 'only screen and (min-width: 0)',
  // 560px
  sm: 'only screen and (min-width: 35em)',
  // 768px
  md: 'only screen and (min-width: 48em)',
  // 1024px
  lg: 'only screen and (min-width: 64em)',
  // 1280px
  xl: 'only screen and (min-width: 80em)',
  // High DPI devices
  retina: [
    `(-webkit-min-device-pixel-ratio: 2)`,
    `(min-resolution: 192dpi)`,
  ].join(', '),
  // Hover-enabled devices
  hover: '(hover: hover)',
} as const;

type AppMediaQueries = typeof mediaQueries;

/**
 * A helper for adding media queries to Dash `styles`, `styles.one`,
 * `styles.cls`, etc. without having to type `@media blah blah` every
 * time.
 *
 * See: https://github.com/dash-ui/mq
 */
export const mq = dashMq<DashTokens, keyof AppMediaQueries>(mediaQueries);

//
// Design tokens
// Mostly courtesy of: https://tailwindcss.com
const colorSystem = {
  current: 'currentColor',

  black: '#000',
  white: '#fff',

  rose50: '#fff1f2',
  rose100: '#ffe4e6',
  rose200: '#fecdd3',
  rose300: '#fda4af',
  rose400: '#fb7185',
  rose500: '#f43f5e',
  rose600: '#e11d48',
  rose700: '#be123c',
  rose800: '#9f1239',
  rose900: '#881337',

  pink50: '#fdf2f8',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink400: '#f472b6',
  pink500: '#ec4899',
  pink600: '#db2777',
  pink700: '#be185d',
  pink800: '#9d174d',
  pink900: '#831843',

  fuchsia50: '#fdf4ff',
  fuchsia100: '#fae8ff',
  fuchsia200: '#f5d0fe',
  fuchsia300: '#f0abfc',
  fuchsia400: '#e879f9',
  fuchsia500: '#d946ef',
  fuchsia600: '#c026d3',
  fuchsia700: '#a21caf',
  fuchsia800: '#86198f',
  fuchsia900: '#701a75',

  purple50: '#faf5ff',
  purple100: '#f3e8ff',
  purple200: '#e9d5ff',
  purple300: '#d8b4fe',
  purple400: '#c084fc',
  purple500: '#a855f7',
  purple600: '#9333ea',
  purple700: '#7e22ce',
  purple800: '#6b21a8',
  purple900: '#581c87',

  violet50: '#f5f3ff',
  violet100: '#ede9fe',
  violet200: '#ddd6fe',
  violet300: '#c4b5fd',
  violet400: '#a78bfa',
  violet500: '#8b5cf6',
  violet600: '#7c3aed',
  violet700: '#6d28d9',
  violet800: '#5b21b6',
  violet900: '#4c1d95',

  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  indigo200: '#c7d2fe',
  indigo300: '#a5b4fc',
  indigo400: '#818cf8',
  indigo500: '#6366f1',
  indigo600: '#4f46e5',
  indigo700: '#4338ca',
  indigo800: '#3730a3',
  indigo900: '#312e81',

  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',

  lightBlue50: '#f0f9ff',
  lightBlue100: '#e0f2fe',
  lightBlue200: '#bae6fd',
  lightBlue300: '#7dd3fc',
  lightBlue400: '#38bdf8',
  lightBlue500: '#0ea5e9',
  lightBlue600: '#0284c7',
  lightBlue700: '#0369a1',
  lightBlue800: '#075985',
  lightBlue900: '#0c4a6e',

  cyan50: '#ecfeff',
  cyan100: '#cffafe',
  cyan200: '#a5f3fc',
  cyan300: '#67e8f9',
  cyan400: '#22d3ee',
  cyan500: '#06b6d4',
  cyan600: '#0891b2',
  cyan700: '#0e7490',
  cyan800: '#155e75',
  cyan900: '#164e63',

  teal50: '#f0fdfa',
  teal100: '#ccfbf1',
  teal200: '#99f6e4',
  teal300: '#5eead4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  teal600: '#0d9488',
  teal700: '#0f766e',
  teal800: '#115e59',
  teal900: '#134e4a',

  emerald50: '#ecfdf5',
  emerald100: '#d1fae5',
  emerald200: '#a7f3d0',
  emerald300: '#6ee7b7',
  emerald400: '#34d399',
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald800: '#065f46',
  emerald900: '#064e3b',

  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',

  lime50: '#f7fee7',
  lime100: '#ecfccb',
  lime200: '#d9f99d',
  lime300: '#bef264',
  lime400: '#a3e635',
  lime500: '#84cc16',
  lime600: '#65a30d',
  lime700: '#4d7c0f',
  lime800: '#3f6212',
  lime900: '#365314',

  yellow50: '#fefce8',
  yellow100: '#fef9c3',
  yellow200: '#fef08a',
  yellow300: '#fde047',
  yellow400: '#facc15',
  yellow500: '#eab308',
  yellow600: '#ca8a04',
  yellow700: '#a16207',
  yellow800: '#854d0e',
  yellow900: '#713f12',

  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber200: '#fde68a',
  amber300: '#fcd34d',
  amber400: '#fbbf24',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber700: '#b45309',
  amber800: '#92400e',
  amber900: '#78350f',

  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange600: '#ea580c',
  orange700: '#c2410c',
  orange800: '#9a3412',
  orange900: '#7c2d12',

  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',

  warmGray50: '#fafaf9',
  warmGray100: '#f5f5f4',
  warmGray200: '#e7e5e4',
  warmGray300: '#d6d3d1',
  warmGray400: '#a8a29e',
  warmGray500: '#78716c',
  warmGray600: '#57534e',
  warmGray700: '#44403c',
  warmGray800: '#292524',
  warmGray900: '#1c1917',

  trueGray50: '#fafafa',
  trueGray100: '#f5f5f5',
  trueGray200: '#e5e5e5',
  trueGray300: '#d4d4d4',
  trueGray400: '#a3a3a3',
  trueGray500: '#737373',
  trueGray600: '#525252',
  trueGray700: '#404040',
  trueGray800: '#262626',
  trueGray900: '#171717',

  gray50: '#fafafa',
  gray100: '#f4f4f5',
  gray200: '#e4e4e7',
  gray300: '#d4d4d8',
  gray400: '#a1a1aa',
  gray500: '#71717a',
  gray600: '#52525b',
  gray700: '#3f3f46',
  gray800: '#27272a',
  gray900: '#18181b',

  coolGray50: '#f9fafb',
  coolGray100: '#f3f4f6',
  coolGray200: '#e5e7eb',
  coolGray300: '#d1d5db',
  coolGray400: '#9ca3af',
  coolGray500: '#6b7280',
  coolGray600: '#4b5563',
  coolGray700: '#374151',
  coolGray800: '#1f2937',
  coolGray900: '#111827',

  blueGray50: '#f8fafc',
  blueGray100: '#f1f5f9',
  blueGray200: '#e2e8f0',
  blueGray300: '#cbd5e1',
  blueGray400: '#94a3b8',
  blueGray500: '#64748b',
  blueGray600: '#475569',
  blueGray700: '#334155',
  blueGray800: '#1e293b',
  blueGray900: '#0f172a',
};

export const tokens = {
  font: {
    family: {
      brand: [`Caveat`, `Inter`].map((s) => `"${s}"`).join(','),
      sans: [
        `Inter`,
        `system-ui`,
        `-apple-system`,
        `BlinkMacSystemFont`,
        `Segoe UI`,
        `Roboto`,
        `Helvetica Neue`,
        `Noto Sans`,
        `sans-serif`,
        `Apple Color Emoji`,
        `Segoe UI Emoji`,
        `Segoe UI Symbol`,
        `Noto Color Emoji`,
      ]
        .map((s) => `"${s}"`)
        .join(','),
      serif: ['Taviraj', 'Times New Roman', 'Times', 'serif']
        .map((s) => `"${s}"`)
        .join(','),
      mono: [
        'Oxygen Mono',
        'Dank Mono',
        'Fira Code',
        'Hack',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ]
        .map((s) => `"${s}"`)
        .join(','),
    },

    size: {
      xs: `0.75rem`,
      sm: `0.875rem`,
      base: `1rem`,
      lg: `1.125rem`,
      xl: `1.25rem`,
      '2xl': `1.5rem`,
      '3xl': `1.875rem`,
      '4xl': `2.25rem`,
      '5xl': `3rem`,
      '6xl': `4rem`,
    },

    leading: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      '3': '0.75em',
      '4': '1em',
      '5': '1.25em',
      '6': '1.5em',
      '7': '1.75em',
      '8': '2em',
      '9': '2.25em',
      '10': '2.5em',
    },

    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  radius: {
    none: '0',
    primary: '0.5rem',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: 10000 / 16 + 'rem',
  },

  shadow: {
    none: 'none',
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    primary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 3px 3px rgba(66, 153, 225, 0.5)',
  },

  pad: {
    none: '0',
    xs: 4 / 16 + 'rem',
    sm: 8 / 16 + 'rem',
    md: 16 / 16 + 'rem',
    lg: 32 / 16 + 'rem',
    xl: 64 / 16 + 'rem',
    '2xl': 128 / 16 + 'rem',
    '3xl': 256 / 16 + 'rem',
  },

  gap: {
    none: '0',
    auto: 'auto',
    '2xs': 1 / 16 + 'rem',
    xs: 2 / 16 + 'rem',
    sm: 4 / 16 + 'rem',
    md: 8 / 16 + 'rem',
    lg: 16 / 16 + 'rem',
    xl: 32 / 16 + 'rem',
    '2xl': 64 / 16 + 'rem',
    '3xl': 128 / 16 + 'rem',
  },

  transition: {
    duration: {
      faster: '75ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },

  zIndex: {
    min: 0,
    lower: 1,
    low: 10,
    medium: 100,
    high: 1000,
    higher: 10000,
    max: 2147483647,
  },

  borderWidth: {
    none: 0,
    // Hairline borders
    hairline:
      (typeof window === 'undefined'
        ? 1
        : 'devicePixelRatio' in window && devicePixelRatio >= 2
        ? 0.5
        : 1) + 'px',
  },

  color: {
    ...colorSystem,
    translucentLight: 'rgba(245, 245, 252, 0.8)',
    translucentDark: 'rgba(40, 40, 48, 0.15)',
    translucentContrast: 'rgba(40, 40, 48, 0.15)',
    bodyBg: colorSystem.white,

    text: colorSystem.blueGray900,
    textAccent: colorSystem.blueGray600,
    textAccentLight: colorSystem.blueGray400,

    primary: colorSystem.indigo700,
    primaryHover: colorSystem.indigo800,
    primaryActive: colorSystem.indigo900,

    secondary:
      'hsl(224.7457627118644, 54.128440366972484%, 18.372549019607842%)',
    secondaryHover:
      'hsl(224.7457627118644, 54.128440366972484%, 28.372549019607842%)',
    secondaryActive:
      'hsl(224.7457627118644, 54.128440366972484%, 21.372549019607842%)',

    accent: 'hsl(252, 58%, 92%)',
    accentHover: 'hsl(212, 34%, 82%)',
    accentActive: 'hsl(212, 34%, 84%)',
  },
};

export const themes = {
  // paper
  default: {
    vh: '100vh' as string,
    ...tokens,
  },
};

/**
 * A `styles()` instance that is configured to use your design tokens
 * and themes.
 */
export const styles = createStyles({
  themes,
  tokens: tokens as DashTokens,
});

/**
 * Set up the context providers used by Dash
 */
export function StylesProvider({children}: {children: React.ReactNode}) {
  return <DashProvider styles={styles}>{children}</DashProvider>;
}

/**
 * A function for adding responsive props/styles to components
 */
export const responsiveStyles = responsive(styles, mediaQueries);
export type ResponsiveProp<Variant> =
  | Variant
  | Responsive<Variant, AppMediaQueries>;

/**
 * A function for creating compound/multi-variant styles
 */
export function compoundStyles<
  Keys extends string,
  T extends Record<
    Keys,
    | ResponsiveStyle<any, any, any>
    | Style<any>
    | StylesOne
    | ResponsiveOne<any>
    | StylesLazy<any>
    | ResponsiveLazy<any, any>
  >,
  StyleMap extends {[Name in keyof T]: T[Name]}
>(styleMap: StyleMap) {
  const mapKeys = ['default'];
  mapKeys.push(...Object.keys(styleMap));

  function css(
    compoundMap: {[Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0]}
  ): string {
    let output = '';

    for (let i = 0; i < mapKeys.length; i++) {
      const key = mapKeys[i];
      const value =
        key === 'default' &&
        // @ts-expect-error
        typeof styleMap.default === 'function'
          ? // @ts-expect-error
            styleMap.default()
          : (compoundMap as any)[key];
      if (value === void 0 || value === null) continue;
      output += (styleMap as any)[key]?.css(value);
    }

    return output;
  }

  return Object.assign(
    function compoundStyle(
      compoundMap: {
        [Name in keyof StyleMap]?: Parameters<StyleMap[Name]>[0];
      } = {}
    ) {
      return styles.cls(css(compoundMap));
    },
    {
      css,
      styles: styleMap,
    }
  );
}

type AppTokens = typeof tokens & {vh: string};
type AppThemes = typeof themes;

declare module '@dash-ui/styles' {
  export interface DashTokens extends AppTokens {}
  export interface DashThemes extends AppThemes {}
}
