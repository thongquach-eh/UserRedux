//@flow
import {ofType, combineEpics} from 'redux-observable';
import {ACTIONS} from 'redux-api-call';
import {map, filter, tap, flatMap} from 'rxjs/operators';
import {
  addUsers,
  addUser,
  editUser,
  noAction,
  startFetchUsers,
} from './UsersAction';
import {getFormValues} from 'redux-form';
import {cacheOrExecute, setCache} from './apiCache';

let fetchUsersNetworkFails: number = 0;

const startFetchingEpic = action$ =>
  action$.pipe(
    ofType('START_FETCHING'),
    flatMap(async action => {
      const desiredAction = cacheOrExecute(action.apiName);
      return desiredAction;
    }),
  );

const fetchUsersCompleteEpic = action$ =>
  action$.pipe(
    ofType(ACTIONS.COMPLETE),
    filter(action => action.payload.name === 'FETCH_USERS'),
    tap(action => {
      fetchUsersNetworkFails = 0;
      setCache(action);
    }),
    map(({payload}) => {
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
        return startFetchUsers();
      } else {
        fetchUsersNetworkFails = 0;
        return noAction();
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
  startFetchingEpic,
);

export default usersEpic;
