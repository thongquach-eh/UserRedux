// @flow
import * as React from 'react';
import {FlatList, Button} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {UserState, RootStackParamList} from '../types.js';
import {useSelector} from 'react-redux';
import UserItem from './UserItem';

type UserListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UserList'>,
  route: RouteProp<RootStackParamList, 'UserList'>,
};

const UserListScreen = ({
  navigation,
  route,
}: UserListScreenProps): React.Node => {
  const users = useSelector((state: UserState) => state.users);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate('AddUser')} />
      ),
    });
  });

  return (
    <FlatList
      data={users}
      renderItem={({item: user}) => (
        <UserItem user={user} navigation={navigation} />
      )}
      keyExtractor={user => user.id}
    />
  );
};

export default UserListScreen;
