//@flow
import type {User} from '../types.js';

export const validateUser = (u: User, users: User[]): boolean => {
  if (u.email === '') {
    // eslint-disable-next-line no-alert
    alert('Email address cannot be empty.');
    return false;
  }

  for (var otherUser of users) {
    if (otherUser.email === u.email && otherUser.id !== u.id) {
      // eslint-disable-next-line no-alert
      alert('This email address has already been used.');
      return false;
    }
  }

  return true;
};
