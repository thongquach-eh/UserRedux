// @flow
import React, {useLayoutEffect, useCallback} from 'react';
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
import type {
  UserDispatch,
  User,
  RootState,
  RootStackParamList,
} from '../types.js';
import StringInput from './StringInput';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-native-get-random-values';
import {validateUser} from './Validations';
import GenderPicker from './GenderPicker';
import BirthDatePicker from './BirthDatePicker';
import LocationInput from './LocationInput';
import FullNameInput from './FullNameInput';
import {reduxForm, Field, getFormValues, change} from 'redux-form';

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
  const users = useSelector((state: RootState) => state.user.users);
  const rootState = useSelector((state: RootState) => state);
  const user = getFormValues('addUser')(rootState);

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
          dispatch(change('addUser', 'picture', picture));
        }
      });
    },
    [dispatch],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 20}>
      <ScrollView style={styles.detailsContainer}>
        <Image source={{uri: user?.picture?.large}} style={styles.avatar} />
        <Button
          title="Choose Avatar"
          onPress={() => handleChooseAvatar(user)}
        />
        <FullNameInput />
        <Field
          name="gender"
          component={GenderPicker}
          props={{label: 'Gender:'}}
        />
        <BirthDatePicker label="Birth Date:" />
        <Field name="email" component={StringInput} props={{label: 'Email:'}} />
        <Field name="phone" component={StringInput} props={{label: 'Phone:'}} />
        <Field
          name="cell"
          component={StringInput}
          props={{label: 'Cellphone:'}}
        />
        <LocationInput label="Location:" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default reduxForm({form: 'addUser'})(AddUserScreen);
