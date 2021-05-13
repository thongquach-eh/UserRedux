// @flow
import * as React from 'react';
import {Button} from 'react-native';
import UserListComponent from './UserListComponent';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootState, RootStackParamList, UserDispatch} from '../types';
import {useSelector, useDispatch} from 'react-redux';
import {isFetchingUsersSelector, fetchUsersErrorSelector} from '../state';
import {startFetchUsers} from '../UsersAction';

type UserListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UserList'>,
  route: RouteProp<RootStackParamList, 'UserList'>,
};

const UserListScreen = ({
  navigation,
  route,
}: UserListScreenProps): React.Node => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<UserDispatch>();
  const isFetching = useSelector<RootState, boolean>(isFetchingUsersSelector);
  const fetchUsersError = useSelector<RootState, any>(fetchUsersErrorSelector);

  React.useEffect(() => {
    dispatch(startFetchUsers());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate('AddUser')} />
      ),
    });
  });

  return (
    <UserListComponent
      isFetching={isFetching}
      fetchUsersError={fetchUsersError}
      users={users}
      navigation={navigation}
      dispatch={dispatch}
    />
  );
};

export default UserListScreen;
