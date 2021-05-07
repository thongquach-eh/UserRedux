//@flow
import type {User} from '../types.js';

export const validateUser = (user: User): Object => {
  const errors = {};
  if (!user?.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
