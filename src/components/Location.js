// @flow
import * as React from 'react';
import {Text} from 'react-native';

const Location = ({
  streetName,
  streetNum,
  city,
  state,
  postcode,
  country,
}: {
  streetName: ?string,
  streetNum: ?number,
  city: ?string,
  state: ?string,
  postcode: ?string,
  country: ?string,
}): React.Node => (
  <Text>
    {streetName} {streetNum}, {city} {state}, {postcode} {country}
  </Text>
);

export default Location;
