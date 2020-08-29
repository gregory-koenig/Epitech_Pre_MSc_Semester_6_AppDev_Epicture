import React from 'react';
import { Text, View} from 'react-native';
import WebView from 'react-native-webview';
import querystring from 'query-string';
import { connect } from 'react-redux';

class TokenRegister extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          startInLoadingState={false}
          source={{
            uri:
              'https://api.imgur.com/oauth2/authorize?client_id=e42d5f14de4e8d0&response_type=token',
          }}
        />
      </View>
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('#access_token') && this.props.profile.length === 0) {
      const action = {
        type: 'SET_PROFILE',
        value: querystring.parse(url.split('#').pop()),
      };
      this.props.dispatch(action);
      this.props.navigation.navigate('Home');
    }
  };
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(TokenRegister);
