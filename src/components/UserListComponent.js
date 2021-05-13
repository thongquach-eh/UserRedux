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
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList, User, UserDispatch} from '../types';
import UserItem from './UserItem';
import {startFetchUsers} from '../UsersAction';

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

type UserListComponentProps = {
  isFetching: boolean,
  fetchUsersError: Object,
  users: User[],
  navigation: StackNavigationProp<RootStackParamList, 'UserList'>,
  dispatch: UserDispatch,
};

const UserListScreen = ({
  isFetching,
  fetchUsersError,
  users,
  navigation,
  dispatch,
}: UserListComponentProps): React.Node => {
  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" testID="loadingIcon" />
      </View>
    );
  } else if (fetchUsersError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          An error occurred: {fetchUsersError.message}
        </Text>
        <Button onPress={() => dispatch(startFetchUsers())} title="Retry" />
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
