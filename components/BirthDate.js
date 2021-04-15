// @flow
import * as React from 'react';
import {Text} from 'react-native';

const BirthDate = ({date}: {date: string}): React.Node => (
  <Text>
    {new Date(date).toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
  </Text>
);

export default BirthDate;
