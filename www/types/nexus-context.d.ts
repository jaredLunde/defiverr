import {NextApiRequest, NextApiResponse} from 'next';

export interface NexusContext {
  req: NextApiRequest;
  res: NextApiResponse;
  db: NextApiRequest['db'];
  secrets: NextApiRequest['secrets'];
  viewer: NextApiRequest['viewer'];
}
