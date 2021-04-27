// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StringInput from './StringInput';
import type {User} from '../types.js';

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  container: {
    marginLeft: 10,
  },
});

const LocationInput = ({
  label,
  user,
  writeValue,
}: {
  label: string,
  user: User,
  writeValue: (value: string | number, path: string, u: User) => void,
}): React.Node => {
  const location = user.location;

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <StringInput
          label="Number"
          value={location?.street.number?.toString()}
          onChangeText={(val: string) =>
            writeValue(parseInt(val, 10), 'location.street.number', user)
          }
        />
        <StringInput
          label="Street"
          value={location?.street.name}
          onChangeText={(val: string) =>
            writeValue(val, 'location.street.name', user)
          }
        />
        <StringInput
          label="City"
          value={location?.city}
          onChangeText={(val: string) => writeValue(val, 'location.city', user)}
        />
        <StringInput
          label="State"
          value={location?.state}
          onChangeText={(val: string) =>
            writeValue(val, 'location.state', user)
          }
        />
        <StringInput
          label="Postcode"
          value={location?.postcode.toString()}
          onChangeText={(val: string) =>
            writeValue(val, 'location.postcode', user)
          }
        />
        <StringInput
          label="Country"
          value={location?.country}
          onChangeText={(val: string) =>
            writeValue(val, 'location.country', user)
          }
        />
      </View>
    </>
  );
};

export default LocationInput;
