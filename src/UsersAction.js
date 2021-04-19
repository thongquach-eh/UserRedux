//@flow
import type {UserAction} from './types.js';

export const addUser = (): UserAction => ({
  type: 'ADD_USER',
});
