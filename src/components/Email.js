// @flow
import * as React from 'react';
import {Text, StyleSheet, Linking} from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

const Email = ({
  value,
  style,
}: {
  value: string,
  style?: TextStyleProp,
}): React.Node => (
  <Text
    onPress={() => Linking.openURL('mailto:' + value)}
    style={[styles.default, style]}>
    {value}
  </Text>
);

export default Email;
