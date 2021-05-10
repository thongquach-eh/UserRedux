// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StringInput from './StringInput';
import {Field} from 'redux-form';

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  container: {
    marginLeft: 10,
  },
});

type LocationInputProps = {
  label: string,
};

const LocationInput = (props: LocationInputProps): React.Node => {
  const {label} = props;

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Field
          name="location.street.number"
          parse={(value: string) => Number(value)}
          format={(value: ?number) => (value ? value.toString() : '')}
          component={StringInput}
          props={{label: 'Number:'}}
        />
        <Field
          name="location.street.name"
          component={StringInput}
          props={{label: 'Street:'}}
        />
        <Field
          name="location.city"
          component={StringInput}
          props={{label: 'City:'}}
        />
        <Field
          name="location.state"
          component={StringInput}
          props={{label: 'State:'}}
        />
        <Field
          name="location.postcode"
          parse={(value: string) => Number(value)}
          format={(value: ?number) => (value ? value.toString() : '')}
          component={StringInput}
          props={{label: 'Postcode:'}}
        />
        <Field
          name="location.country"
          component={StringInput}
          props={{label: 'Country:'}}
        />
      </View>
    </>
  );
};

export default LocationInput;
