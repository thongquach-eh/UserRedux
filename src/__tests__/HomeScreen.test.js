import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {HomeScreen} from '../components';

describe('Home screen', () => {
  it('should render properly', () => {
    const component = <HomeScreen />;
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
