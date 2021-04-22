import path from 'path';
import {NextApiRequest, NextApiResponse} from 'next';
import * as nexus from 'nexus';
import {ApolloServer} from 'apollo-server-micro';
import {fieldValidatePlugin} from '@/graphql/api/nexus-plugin-validate';

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

export default apolloServer.createHandler({path: '/api/graphql'});
