import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from './src/utils/variables';

import ApplicationLoading from './src/components/ApplicationLoading';
import Favorite from './src/components/Favorite';
import Home from './src/components/Home';
import Search from './src/components/Search';
import Account from './src/components/Account';
import Upload from './src/components/Upload';
import TokenRegister from './src/components/TokenRegister';


const AppNavigator = createStackNavigator(
  {
    Home,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const getScreenRegisteredFunctions = navState => {
  // When we use stack navigators.
  // Also needed for react-navigation@2
  const { routes, index, params } = navState;

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredFunctions(routes[index]);
  }
  // When we have the final screen params
  else {
    return params;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarIcon: () => <Icon name="home" size={30} color={colors.white} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation && navigation.isFocused()) {
            const screenFunctions = getScreenRegisteredFunctions(
              navigation.state,
            );
            if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
              screenFunctions.tapOnTabNavigator();
            }
          }
          defaultHandler();
        },
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: () => <Icon name="search" size={30} color={colors.white} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation && navigation.isFocused()) {
            const screenFunctions = getScreenRegisteredFunctions(
              navigation.state,
            );
            if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
              screenFunctions.tapOnTabNavigator();
            }
          }
          defaultHandler();
        },
      },
    },
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarIcon: () => <Icon name="favorite" size={30} color={colors.white} />,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation && navigation.isFocused()) {
            const screenFunctions = getScreenRegisteredFunctions(
              navigation.state,
            );
            if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
              screenFunctions.tapOnTabNavigator();
            }
          }
          defaultHandler();
        },
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarIcon: () => <Icon name="account-circle" size={30} color={colors.white} />,
      },
    },
    Upload: {
      screen: Upload,
      navigationOptions: {
        tabBarIcon: () => <Icon name="photo-camera" size={30} color={colors.white} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: colors.lightGray,
      inactiveBackgroundColor: colors.gray,
      showLabel: false,
      showIcon: true,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      ApplicationLoading,
      TokenRegister,
      App: {
        screen: TabNavigator,
        path: '',
      },
    },
    {
      initialRouteName: 'ApplicationLoading',
    },
  ),
);
