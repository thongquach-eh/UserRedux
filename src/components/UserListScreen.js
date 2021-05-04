// @flow
import * as React from 'react';
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootState, RootStackParamList, UserDispatch} from '../types.js';
import {useSelector, useDispatch} from 'react-redux';
import UserItem from './UserItem';
import {
  fetchUsersAC,
  isFetchingUsersSelector,
  fetchUsersErrorSelector,
} from '../state.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

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
    dispatch(fetchUsersAC());
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate('AddUser')} />
      ),
    });
  });

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (fetchUsersError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          An error occurred: {fetchUsersError.message}
        </Text>
        <Button onPress={() => dispatch(fetchUsersAC())} title="Retry" />
      </View>
    );
  } else {
    return (
      <FlatList
        data={users}
        renderItem={({item: user}) => (
          <UserItem user={user} navigation={navigation} />
        )}
        keyExtractor={user => user.id}
      />
    );
  }
};

export default UserListScreen;
