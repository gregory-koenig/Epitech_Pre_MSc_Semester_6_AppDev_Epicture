import React from 'react';
import {Image, Text, View} from 'react-native';
import {getAcountFromApiWithAccountUrl} from '../../api/IMGURApi';
import moment from 'moment';
import { connect } from 'react-redux';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {author: []};
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    getAcountFromApiWithAccountUrl(this.props.comment.author).then((data) => {
      if (this._isMounted) {
        this.setState({author: data.data});

      }
    });
  }

  render() {
    const comment = this.props.comment;

    const author = this.state.author;
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Image
          style={{
            marginRight: 10,
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
          }}
          source={{uri: author.avatar}}
        />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#A7A7A7', fontSize: 12}}>{comment.author} - {moment(comment.datetime * 1000).fromNow(true)}</Text>
          </View>
          <Text style={{color: 'white'}} numberOfLines={4}>{comment.comment}</Text>
        </View>
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

export default connect(mapStateToProps)(CommentItem);
