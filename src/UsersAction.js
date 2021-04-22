//@flow
import type {UserAction, User} from './types.js';

export const addUser = (user: User): UserAction => ({
  type: 'ADD_USER',
  newUser: user,
});
