import path from 'path';
import {ApolloServer} from 'apollo-server-micro';
import {NextApiRequest, NextApiResponse} from 'next';
import * as nexus from 'nexus';
import {
  dbMiddleware,
  headersMiddleware,
  jwtMiddleware,
  runMiddleware,
  secretsMiddleware,
} from '@/graphql/api/middleware';
import {fieldValidatePlugin} from '@/graphql/api/nexus-plugin-validate';
import * as scalars from '@/graphql/api/scalars';
import * as users from '@/graphql/api/users';

const apolloServer = new ApolloServer({
  schema: nexus.makeSchema({
    types: [...scalars.types, ...users.types],
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
        query: `{ users { id } }`,
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
