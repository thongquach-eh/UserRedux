// @flow
import * as React from 'react';
import {StyleSheet, Linking, Text} from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

const Phone = ({
  value,
  style,
}: {
  value: string,
  style?: TextStyleProp,
}): React.Node => {
  return (
    <Text
      onPress={() => Linking.openURL('tel:' + value)}
      style={[styles.default, style]}>
      {value}
    </Text>
  );
};

export default Phone;
