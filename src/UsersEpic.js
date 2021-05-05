//@flow
import {ofType} from 'redux-observable';
import {ACTIONS} from 'redux-api-call';
import {map, filter} from 'rxjs/operators';
import {addUsers} from './UsersAction';
import {combineEpics} from 'redux-observable';
import {fetchUsersAC} from './state.js';
import type {Action} from 'redux';
import {Observable} from 'rxjs';

let fetchUsersNetworkFails: number = 0;

const fetchUsersCompleteEpic = action$ =>
  action$.pipe(
    ofType(ACTIONS.COMPLETE),
    filter(action => action.payload.name === 'FETCH_USERS'),
    map(({payload}) => {
      fetchUsersNetworkFails = 0;
      const fetchedUsers = payload.json.results || [];
      return addUsers(fetchedUsers);
    }),
  );

const fetchUsersNetworkFailureEpic = action$ =>
  action$.pipe(
    ofType(ACTIONS.FAILURE),
    filter(
      ({payload}) =>
        payload.name === 'FETCH_USERS' &&
        payload.json.message === 'Network request failed',
    ),
    map(res => {
      if (++fetchUsersNetworkFails < 3) {
        return fetchUsersAC();
      } else {
        fetchUsersNetworkFails = 0;
        return {type: 'NO_ACTION'};
      }
    }),
  );

const usersEpic = combineEpics(
  fetchUsersCompleteEpic,
  fetchUsersNetworkFailureEpic,
);

export default usersEpic;
