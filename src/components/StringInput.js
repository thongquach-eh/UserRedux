// @flow
import * as React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import type {FieldProps} from 'redux-form';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    flexBasis: '25%',
    fontSize: 16,
    marginVertical: 3,
  },
  value: {
    flexBasis: '75%',
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 3,
  },
});

type StringInputProps = {
  ...FieldProps,
  label: string,
};

const StringInput = (props: StringInputProps): React.Node => {
  const {
    input: {value, onChange},
    label,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.value} value={value} onChangeText={onChange} />
    </View>
  );
};

export default StringInput;
