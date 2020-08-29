/**
 * @format
 */

// import TestFairy from 'react-native-testfairy';
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Container, Root, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import Store from 'src/store/configureStore';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { name as appName } from './app.json';
import AppNavigator from './AppNavigator';

LogBox.ignoreAllLogs();
const app = () => (
  <StyleProvider style={getTheme(commonColor)}>
    <Root>
      <Container>
        <Provider store={Store}>
          <AppNavigator />
        </Provider>
      </Container>
    </Root>
  </StyleProvider>
);

// TestFairy.begin('xxx');
AppRegistry.registerComponent(appName, () => app);
