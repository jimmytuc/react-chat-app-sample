import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { apiGetChats, apiSendChat, newMessage } from '../actions/chat';

import ChatComponent from '../components/Chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  back: {
    margin: 10,
    fontSize: 20
  }
});

@connect(
  state => ({
    chat: state.chat
  }),
  // mapping
  //dispatch => bindActionCreators(ChatActions, dispatch)
  dispatch => {
    return {
        getChats: () => dispatch(apiGetChats()),
        sendChat: (sender, msg) => dispatch(apiSendChat(sender, msg)),
        newMsg: (msg) => dispatch(newMessage(msg))
    }
  }
)

export default class ChatContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  /**
   * {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    }
   */
  render() {
    /*return (
      <View style={styles.container}>
        <ChatComponent {...this.props} />
        <TouchableOpacity onPress={this.handleBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
    );*/
    return(
        <ChatComponent {...this.props} />
      );
  }
}
