import {NextApiRequest, NextApiResponse} from 'next';
import {jwtCookieName} from '@/graphql/api/jwt';
import {
  headersMiddleware,
  runMiddleware,
  secretsMiddleware,
} from '@/graphql/api/middleware';
import * as cookies from '@/graphql/api/utils/cookies';

export default handler;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, [secretsMiddleware, headersMiddleware]);

  if (req.cookies[jwtCookieName]) {
    cookies.del(res, jwtCookieName);
  }

  res.json({success: true});
}
