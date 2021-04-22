module.exports = {
  future: {
    webpack5: true,
  },
  /**
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   */
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'fr'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
};
