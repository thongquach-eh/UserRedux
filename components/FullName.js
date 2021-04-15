// @flow
import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullName: {
    fontSize: 20,
  },
});

const FullName = ({
  title,
  first,
  last,
}: {
  title: ?string,
  first: string,
  last: string,
}): React.Node => (
  <Text style={styles.fullName}>
    {title && title + '. '}
    {first} {last}
  </Text>
);

export default FullName;
