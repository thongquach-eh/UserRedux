// @flow
import type {User} from '../../src/types.js';

declare module '../data/users.json' {
  declare module.exports: User[];
}
