import React from 'react';
import { View, Text, ActivityIndicator, Button, FlatList } from 'react-native';
import customStyles from 'src/utils/styles';
import { connect } from 'react-redux';
import { getFavoritesFromApi } from '../../api/IMGURApi';
import GalleryItem from '../Search/GalleryItem';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorites: [], isLoading: true, refreshing: false };
    this._isMounted = false;
    this.flatList = null;
    this.page = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator,
    });
  }

  tapOnTabNavigator = () => {
    this.flatList.scrollToOffset({ animated: true, offset: 0 });
  }

  _loadFavorites() {
    getFavoritesFromApi(this.page++, this.props.profile).then((data) => {
      if (this._isMounted) {
        this.setState({ isLoading: false });
        if (data.success) this.setState({ favorites: data.data });
      }
    });
  }

  onRefresh() {
    this.page = 0;
    this._loadFavorites();
  }

  render() {
    if (!this._isMounted) {
      this._loadFavorites();
    }
    if (this.state.isLoading) {
      return (
        <View style={customStyles.principalContainer}>
          <ActivityIndicator size={58} color="green" />
        </View>
      );
    }
    if (this.state.favorites.length === 0) {
      return (
        <View style={customStyles.principalContainer}>
          <View style={customStyles.errorView}>
            <Text>No data found press button to refresh</Text>
            <Button title="Refresh" onPress={() => this.onRefresh()} />
          </View>
        </View>
      );
    }
    return (
      <View style={[customStyles.container, {flex: 1}]}>
        <FlatList
          ref={(ref) => {this.flatList = ref;}}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          data={this.state.favorites}
          renderItem={({ item }) => <GalleryItem gallery={item} />}
        />
      </View>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Favorite);
