import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import type { NavigationScreenProp, NavigationState } from 'react-navigation';
import _ from 'lodash/fp';
import splashScreen from '../../assets/images/splash_screen.png';
import styles from './styles';
import { connect } from 'react-redux';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
};

type State = {
  endedTimer: boolean,
};

class ApplicationLoading extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      endedTimer: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ endedTimer: true }), 1500);
  }

  componentDidUpdate() {
    const { navigation } = this.props;
    const { endedTimer } = this.state;

    endedTimer
      && AsyncStorage.getItem('token').then((token) => {
        !_.isNil(token)
          ? navigation.navigate('App')
          : navigation.navigate('TokenRegister');
      });
  }

  render() {
    return (
      <View style={styles.view}>
        <ImageBackground source={splashScreen} style={styles.image}>
          <Spinner />
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ApplicationLoading);
