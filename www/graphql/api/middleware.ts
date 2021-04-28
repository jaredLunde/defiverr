import {PrismaClient, User} from '@prisma/client';
import {camelCase} from 'change-case';
import * as jwt from 'jsonwebtoken';
import {NextApiRequest, NextApiResponse} from 'next';
import type {JwtData} from '@/graphql/api/jwt';
import {jwtConfig, jwtCookieName} from '@/graphql/api/jwt';

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', `warn`, `error`] : [],
});

export function secretsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.secrets = Object.keys(process.env).reduce((acc, key) => {
    if (key.startsWith('SECRET_')) {
      (acc as any)[camelCase(key.replace(/^SECRET_/, ''))] = process.env[key];
    }

    return acc;
  }, {} as NextApiRequest['secrets']);
  next();
}

export function dbMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.db = prismaClient;
  next();
}

export async function jwtMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.viewer = null;
  const token = req.cookies[jwtCookieName];

  // Bail if we've got no JWT cookie
  if (!token) return next();
  let jwtData: JwtData;

  try {
    jwtData = jwt.verify(token, req.secrets.jwt, jwtConfig) as JwtData;
  } catch (err) {
    return next();
  }

  if (req.viewer === null) {
    const viewer = await req.db.user.findUnique({
      where: {id: jwtData.id},
    });

    req.viewer = viewer || null;
  }

  next();
}

export function headersMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  // Performance enhancement for SSL via caching
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubdomains; preload'
  );
  // A feature of Internet Explorer, Chrome and Safari that stops pages
  // from loading when they detect reflected cross-site scripting (XSS)
  // attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Fixes caching issues when using gzip compression
  res.setHeader('Vary', 'Accept-Encoding');
  next();
}

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fns: ((
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextCallback
  ) => void)[]
) {
  return Promise.all(
    fns.map(
      (fn) =>
        new Promise((resolve, reject) => {
          fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
              return reject(result);
            }

            resolve(result);
          });
        })
    )
  );
}

type NextCallback = (result?: unknown) => void;

declare module 'next' {
  export interface NextApiRequest {
    secrets: {
      jwt: string;
    };
    db: typeof prismaClient;
    viewer: User | null;
  }
}
