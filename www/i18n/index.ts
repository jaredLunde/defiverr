import type {ParsedUrlQuery} from 'querystring';
import type {GetStaticPropsContext} from 'next';

export async function load<Q extends ParsedUrlQuery>({
  defaultLocale = 'en',
  locale = defaultLocale,
}: GetStaticPropsContext<Q>) {
  if (cache[locale]) {
    return Promise.resolve(cache[locale]);
  }

  const messages = {...(await locales[locale]())};
  cache[locale] = messages;
  return messages;
}

const locales: Record<
  string,
  () => Promise<{
    [x: string]: string;
  }>
> = {
  en() {
    return import('./en');
  },
  fr() {
    return import('./fr');
  },
};

const cache: Record<string, Record<string, string>> = {};
