// @flow
import * as React from 'react';
import {StyleSheet, TouchableHighlight, View, Image} from 'react-native';
import FullName from './FullName';
import Location from './Location';
import BirthDate from './BirthDate';
import type {User} from '../types.js';
import type {StackNavigationProp} from '@react-navigation/stack';

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

const UserItem = ({
  user,
  navigation,
}: {
  user: User,
  navigation: StackNavigationProp<any, any>,
}): React.Node => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={() =>
      navigation.navigate('UserDetails', {
        userEmail: user.email,
      })
    }>
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
export default UserItem;
