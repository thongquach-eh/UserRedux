// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Field} from 'redux-form';
import type {FieldProps} from 'redux-form';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  label: {
    flexBasis: '25%',
    fontSize: 16,
    marginVertical: 3,
  },
  value: {
    flexBasis: '75%',
    fontSize: 16,
    marginVertical: 3,
  },
});

const renderDatePicker = (props: FieldProps) => {
  const {
    input: {onChange, value},
  } = props;

  const onDateChange = (event, val) => {
    onChange(val.toISOString());
  };

  return (
    <DateTimePicker
      value={value ? new Date(value) : new Date()}
      style={styles.value}
      onChange={(event, val) => onDateChange(event, val)}
    />
  );
};

type BirthDatePickerProps = {
  label: string,
};

const BirthDatePicker = (props: BirthDatePickerProps): React.Node => {
  const {label} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Field name="dob.date" component={renderDatePicker} />
    </View>
  );
};

export default BirthDatePicker;
