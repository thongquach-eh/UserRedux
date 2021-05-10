//@flow
import {ofType, combineEpics} from 'redux-observable';
import {ACTIONS} from 'redux-api-call';
import {map, filter, tap} from 'rxjs/operators';
import {addUsers, addUser, editUser} from './UsersAction';
import {fetchUsersAC} from './state.js';
import {getFormValues} from 'redux-form';

let fetchUsersNetworkFails: number = 0;

const fetchUsersCompleteEpic = action$ =>
  action$.pipe(
    ofType(ACTIONS.COMPLETE),
    filter(action => action.payload.name === 'FETCH_USERS'),
    map(({payload}) => {
      const fetchedUsers = payload.json.results || [];
      return addUsers(fetchedUsers);
    }),
    tap(() => (fetchUsersNetworkFails = 0)),
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

const pressAddUserEpic = (action$, state$) =>
  action$.pipe(
    ofType('PRESS_ADD_USER'),
    map(() => {
      const newUser = getFormValues('addUser')(state$.value);
      return addUser(newUser);
    }),
  );

const pressEditUserEpic = (action$, state$) =>
  action$.pipe(
    ofType('PRESS_EDIT_USER'),
    map(() => {
      const editedUser = getFormValues('editUser')(state$.value);
      return editUser(editedUser);
    }),
  );

const usersEpic = combineEpics(
  fetchUsersCompleteEpic,
  fetchUsersNetworkFailureEpic,
  pressAddUserEpic,
  pressEditUserEpic,
);

export default usersEpic;
