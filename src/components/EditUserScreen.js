// @flow
import React, {useLayoutEffect, useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {pressEditUser} from '../UsersAction';
import type {UserDispatch, RootStackParamList} from '../types.js';
import StringInput from './StringInput';
import 'react-native-get-random-values';
import {validateUser} from './Validations';
import GenderPicker from './GenderPicker';
import BirthDatePicker from './BirthDatePicker';
import LocationInput from './LocationInput';
import FullNameInput from './FullNameInput';
import PictureInput from './PictureInput';
import {reduxForm, Field, initialize} from 'redux-form';
import type {FormProps} from 'redux-form';

type EditUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditUser'>,
  route: RouteProp<RootStackParamList, 'EditUser'>,
} & FormProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    margin: 10,
  },
});

const EditUserScreen = (props: EditUserScreenProps): Node => {
  const {navigation, route, valid} = props;
  const {user} = route.params;
  const dispatch = useDispatch<UserDispatch>();

  useEffect(() => {
    dispatch(initialize('editUser', user));
  }, [dispatch, user]);

  const saveEditedUser = useCallback(() => {
    if (valid) {
      dispatch(pressEditUser());
      return true;
    } else {
      // eslint-disable-next-line no-alert
      alert('The form is invalid. Please recheck the entered data.');
    }
  }, [dispatch, valid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            if (saveEditedUser()) {
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [saveEditedUser, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 20}>
      <ScrollView style={styles.detailsContainer}>
        <Field
          name="picture"
          component={PictureInput}
          props={{label: 'Choose picture'}}
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

export default reduxForm({form: 'editUser', validate: validateUser})(
  EditUserScreen,
);
