// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../UsersAction';
import {set} from 'lodash/fp';
import type {
  UserDispatch,
  User,
  UserState,
  RootStackParamList,
  FullName,
  Location,
} from '../types.js';
import StringInput from './StringInput';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {validateUser} from './Validations';
import GenderPicker from './GenderPicker';
import BirthDatePicker from './BirthDatePicker';
import LocationInput from './LocationInput';
import FullNameInput from './FullNameInput';

type AddUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddUser'>,
  route: RouteProp<RootStackParamList, 'AddUser'>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  detailsContainer: {
    margin: 10,
  },
});

const AddUserScreen = ({navigation, route}: AddUserScreenProps): Node => {
  const dispatch = useDispatch<UserDispatch>();
  const users = useSelector((state: UserState) => state.users);
  const newUser = {
    id: uuidv4(),
    name: {
      first: '',
      last: '',
    },
    email: '',
    phone: '',
    cell: '',
    gender: '',
    location: {},
  };
  const [user, setUser] = useState<User>(newUser);

  const saveUser = useCallback(
    u => {
      if (validateUser(u, users)) {
        dispatch(addUser(u));
        return true;
      }
      return false;
    },
    [dispatch, users],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            if (saveUser(user)) {
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [saveUser, navigation, user]);

  const writeValue = useCallback(
    (value: any, path: string, u: User) => {
      const updatedUser = set(path, value)(u);
      setUser(updatedUser);
    },
    [setUser],
  );

  const onFullNameChange = (name: FullName) => {
    writeValue(name, 'name', user);
  };

  const onLocationChange = (location: Location) => {
    writeValue(location, 'location', user);
  };

  const handleChooseAvatar = useCallback(
    (u: User) => {
      const options = {
        noData: true,
      };
      launchImageLibrary(options, response => {
        if (response.uri) {
          const picture = {
            large: response.uri,
            medium: response.uri,
            thumbnail: response.uri,
          };
          writeValue(picture, 'picture', u);
        }
      });
    },
    [writeValue],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 20}>
      <ScrollView style={styles.detailsContainer}>
        <Image source={{uri: user.picture?.large}} style={styles.avatar} />
        <Button
          title="Choose Avatar"
          onPress={() => handleChooseAvatar(user)}
        />
        <FullNameInput name={user.name} onChange={onFullNameChange} />
        <GenderPicker
          label="Gender"
          value={user.gender}
          onValueChange={val => writeValue(val, 'gender', user)}
        />
        <BirthDatePicker
          label="Birth Date:"
          value={user.dob?.date ? new Date(user.dob.date) : new Date()}
          onChange={(event, val) =>
            writeValue(new Date(val).toISOString(), 'dob.date', user)
          }
        />
        <StringInput
          label="Email:"
          value={user.email}
          onChangeText={val => writeValue(val, 'email', user)}
        />
        <StringInput
          label="Phone:"
          value={user.phone}
          onChangeText={val => writeValue(val, 'phone', user)}
        />
        <StringInput
          label="Cellphone:"
          value={user.cell}
          onChangeText={val => writeValue(val, 'cell', user)}
        />
        <LocationInput
          label="Location:"
          location={user.location}
          onChange={onLocationChange}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddUserScreen;
