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

type UserNameProps = {
  title: ?string,
  first: string,
  last: string,
};

const renderName = (name: UserNameProps): React.Node => (
  <Text style={styles.name}>
    {name.title}. {name.first} {name.last}
  </Text>
);

type UserLocationProps = {
  street: {
    number: ?number,
    name: ?string,
  },
  city: ?string,
  state: ?string,
  country: ?string,
  postcode: ?string,
};

const renderLocation = (loc: UserLocationProps): React.Node => (
  <Text>
    {loc.street.number} {loc.street.name}, {loc.city} {loc.state},{' '}
    {loc.postcode}, {loc.country}
  </Text>
);

type UserDobProps = {
  date: ?string,
  age: ?number,
};

const renderDob = (dob: UserDobProps): React.Node => (
  <Text>
    {dob.date &&
      new Date(dob.date).toLocaleDateString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
  </Text>
);

type UserProps = {
  gender: ?string,
  name: UserNameProps,
  location: UserLocationProps,
  email: string,
  dob: UserDobProps,
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
      {renderName(user.name)}
      {renderLocation(user.location)}
      {renderDob(user.dob)}
    </>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightblue',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 20,
  },
  avatar: {
    width: 72,
    height: 72,
  },
});

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
