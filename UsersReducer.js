//@flow
import userArray from './data/users.json';
import type {UserState, UserAction} from './types.js';

const initialState = {
  users: userArray,
};

const usersReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default usersReducer;
