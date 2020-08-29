import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import {
  getAcountFromApiWithAccountUrl,
  getCommentsFromGallery,
  postFavoriteGallery,
  postVoteGallery,
} from '../../api/IMGURApi';
import CommentItem from "./CommentItem";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleDown, faArrowCircleUp, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';


class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      favorite: false,
      favorite_count: 0,
      ups: 0,
      downs: 0,
      vote: null,
    };
    this._isMounted = false;
  }
  UNSAFE_componentWillMount() {
    moment.updateLocale('en', {
      relativeTime: {
        mm: '%d min',
      },
    });

    const gallery = this.props.gallery;
    this.setState({
      favorite: gallery.favorite,
      favorite_count: gallery.favorite_count,
      ups: gallery.ups,
      downs: gallery.downs,
      vote: gallery.vote,
    });
    getAcountFromApiWithAccountUrl(this.props.gallery.account_url, this.props.profile).then(
      (data) => {
        if (this._isMounted) {
          this.setState({user: data.data});
        }
      },
    );
    getCommentsFromGallery(this.props.gallery.id, this.props.profile).then((data) => {
      if (this._isMounted) {
        this.setState({comments: data.data});
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  _favoriteToggle() {
    postFavoriteGallery(this.props.gallery.id, this.props.profile);
    if (this.state.favorite) {
      this.setState({favorite_count: this.state.favorite_count - 1});
    } else {
      this.setState({favorite_count: this.state.favorite_count + 1});
    }
    this.setState({favorite: !this.state.favorite});
  }

  _upsToggle() {
    const vote = this.state.vote;
    if (vote == null || vote === 'veto' || vote === 'down') {
      postVoteGallery(this.props.gallery.id, 'up', this.props.profile);
      this.setState({vote: 'up', ups: this.state.ups + 1});
      if (vote === 'down') {
        this.setState({downs: this.state.downs - 1});
      }
    } else {
      postVoteGallery(this.props.gallery.id,'veto', this.props.profile);
      this.setState({vote: null, ups: this.state.ups - 1});
    }
  }

  _downsToggle() {
    const vote = this.state.vote;
    if (vote == null || vote === 'veto' || vote === 'up') {
      postVoteGallery(this.props.gallery.id, 'down', this.props.profile);
      this.setState({vote: 'down', downs: this.state.downs + 1});
      if (vote === 'up') {
        this.setState({ups: this.state.ups - 1});
      }
    } else {
      postVoteGallery(this.props.gallery.id, 'veto', this.props.profile);
      this.setState({vote: null, downs: this.state.downs - 1});
    }
  }
  _showComment() {
    if (this.state.comments && this.state.comments.length) {
      return (<CommentItem comment={this.state.comments[0]} />);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const gallery = this.props.gallery;
    const user = this.state.user;
    return (
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <Image
            source={{
              uri: user.avatar,
            }}
            style={{
              marginRight: 10,
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={styles.title_text}>{gallery.title}</Text>
            <Text style={{color: '#A7A7A7'}}>{user.url}</Text>
          </View>
          <Text>{moment(gallery.datetime * 1000).fromNow(true)}</Text>
        </View>
        <View style={styles.body_container}>
          <Image
            style={styles.image}
            source={{
              uri: gallery.images
                ? gallery.images[0].link
                : 'https://thumbs.dreamstime.com/b/no-image-available-icon-vector-illustration-flat-design-140476186.jpg',
            }}
          />
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 10,
              paddingLeft: 10,
            }}>
            <TouchableOpacity
              onPress={() => this._upsToggle()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                color={this.state.vote === 'up' ? 'green' : 'white'}
                size={32}
                icon={faArrowCircleUp}
              />
              <Text style={{color: 'white'}}>{this.state.ups}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._downsToggle()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                color={this.state.vote === 'down' ? 'red' : 'white'}
                size={32}
                icon={faArrowCircleDown}
              />
              <Text style={{color: 'white'}}>{this.state.downs}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._favoriteToggle()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                color={this.state.favorite ? 'red' : 'white'}
                size={32}
                icon={this.state.favorite ? faHeart : farHeart}
              />
              <Text style={{color: 'white'}}>{this.state.favorite_count}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer_container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#A7A7A7'}}>
              {gallery.comment_count} Comments
            </Text>
            <Text style={{color: '#C7C4C4', fontWeight: 'bold'}}>
              Add Comment
            </Text>
          </View>
          {this._showComment()}
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

export default connect(mapStateToProps)(GalleryItem);
