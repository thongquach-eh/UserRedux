import {makeFetchAction} from 'redux-api-call';
import {flow, get} from 'lodash/fp';

export const {
  dataSelector: fetchUsersResponseSelector,
  isFetchingSelector: isFetchingUsersSelector,
  actionCreator: fetchUsersAC,
} = makeFetchAction('FETCH_USERS', () => ({
  endpoint: 'https://randomuser.me/api/?results=25',
  method: 'GET',
}));

export const fetchUsersSelector = flow(
  fetchUsersResponseSelector,
  get('results'),
);
