// @flow
import * as React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {User, UserState} from '../types.js';
import FullName from './FullName';
import Location from './Location';
import BirthDate from './BirthDate';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: 'lightblue',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  userInfo: {
    flexShrink: 1,
    marginHorizontal: 8,
  },
  avatar: {
    width: 72,
    height: 72,
  },
});

const renderUser = (user: User, navigation): React.Node => (
  <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
    <View style={styles.userContainer}>
      <Image
        style={styles.avatar}
        source={{
          uri: user.picture.medium,
        }}
      />
      <View style={styles.userInfo}>
        <FullName
          title={user.name.title}
          first={user.name.first}
          last={user.name.last}
        />
        <Location
          streetName={user.location.street.name}
          streetNum={user.location.street.number}
          city={user.location.city}
          state={user.location.state}
          postcode={user.location.postcode}
          country={user.location.country}
        />
        {user.dob.date && <BirthDate date={user.dob.date} />}
      </View>
    </View>
  </TouchableHighlight>
);

type UserListScreenProps = {
  navigation: StackNavigationProp<any, any>,
  route: RouteProp<any, any>,
};

const UserListScreen = ({
  navigation,
  route,
}: UserListScreenProps): React.Node => {
  const users = useSelector((state: UserState) => state.users);

  return (
    <FlatList
      data={users}
      renderItem={({item: user}) => renderUser(user, navigation)}
      keyExtractor={user => user.email}
    />
  );
};

export default UserListScreen;
