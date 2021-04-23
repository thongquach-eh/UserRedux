//@flow
import type {UserAction, User} from './types.js';

export const addUser = (user: User): UserAction => ({
  type: 'ADD_USER',
  newUser: user,
});

export const editUser = (email: string, user: User): UserAction => ({
  type: 'EDIT_USER',
  email: email,
  editedUser: user,
});
