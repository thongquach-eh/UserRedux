// @flow
import * as React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import usersData from '../data/users.json';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import FullName from './FullName';
import Location from './Location';
import BirthDate from './BirthDate';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightblue',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 72,
    height: 72,
  },
});

type UserProps = {
  gender: ?string,
  name: {
    title: ?string,
    first: string,
    last: string,
  },
  location: {
    street: {
      number: ?number,
      name: ?string,
    },
    city: ?string,
    state: ?string,
    country: ?string,
    postcode: ?string,
  },
  email: string,
  dob: {
    date: ?string,
    age: ?number,
  },
  phone: ?string,
  cell: ?string,
  picture: {
    large: ?string,
    medium: ?string,
    thumbnail: ?string,
  },
};

const renderUser = (user: UserProps): React.Node => (
  <TouchableHighlight style={styles.item}>
    <>
      <Image
        style={styles.avatar}
        source={{
          uri: user.picture.medium,
        }}
      />
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
    </>
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
  return (
    <FlatList
      data={usersData}
      renderItem={({item: user}) => renderUser(user)}
      keyExtractor={user => user.email}
    />
  );
};

export default UserListScreen;
