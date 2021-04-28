import {serialize} from 'cookie';
import type {CookieSerializeOptions} from 'cookie';
import type {NextApiResponse} from 'next';

/**
 * This sets `cookie` using the `res` object
 */

export const set = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? JSON.stringify(value) : String(value);

  if ('maxAge' in options && options.maxAge !== undefined) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export const del = (res: NextApiResponse, name: string) => {
  res.setHeader('Set-Cookie', serialize(name, '', {maxAge: -1}));
};
