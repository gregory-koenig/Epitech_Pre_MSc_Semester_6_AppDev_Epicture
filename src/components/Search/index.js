import React from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import GalleryItem from './GalleryItem';
import {getImageFromApiWithSearchedText} from '../../api/IMGURApi';
import styles from './styles';
import customStyles from '../../utils/styles';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.state = {gallery: [], isLoading: false};
    this.searchedText = '';
    this.flatList = null;
  }
  _loadGalleries() {
    if (this.searchedText.length > 0) {
      this.setState({isLoading: true});
      getImageFromApiWithSearchedText(this.searchedText, this.page++, this.props.profile).then(
        (data) => {
          this.setState({
            gallery: [...this.state.gallery, ...data.data],
            isLoading: false,
          });
        },
      );
    }
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

  _searchGalleries() {
    this.page = 0;
    this.setState(
      {
        gallery: [],
      },
      () => {
        this._loadGalleries();
      },
    );
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator color="green" size="large" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[customStyles.container, {flex: 1}]}>
        <TextInput
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchGalleries()}
          style={{backgroundColor: 'white'}}
          placeholder="Titre de l'image"
        />
        <Button
          style={{height: 50, padding: 10}}
          title="Rechercher"
          onPress={() => {
            this._searchGalleries();
          }}
        />
        <FlatList
          ref={(ref) => {this.flatList = ref;}}
          style={{backgroundColor: '#272727'}}
          data={this.state.gallery}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={7}
          renderItem={({item}) => <GalleryItem gallery={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => this._loadGalleries()}
        />
        {this._displayLoading()}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Search);
