//@flow
import userArray from '../data/users.json';
import type {UserState, UserAction} from './types.js';
import _ from 'lodash';

const initialState = {
  users: userArray,
};

const usersReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.newUser],
      };

    case 'EDIT_USER':
      const userIndex: number = _.findIndex(
        state.users,
        u => u.email === action.email,
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
