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
import type {User} from '../types';
import UserItem from './UserItem';

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
  isLoading: boolean,
  error: Object,
  users: User[],
  onError: () => mixed,
};

const UserListComponent = ({
  isLoading,
  error,
  users,
  onError,
}: UserListComponentProps): React.Node => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" testID="loadingIcon" />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>An error occurred: {error.message}</Text>
        <Button onPress={onError} title="Retry" />
      </View>
    );
  } else {
    return (
      <FlatList
        data={users}
        renderItem={({item: user}) => <UserItem user={user} />}
        keyExtractor={user => user.id}
      />
    );
  }
};

export default UserListComponent;
