/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AppNavigator from '../AppNavigator';

it('renders correctly', () => {
  renderer.create(<AppNavigator />);
});
