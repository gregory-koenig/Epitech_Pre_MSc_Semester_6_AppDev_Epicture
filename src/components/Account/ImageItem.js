import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';


class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
    this._isMounted = false;
  }
  UNSAFE_componentWillMount() {
    moment.updateLocale('en', {
      relativeTime: {
        mm: '%d min',
      },
    });

    const image = this.props.image;

  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const image = this.props.image;
    return (
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <View style={{flex: 1}}>
            <Text style={styles.title_text}>{image.title}</Text>
          </View>
          <Text>{moment(image.datetime * 1000).fromNow(true)}</Text>
        </View>
        <View style={styles.body_container}>
          <Image
            style={styles.image}
            source={{
              uri: image.link,
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#404040',
    borderRadius: 5,
  },
  image: {
    flex: 1,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  header_container: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_text: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  body_container: {
    justifyContent: 'center',
    paddingBottom: 5,
  },
  footer_container: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
    backgroundColor: '#4D4D4D',
    flex: 1,
  },
});
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ImageItem);
