// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {
  View,
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
import {addUser} from '../UsersAction';
import {set} from 'lodash/fp';
import type {
  UserDispatch,
  User,
  UserState,
  RootStackParamList,
} from '../types.js';
import UserInput from './UserInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {validateUser} from './Validations';

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
  pickerItem: {
    fontSize: 16,
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title:</Text>
          <Picker
            style={styles.inputValue}
            itemStyle={styles.pickerItem}
            selectedValue={user.name.title}
            onValueChange={(val: string | number) =>
              writeValue(val, 'name.title', user)
            }>
            <Picker.Item label="Mr" value="Mr" />
            <Picker.Item label="Ms" value="Ms" />
            <Picker.Item label="Mrs" value="Mrs" />
          </Picker>
        </View>
        <UserInput
          label="First name:"
          onChangeText={(val: string) => writeValue(val, 'name.first', user)}
        />
        <UserInput
          label="Last name:"
          onChangeText={(val: string) => writeValue(val, 'name.last', user)}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender:</Text>
          <Picker
            style={styles.inputValue}
            itemStyle={styles.pickerItem}
            selectedValue={user.gender}
            onValueChange={(val: string | number) =>
              writeValue(val, 'gender', user)
            }>
            <Picker.Item label="male" value="male" />
            <Picker.Item label="female" value="female" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birth date:</Text>
          <DateTimePicker
            value={user.dob?.date ? new Date(user.dob.date) : new Date()}
            onChange={(event, val: string) =>
              writeValue(new Date(val).toISOString(), 'dob.date', user)
            }
            style={styles.inputValue}
          />
        </View>
        <UserInput
          label="Email:"
          onChangeText={(val: string) => writeValue(val, 'email', user)}
        />
        <UserInput
          label="Phone:"
          onChangeText={(val: string) => writeValue(val, 'phone', user)}
        />
        <UserInput
          label="Cellphone:"
          onChangeText={(val: string) => writeValue(val, 'cell', user)}
        />
        <Text style={styles.locationLabel}>Location:</Text>
        <View style={styles.locationContainer}>
          <UserInput
            label="Number"
            onChangeText={(val: string) =>
              writeValue(parseInt(val, 10), 'location.street.number', user)
            }
          />
          <UserInput
            label="Street"
            onChangeText={(val: string) =>
              writeValue(val, 'location.street.name', user)
            }
          />
          <UserInput
            label="City"
            onChangeText={(val: string) =>
              writeValue(val, 'location.city', user)
            }
          />
          <UserInput
            label="State"
            onChangeText={(val: string) =>
              writeValue(val, 'location.state', user)
            }
          />
          <UserInput
            label="Postcode"
            onChangeText={(val: string) =>
              writeValue(val, 'location.postcode', user)
            }
          />
          <UserInput
            label="Country"
            onChangeText={(val: string) =>
              writeValue(val, 'location.country', user)
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddUserScreen;
