import * as nexus from 'nexus';
import {User} from './schemas';

export const users = nexus.queryField('users', {
  type: nexus.list(User),
  args: {
    take: 'Int',
    skip: 'Int',
  },
  resolve(query, args, {db}) {
    return db.user.findMany();
  },
});
