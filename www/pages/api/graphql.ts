import path from 'path';
import {NextApiRequest, NextApiResponse} from 'next';
import * as nexus from 'nexus';
import {PrismaClient} from '@prisma/client';
import {ApolloServer} from 'apollo-server-micro';
import * as jwt from 'jsonwebtoken';
import {camelCase} from 'change-case';
import {fieldValidatePlugin} from '@/graphql/api/nexus-plugin-validate';
import {jwtConfig, jwtCookieName} from '@/graphql/api/jwt';
import type {JwtData} from '@/graphql/api/jwt';
import type {NexusGenFieldTypes} from '../../types/nexus';

const apolloServer = new ApolloServer({
  schema: nexus.makeSchema({
    types: [],
    contextType: {
      module: path.join(process.cwd(), 'types', 'nexus-context.d.ts'),
      export: 'NexusContext',
    },
    plugins: [nexus.fieldAuthorizePlugin(), fieldValidatePlugin()],
    outputs: {
      schema: path.join(process.cwd(), 'graphql', 'defiverr.graphql'),
      typegen: path.join(process.cwd(), 'types', 'nexus.d.ts'),
    },
  }),
  context: ({req, res}: {req: NextApiRequest; res: NextApiResponse}) => ({
    req,
    res,
    db: req.db,
    secrets: req.secrets,
    viewer: req.viewer,
  }),
  playground: process.env.NODE_ENV !== 'production' && {
    tabs: [
      {
        endpoint: '/api/graphql',
        query: `{ok}`,
      },
    ],
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloHandler = apolloServer.createHandler({path: '/api/graphql'});

export default handler;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, [
    secretsMiddleware,
    dbMiddleware,
    jwtMiddleware,
    headersMiddleware,
  ]);
  return apolloHandler(req, res);
}

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', `warn`, `error`] : [],
});

function secretsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.secrets = Object.keys(process.env).reduce((acc, key) => {
    if (key.startsWith('SECRET_')) {
      (acc as any)[camelCase(key.replace(/^SECRETS_/, ''))] = process.env[key];
    }

    return acc;
  }, {} as NextApiRequest['secrets']);
  next();
}

function dbMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.db = prismaClient;
  next();
}

async function jwtMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextCallback
) {
  req.viewer = null;
  const token = req.cookies[jwtCookieName];

  // Bail if we've got no JWT header
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
}

function headersMiddleware(
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

function runMiddleware(
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
    // viewer: NexusGenFieldTypes['Viewer'] | null;
    viewer: any;
  }
}
