// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const BirthDatePicker = ({
  label,
  value,
  onChange,
}: {
  label: string,
  value: ?Date,
  onChange: ?(event: any, date: string) => mixed,
}): React.Node => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker value={value} onChange={onChange} style={styles.value} />
    </View>
  );
};

export default BirthDatePicker;
