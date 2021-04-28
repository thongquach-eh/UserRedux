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

const StringInput = ({
  label,
  value,
  onChangeText,
}: {
  label: string,
  value?: ?string,
  onChangeText?: ?(text: string) => mixed,
}): React.Node => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.value}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default StringInput;
