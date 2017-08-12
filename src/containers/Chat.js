import React, { Component, PropTypes } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { apiGetChats, apiSendChat, receiveMessage } from '../actions/chat';

import ChatComponent from '../components/Chat';

//import * as ChatActions from '../actions/chat';

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
        receiveMsg: () => receiveMessage(dispatch)
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

  render() {
    return (
      <View style={styles.container}>
        <ChatComponent {...this.props} />
        <TouchableOpacity onPress={this.handleBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
