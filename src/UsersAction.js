//@flow
import type {UserAction, User} from './types.js';

export const pressAddUser = (): UserAction => ({
  type: 'PRESS_ADD_USER',
});

export const addUser = (user: User): UserAction => ({
  type: 'ADD_USER',
  newUser: user,
});

export const addUsers = (users: User[]): UserAction => ({
  type: 'ADD_USERS',
  newUsers: users,
});

export const pressEditUser = (): UserAction => ({
  type: 'PRESS_EDIT_USER',
});

export const editUser = (user: User): UserAction => ({
  type: 'EDIT_USER',
  editedUser: user,
});
