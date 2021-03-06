// @flow
import React, {useLayoutEffect, useCallback} from 'react';
import type {Node} from 'react';
import {View, Text, StyleSheet, Image, Linking, Button} from 'react-native';
import FullName from './FullName';
import Phone from './Phone';
import Email from './Email';
import Location from './Location';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList, RootState, User} from '../types.js';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    marginTop: 24,
    marginBottom: 8,
  },
  detailsContainer: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailLabel: {
    flexBasis: '25%',
    fontSize: 16,
    marginVertical: 2,
  },
  detailInfo: {
    flexBasis: '75%',
    fontSize: 16,
    marginVertical: 2,
  },
  locationInfo: {
    flexBasis: '75%',
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

type UserDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UserDetails'>,
  route: RouteProp<RootStackParamList, 'UserDetails'>,
};

const openMaps = location => {
  let searchableAddress = [
    location.city,
    location.state,
    location.country,
  ].join(',');
  searchableAddress = searchableAddress.replace(/\s/g, '+');

  Linking.openURL('https://www.google.com/maps?q=' + searchableAddress);
};

const UserDetailsScreen = ({
  navigation,
  route,
}: UserDetailsScreenProps): Node => {
  const {id} = route.params;
  const noUserMessage = `Error when trying to display the user with ID: ${id}!`;
  const user: ?User = useSelector((state: RootState) =>
    state.user.users.find(u => u.id === id),
  );

  const navigateToEditUserScreen = useCallback(
    (editingUser: ?User): void => {
      if (editingUser == null) {
        // eslint-disable-next-line no-alert
        alert(noUserMessage);
      } else {
        navigation.navigate('EditUser', {
          user: editingUser,
        });
      }
    },
    [navigation, noUserMessage],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Edit" onPress={() => navigateToEditUserScreen(user)} />
      ),
    });
  }, [navigateToEditUserScreen, navigation, user]);

  if (user == null) {
    return <Text>{noUserMessage}</Text>;
  }

  const name = user.name;
  const location = user.location;

  return (
    <>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.picture?.large,
          }}
        />
        <FullName title={name.title} first={name.first} last={name.last} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Gender:</Text>
        <Text style={styles.detailInfo}>{user.gender}</Text>
        <Text style={styles.detailLabel}>Email:</Text>
        <Email value={user.email} style={styles.detailInfo} />
        <Text style={styles.detailLabel}>Phone:</Text>
        <Phone value={user.phone || ''} style={styles.detailInfo} />
        <Text style={styles.detailLabel}>Location:</Text>
        {location && (
          <Location
            streetName={location.street?.name}
            streetNum={location.street?.number}
            city={location.city}
            state={location.state}
            postcode={location.postcode}
            country={location.country}
            onPress={() => openMaps(location)}
            style={styles.locationInfo}
          />
        )}
      </View>
    </>
  );
};

export default UserDetailsScreen;
