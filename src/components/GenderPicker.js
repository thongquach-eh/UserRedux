// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

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

const GenderPicker = ({
  label,
  value,
  onValueChange,
}: {
  label: string,
  value: ?string,
  onValueChange: ?(value: string | number, index: number) => mixed,
}): React.Node => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.value}
        itemStyle={styles.pickerItem}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item label="male" value="male" />
        <Picker.Item label="female" value="female" />
      </Picker>
    </View>
  );
};

export default GenderPicker;
