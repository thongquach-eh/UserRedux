// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import StringInput from './StringInput';
import TitlePicker from './TitlePicker';
import type {User} from '../types.js';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const FullNameInput = ({
  user,
  writeValue,
}: {
  user: User,
  writeValue: (value: string | number, path: string, u: User) => void,
}): React.Node => {
  return (
    <View style={styles.container}>
      <TitlePicker
        label="Title"
        value={user.name.title}
        onValueChange={val => writeValue(val, 'name.title', user)}
      />
      <StringInput
        label="First name:"
        value={user.name.first}
        onChangeText={val => writeValue(val, 'name.first', user)}
      />
      <StringInput
        label="Last name:"
        value={user.name.last}
        onChangeText={val => writeValue(val, 'name.last', user)}
      />
    </View>
  );
};

export default FullNameInput;
