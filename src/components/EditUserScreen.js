// @flow
import React, {useLayoutEffect, useState, useCallback} from 'react';
import type {Node} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {editUser} from '../UsersAction';
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
import {validateUser} from './Validations';

type EditUserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditUser'>,
  route: RouteProp<RootStackParamList, 'EditUser'>,
};

type EditUserPanelProps = {
  ...EditUserScreenProps,
  user: User,
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
  pickerItem: {
    fontSize: 16,
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
    <ScrollView style={styles.detailsContainer}>
      <Image source={{uri: draftUser.picture?.large}} style={styles.avatar} />
      <Button
        title="Choose Avatar"
        onPress={() => handleChooseAvatar(draftUser)}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title:</Text>
        <Picker
          style={styles.inputValue}
          itemStyle={styles.pickerItem}
          selectedValue={draftUser.name.title}
          onValueChange={(val: string | number) =>
            writeValue(val, 'name.title', draftUser)
          }>
          <Picker.Item label="Mr" value="Mr" />
          <Picker.Item label="Ms" value="Ms" />
          <Picker.Item label="Mrs" value="Mrs" />
        </Picker>
      </View>
      <UserInput
        label="First name:"
        value={draftUser.name.first}
        onChangeText={(val: string) => writeValue(val, 'name.first', draftUser)}
      />
      <UserInput
        label="Last name:"
        value={draftUser.name.last}
        onChangeText={(val: string) => writeValue(val, 'name.last', draftUser)}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender:</Text>
        <Picker
          style={styles.inputValue}
          itemStyle={styles.pickerItem}
          selectedValue={draftUser.gender}
          onValueChange={(val: string | number) =>
            writeValue(val, 'gender', draftUser)
          }>
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Birth date:</Text>
        <DateTimePicker
          value={
            draftUser.dob?.date ? new Date(draftUser.dob.date) : new Date()
          }
          onChange={(event, val: string) =>
            writeValue(new Date(val).toISOString(), 'dob.date', draftUser)
          }
          style={styles.inputValue}
        />
      </View>
      <UserInput
        label="Email:"
        value={draftUser.email}
        onChangeText={(val: string) => writeValue(val, 'email', draftUser)}
      />
      <UserInput
        label="Phone:"
        value={draftUser.phone}
        onChangeText={(val: string) => writeValue(val, 'phone', draftUser)}
      />
      <UserInput
        label="Cellphone:"
        value={draftUser.cell}
        onChangeText={(val: string) => writeValue(val, 'cell', draftUser)}
      />
      <Text style={styles.locationLabel}>Location:</Text>
      <View style={styles.locationContainer}>
        <UserInput
          label="Number"
          value={draftUser.location?.street.number?.toString()}
          onChangeText={(val: string) =>
            writeValue(parseInt(val, 10), 'location.street.number', draftUser)
          }
        />
        <UserInput
          label="Street"
          value={draftUser.location?.street.name}
          onChangeText={(val: string) =>
            writeValue(val, 'location.street.name', draftUser)
          }
        />
        <UserInput
          label="City"
          value={draftUser.location?.city}
          onChangeText={(val: string) =>
            writeValue(val, 'location.city', draftUser)
          }
        />
        <UserInput
          label="State"
          value={draftUser.location?.state}
          onChangeText={(val: string) =>
            writeValue(val, 'location.state', draftUser)
          }
        />
        <UserInput
          label="Postcode"
          value={draftUser.location?.postcode.toString()}
          onChangeText={(val: string) =>
            writeValue(val, 'location.postcode', draftUser)
          }
        />
        <UserInput
          label="Country"
          value={draftUser.location?.country}
          onChangeText={(val: string) =>
            writeValue(val, 'location.country', draftUser)
          }
        />
      </View>
    </ScrollView>
  );
};

const EditUserScreen = ({navigation, route}: EditUserScreenProps): Node => {
  const {id} = route.params;
  const retrievedUser: ?User = useSelector((state: UserState) =>
    state.users.find(u => u.id === id),
  );

  if (retrievedUser == null) {
    return <Text>Error when trying to display the user with email: {id}!</Text>;
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
