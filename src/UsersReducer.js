//@flow
import userArray from '../data/users.json';
import type {UserState, UserAction, User} from './types.js';
import _ from 'lodash';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const generateId = (user: User) => {
  return {
    ...user,
    id: uuidv4(),
  };
};

const generateIds = (users: User[]): User[] => {
  return users.map(u => generateId(u));
};

const initialState = {
  users: generateIds(userArray),
};

const usersReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, generateId(action.newUser)],
      };

    case 'ADD_USERS':
      return {
        ...state,
        users: state.users.concat(generateIds(action.newUsers)),
      };

    case 'EDIT_USER':
      const userIndex: number = _.findIndex(
        state.users,
        u => u.id === action.editedUser.id,
      );
      const newUsers = [...state.users];
      newUsers[userIndex] = action.editedUser;

      return {
        ...state,
        users: newUsers,
      };

    default:
      return state;
  }
};

export default usersReducer;
