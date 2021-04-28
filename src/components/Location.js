// @flow
import * as React from 'react';
import {Text} from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

const Location = ({
  streetName,
  streetNum,
  city,
  state,
  postcode,
  country,
  onPress,
  style,
}: {
  streetName: ?string,
  streetNum: ?number,
  city: ?string,
  state: ?string,
  postcode: ?number,
  country: ?string,
  onPress?: any => any,
  style?: TextStyleProp,
}): React.Node => (
  <Text style={style} onPress={onPress}>
    {streetName} {streetNum}, {city} {state}, {postcode} {country}
  </Text>
);

export default Location;
