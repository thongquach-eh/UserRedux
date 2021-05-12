import 'react-native';
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {HomeScreen} from '../components';
import {NavigationContainer} from '@react-navigation/native';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

describe('Home screen', () => {
  // test('snapshot test', () => {
  //   const component = (
  //     <NavigationContainer>
  //       <HomeScreen />
  //     </NavigationContainer>
  //   );
  //   const tree = renderer.create(component).toJSON();

  //   expect(tree).toMatchSnapshot();
  // });

  test('navigate to User List screen', () => {
    const component = (
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    const {debug, getByTestId, getByText, getAllByTestId, queryByText} = render(
      component,
    );

    const goToUserListBtn = getByText('Go to User List');
    fireEvent.press(goToUserListBtn);
    // debug();
  });
});
