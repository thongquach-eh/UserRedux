// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {addUser} from '../UsersAction';
import _ from 'lodash';
import type {UserDispatch, User} from '../types.js';
import UserInput from './UserInput';
import DateTimePicker from '@react-native-community/datetimepicker';

type UserUpdateScreenProps = {
  navigation: StackNavigationProp<any, any>,
  route: RouteProp<any, any>,
};

const styles = StyleSheet.create({
  detailsContainer: {
    margin: 10,
  },
  locationLabel: {
    fontSize: 18,
    marginVertical: 10,
  },
  locationContainer: {
    marginLeft: 10,
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dobLabel: {
    flexBasis: '25%',
    fontSize: 16,
    marginVertical: 3,
  },
  dobValue: {
    flexBasis: '75%',
    marginVertical: 3,
  },
});

const UserUpdateScreen = ({navigation, route}: UserUpdateScreenProps): Node => {
  const dispatch = useDispatch<UserDispatch>();
  const newUser = {
    name: {
      first: '',
      last: '',
    },
    email: '',
    phone: '',
    cell: '',
    gender: '',
  };
  const [user, setUser] = useState<User>(newUser);

  const writeValue = (value: string | number, path: string): void => {
    const updatedUser = _.set(user, path, value);
    setUser(updatedUser);
  };

  const saveUser = useCallback(() => {
    if (user != null) {
      dispatch(addUser(user));
    }
    navigation.goBack();
  }, [dispatch, navigation, user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={() => saveUser()} />,
    });
  }, [navigation, saveUser]);

  return (
    <View style={styles.detailsContainer}>
      <UserInput
        label="Title:"
        onChangeText={(val: string) => writeValue(val, 'name.title')}
      />
      <UserInput
        label="First name:"
        onChangeText={(val: string) => writeValue(val, 'name.first')}
      />
      <UserInput
        label="Last:"
        onChangeText={(val: string) => writeValue(val, 'name.last')}
      />
      <UserInput
        label="Gender:"
        onChangeText={(val: string) => writeValue(val, 'gender')}
      />
      <View style={styles.dobContainer}>
        <Text style={styles.dobLabel}>Birth date:</Text>
        <DateTimePicker
          value={user.dob?.date ? new Date(user.dob.date) : new Date()}
          onChange={(event, val: string) =>
            writeValue(new Date(val).toISOString(), 'dob.date')
          }
          style={styles.dobValue}
        />
      </View>
      <UserInput
        label="Email:"
        onChangeText={(val: string) => writeValue(val, 'email')}
      />
      <UserInput
        label="Phone:"
        onChangeText={(val: string) => writeValue(val, 'phone')}
      />
      <UserInput
        label="Cellphone:"
        onChangeText={(val: string) => writeValue(val, 'cell')}
      />
      <Text style={styles.locationLabel}>Location:</Text>
      <View style={styles.locationContainer}>
        <UserInput
          label="Number"
          onChangeText={(val: number) =>
            writeValue(val, 'location.street.number')
          }
        />
        <UserInput
          label="Street"
          onChangeText={(val: string) =>
            writeValue(val, 'location.street.name')
          }
        />
        <UserInput
          label="City"
          onChangeText={(val: string) => writeValue(val, 'location.city')}
        />
        <UserInput
          label="State"
          onChangeText={(val: string) => writeValue(val, 'location.state')}
        />
        <UserInput
          label="Postcode"
          onChangeText={(val: string) => writeValue(val, 'location.postcode')}
        />
        <UserInput
          label="Country"
          onChangeText={(val: string) => writeValue(val, 'location.country')}
        />
      </View>
    </View>
  );
};

export default UserUpdateScreen;
