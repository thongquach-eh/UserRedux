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

type TitlePickerProps = {
  ...FieldProps,
  label: string,
};

const TitlePicker = (props: TitlePickerProps): React.Node => {
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
        <Picker.Item label="Mr" value="Mr" />
        <Picker.Item label="Ms" value="Ms" />
        <Picker.Item label="Mrs" value="Mrs" />
      </Picker>
    </View>
  );
};

export default TitlePicker;
