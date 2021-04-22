// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../UsersAction';
import _ from 'lodash';
import type {UserDispatch, User, UserState} from '../types.js';
import UserInput from './UserInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';

type AddUserScreenProps = {
  navigation: StackNavigationProp<any, any>,
  route: RouteProp<any, any>,
};

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    flexBasis: '25%',
    fontSize: 16,
    marginVertical: 3,
  },
  inputValue: {
    flexBasis: '75%',
    fontSize: 16,
    marginVertical: 3,
  },
});

const AddUserScreen = ({navigation, route}: AddUserScreenProps): Node => {
  const dispatch = useDispatch<UserDispatch>();
  const users = useSelector((state: UserState) => state.users);
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

  const saveUser = useCallback(() => {
    for (var otherUser of users) {
      if (otherUser.email === user.email) {
        // eslint-disable-next-line no-alert
        alert('This email address has already been used.');
        return;
      }
    }
    dispatch(addUser(user));
    navigation.goBack();
  }, [dispatch, navigation, user, users]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={() => saveUser()} />,
    });
  }, [navigation, saveUser]);

  const writeValue = useCallback(
    (value: string | number, path: string): void => {
      const updatedUser = _.clone(_.set(user, path, value));
      setUser(updatedUser);
    },
    [user],
  );

  const handleChooseAvatar = useCallback(() => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.uri) {
        writeValue(response.uri, 'picture.large');
        writeValue(response.uri, 'picture.medium');
        writeValue(response.uri, 'picture.thumbnail');
      }
    });
  }, [writeValue]);

  return (
    <ScrollView style={styles.detailsContainer}>
      <Image source={{uri: user.picture?.large}} style={styles.avatar} />
      <Button title="Choose Avatar" onPress={handleChooseAvatar} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title:</Text>
        <Picker
          style={styles.inputValue}
          selectedValue={user.name.title}
          onValueChange={(val: string | number) =>
            writeValue(val, 'name.title')
          }>
          <Picker.Item label="Mr" value="Mr" />
          <Picker.Item label="Ms" value="Ms" />
          <Picker.Item label="Mrs" value="Mrs" />
        </Picker>
      </View>
      <UserInput
        label="First name:"
        onChangeText={(val: string) => writeValue(val, 'name.first')}
      />
      <UserInput
        label="Last name:"
        onChangeText={(val: string) => writeValue(val, 'name.last')}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender:</Text>
        <Picker
          style={styles.inputValue}
          selectedValue={user.gender}
          onValueChange={(val: string | number) => writeValue(val, 'gender')}>
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Birth date:</Text>
        <DateTimePicker
          value={user.dob?.date ? new Date(user.dob.date) : new Date()}
          onChange={(event, val: string) =>
            writeValue(new Date(val).toISOString(), 'dob.date')
          }
          style={styles.inputValue}
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
          onChangeText={(val: string) =>
            writeValue(parseInt(val, 10), 'location.street.number')
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
    </ScrollView>
  );
};

export default AddUserScreen;
