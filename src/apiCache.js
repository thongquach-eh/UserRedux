//@flow
import {addUsers, noAction} from './UsersAction';
import {fetchUsersAC} from './state';
import type {UserAction} from './types';
import {AsyncStorage} from 'react-native';

const CACHE_TIMEOUT_PERIOD = 60; // in seconds

export const cacheOrExecute = async (apiName: string): Promise<UserAction> => {
  const cachedAction = await getCache(apiName);

  switch (apiName) {
    case 'FETCH_USERS':
      if (cachedAction) {
        return addUsers(cachedAction.data.results);
      } else {
        return fetchUsersAC();
      }

    default:
      return noAction();
  }
};

export const setCache = (action: any): void => {
  AsyncStorage.setItem(action.payload.name, JSON.stringify(action));
};

const isCacheTimeout = (cachedDate: string): boolean => {
  const storedTime =
    (new Date().getTime() - new Date(cachedDate).getTime()) / 1000;
  return storedTime > CACHE_TIMEOUT_PERIOD;
};

const getCache = async (apiName: string): boolean | Object => {
  const cachedAction = await AsyncStorage.getItem(apiName);

  if (cachedAction == null || isCacheTimeout(cachedAction.meta.date)) {
    return false;
  } else {
    return cachedAction;
  }
};
