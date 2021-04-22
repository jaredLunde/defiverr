import * as React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {IntlProvider} from 'react-intl';
import resetGlobalStyles from '@dash-ui/reset';
import {useGlobal} from '@dash-ui/react';
import {StylesProvider} from '@/styles';
import {typography} from '@/components/typography';

export default App;

function App({
  Component,
  pageProps: {
    localeMessages = {},
    locale = 'en',
    defaultLocale = 'en',
    ...pageProps
  },
}: AppProps) {
  return (
    <StylesProvider>
      <GlobalStyles />
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter'
          rel='stylesheet'
        />
      </Head>

      <IntlProvider
        messages={localeMessages}
        locale={locale}
        defaultLocale={defaultLocale}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </StylesProvider>
  );
}

/**
 * Injects global styles for the app
 */
function GlobalStyles() {
  useGlobal(resetGlobalStyles, []);

  useGlobal(
    ({color, font, transition}) => ({
      '*, ::before, ::after, body': {
        position: 'relative',
        margin: 0,
        overflowWrap: 'break-word',
      },
      '*:focus': {
        outline: 'none',
      },
      '::selection, ::-moz-selection': {
        backgroundColor: color.indigo200,
      },
      html: {
        fontSize: '100%',

        ':focus-within': {
          scrollBehavior: 'smooth',
        },
      },
      body: {
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: color.bodyBg,
        fontFamily: font.family.sans,
      },
      '.loud': {
        transitionProperty: 'opacity,visibility',
        transitionDuration: transition.duration.slower,
        transitionTimingFunction: transition.timing.inOut,
      },
      '.writing-mode-enabled .loud': {
        opacity: '0!important',
        visibility: 'hidden',
      },
      '.writing-mode-disabled .loud': {
        opacity: 1,
        visibility: 'visible',
      },
    }),
    []
  );

  useGlobal(typography.css('sm'));

  return null;
}
