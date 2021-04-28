// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import StringInput from './StringInput';
import TitlePicker from './TitlePicker';
import type {FullName} from '../types.js';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const FullNameInput = ({
  name,
  onChange,
}: {
  name: FullName,
  onChange: (value: FullName) => mixed,
}): React.Node => {
  return (
    <View style={styles.container}>
      <TitlePicker
        label="Title"
        value={name.title}
        onValueChange={val => onChange({...name, ['title']: val.toString()})}
      />
      <StringInput
        label="First name:"
        value={name.first}
        onChangeText={val => onChange({...name, ['first']: val})}
      />
      <StringInput
        label="Last name:"
        value={name.last}
        onChangeText={val => onChange({...name, ['last']: val})}
      />
    </View>
  );
};

export default FullNameInput;
