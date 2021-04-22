// @flow
import * as React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';

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

const UserInput = ({
  label,
  onChangeText,
}: {
  label: string,
  onChangeText?: any => any,
}): React.Node => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.value} onChangeText={onChangeText} />
    </View>
  );
};

export default UserInput;
