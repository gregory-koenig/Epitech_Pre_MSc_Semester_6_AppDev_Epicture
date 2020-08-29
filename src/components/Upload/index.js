import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import customStyles from 'src/utils/styles';
import styles from './styles'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { postImage } from '../../api/IMGURApi';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {avatarSource: null}
  }

  _selectImage = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri, data: response.data };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  _uploadImage = () => {
    postImage(this.state.avatarSource.data, this.props.profile).then((data) => {
      if (data.success) {
        this.setState({
          avatarSource: null,
        });
      }
    });
  }

  _removeImage = () => {
    this.setState({
      avatarSource: null,
    })
  }

  render() {
    if (this.state.avatarSource) {
      return (
        <View style={[customStyles.container, {flex: 1, alignItems: 'center', padding: 15}]}>
          <Image source={this.state.avatarSource} style={{height: 250, width: 250}} />
          <View style={{flexDirection: 'row', margin: 5}}>
            <Button onPress={this._uploadImage} title="Yes" />
            <Button onPress={this._removeImage} color="red" title="No" />
          </View>
        </View>
      )
    }
    return (
      <View style={customStyles.principalContainer}>
        <Text style={customStyles.principalTitle}>Upload</Text>
        <Button onPress={this._selectImage} title="Select Picture" />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Upload);
