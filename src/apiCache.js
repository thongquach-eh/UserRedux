//@flow
import {addUsers, noAction} from './UsersAction';
import {fetchUsersAC} from './state';
import type {UserAction} from './types';
import {AsyncStorage} from 'react-native';

const CACHE_TIMEOUT = 60; // in seconds

export const cacheOrExecute = async (apiName: string): Promise<UserAction> => {
  const cachedAction = await getCache(apiName);

  switch (apiName) {
    case 'FETCH_USERS':
      if (cachedAction && typeof cachedAction === 'object') {
        return addUsers(cachedAction.payload.json.results);
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

const isCacheExpired = (cachedDate: string): boolean => {
  const storedTime =
    (new Date().getTime() - new Date(cachedDate).getTime()) / 1000;
  return storedTime > CACHE_TIMEOUT;
};

const getCache = async (apiName: string): boolean | Object => {
  const cachedAction = JSON.parse(await AsyncStorage.getItem(apiName));

  if (cachedAction == null || isCacheExpired(cachedAction.meta.date)) {
    return false;
  } else {
    return cachedAction;
  }
};
