// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
  pickerItem: {
    fontSize: 16,
  },
});

type GenderPickerProps = {
  ...FieldProps,
  label: string,
};

const GenderPicker = (props: GenderPickerProps): React.Node => {
  const {
    input: {value, onChange},
    label,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.value}
        itemStyle={styles.pickerItem}
        selectedValue={value}
        onValueChange={onChange}>
        <Picker.Item label="male" value="male" />
        <Picker.Item label="female" value="female" />
      </Picker>
    </View>
  );
};

export default GenderPicker;
