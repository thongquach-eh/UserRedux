//@flow
import {ofType} from 'redux-observable';
import {ACTIONS} from 'redux-api-call';
import {map, filter} from 'rxjs/operators';
import {addUsers} from './UsersAction';
import {combineEpics} from 'redux-observable';

const fetchUsersEpic = action$ =>
  action$.pipe(
    ofType(ACTIONS.COMPLETE),
    filter(action => action.payload.name === 'FETCH_USERS'),
    map(({payload}) => {
      const fetchedUsers = payload.json.results || [];
      return addUsers(fetchedUsers);
    }),
  );

const usersEpic = combineEpics(fetchUsersEpic);

export default usersEpic;
