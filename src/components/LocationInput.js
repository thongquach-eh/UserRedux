// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StringInput from './StringInput';
import type {Location} from '../types.js';

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
  location,
  onChange,
}: {
  label: string,
  location: Location,
  onChange: (value: Location) => mixed,
}): React.Node => {
  if (!location) {
    location = {
      street: {
        number: null,
        name: '',
      },
      city: '',
      state: '',
      postcode: null,
      country: '',
    };
  }

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <StringInput
          label="Number"
          value={location?.street?.number?.toString()}
          onChangeText={val =>
            onChange({
              ...location,
              street: {
                ...location.street,
                number: parseInt(val, 10),
              },
            })
          }
        />
        <StringInput
          label="Street"
          value={location?.street?.name}
          onChangeText={val =>
            onChange({
              ...location,
              street: {
                ...location.street,
                name: val,
              },
            })
          }
        />
        <StringInput
          label="City"
          value={location?.city}
          onChangeText={val => onChange({...location, ['city']: val})}
        />
        <StringInput
          label="State"
          value={location?.state}
          onChangeText={val => onChange({...location, ['state']: val})}
        />
        <StringInput
          label="Postcode"
          value={location?.postcode?.toString()}
          onChangeText={val =>
            onChange({...location, ['postcode']: parseInt(val, 10)})
          }
        />
        <StringInput
          label="Country"
          value={location?.country}
          onChangeText={val => onChange({...location, ['country']: val})}
        />
      </View>
    </>
  );
};

export default LocationInput;
