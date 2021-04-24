import * as mutations from './mutations';
import * as queries from './queries';
import * as schemas from './schemas';

export const types = [
  ...Object.values(schemas),
  ...Object.values(queries),
  ...Object.values(mutations),
];
