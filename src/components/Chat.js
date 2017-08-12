import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { receiveMessage } from '../actions/chat';

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  }
});

class ChatComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      isLoadingEarlier: false,
      username: "guest1"
    };

    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

  }
  

  componentDidMount() {
    receiveMessage((msg) => this.props.newMsg(msg));
  }

  componentWillMount() {
    //this.props.getChats();
  }
  
  //
  componentWillReceiveProps(nextProps) {
    //Alert.alert('Received ', JSON.stringify(nextProps.chat.chats));
    
    console.log(nextProps.chat.chats);

    this._storeMessages(nextProps.chat.chats);
  }

  onSend(messages = []) {
    //Alert.alert('onSend: ', JSON.stringify(messages));
    console.log('onSend: ', messages);
    this.props.sendChat(this.state.username, messages[0]);
    this._storeMessages(messages[0]);
  }


  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderFooter(props) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
  }

  /**
   * 
   */
  render() {
    const user = { _id: 1 };
    // renderBubble={this.renderBubble}
    // renderFooter={this.renderFooter}
    return (
        <GiftedChat
          
          messages={this.state.messages}
          onSend={this.onSend}
          user={user}
          renderBubble={this.renderBubble}
          renderFooter={this.renderFooter}
        />
    );
  }


  /**
   * 
   * @param {*} messages 
   * /*return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
   */
  _storeMessages(messages) {
    

    //messages[0]._id = Math.round(Math.random() * 1000000);
    //messages[0].createdAt = new Date();
    console.log('setState: ', messages);
    this.setState((previousState) => {
      
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };

      
    });
  }

}

export default ChatComponent;