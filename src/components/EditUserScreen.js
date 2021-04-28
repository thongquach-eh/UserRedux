// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
  Text,
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
import {editUser} from '../UsersAction';
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
import {validateUser} from './Validations';
import GenderPicker from './GenderPicker';
import BirthDatePicker from './BirthDatePicker';
import LocationInput from './LocationInput';
import FullNameInput from './FullNameInput';

type EditUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditUser'>,
  route: RouteProp<RootStackParamList, 'EditUser'>,
};

type EditUserPanelProps = {
  ...EditUserScreenProps,
  user: User,
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

const EditUserPanel = ({user, navigation, route}: EditUserPanelProps): Node => {
  const dispatch = useDispatch<UserDispatch>();
  const users = useSelector((state: UserState) => state.users);
  const [draftUser, setDraftUser] = useState<User>(user);

  const saveEditedUser = useCallback(
    u => {
      if (validateUser(u, users)) {
        dispatch(editUser(u));
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
            if (saveEditedUser(draftUser)) {
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [saveEditedUser, navigation, draftUser]);

  const writeValue = useCallback(
    (value: any, path: string, u: User) => {
      const updatedUser = set(path, value)(u);
      setDraftUser(updatedUser);
    },
    [setDraftUser],
  );

  const onFullNameChange = (name: FullName) => {
    writeValue(name, 'name', draftUser);
  };

  const onLocationChange = (location: Location) => {
    writeValue(location, 'location', draftUser);
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
        <Image source={{uri: draftUser.picture?.large}} style={styles.avatar} />
        <Button
          title="Choose Avatar"
          onPress={() => handleChooseAvatar(draftUser)}
        />
        <FullNameInput name={draftUser.name} onChange={onFullNameChange} />
        <GenderPicker
          label="Gender"
          value={draftUser.gender}
          onValueChange={val => writeValue(val, 'gender', draftUser)}
        />
        <BirthDatePicker
          label="Birth Date:"
          value={
            draftUser.dob?.date ? new Date(draftUser.dob.date) : new Date()
          }
          onChange={(event, val) =>
            writeValue(new Date(val).toISOString(), 'dob.date', draftUser)
          }
        />
        <StringInput
          label="Email:"
          value={draftUser.email}
          onChangeText={val => writeValue(val, 'email', draftUser)}
        />
        <StringInput
          label="Phone:"
          value={draftUser.phone}
          onChangeText={val => writeValue(val, 'phone', draftUser)}
        />
        <StringInput
          label="Cellphone:"
          value={draftUser.cell}
          onChangeText={val => writeValue(val, 'cell', draftUser)}
        />
        <LocationInput
          label="Location:"
          location={draftUser.location}
          onChange={onLocationChange}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const EditUserScreen = ({navigation, route}: EditUserScreenProps): Node => {
  const {id} = route.params;
  const retrievedUser: ?User = useSelector((state: UserState) =>
    state.users.find(u => u.id === id),
  );

  if (retrievedUser == null) {
    return <Text>Error when trying to display the user with ID: {id}!</Text>;
  } else {
    return (
      <EditUserPanel
        user={retrievedUser}
        navigation={navigation}
        route={route}
      />
    );
  }
};

export default EditUserScreen;
