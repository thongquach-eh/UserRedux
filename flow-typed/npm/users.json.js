// @flow
import type {User} from '../types.js';

declare module './data/users.json' {
  declare module.exports: User[];
}
