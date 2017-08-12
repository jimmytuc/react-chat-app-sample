import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

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


export default class Chat extends Component {

  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      isLoadingEarlier: false,
      username: "guest1"
    };

    // get props
    //this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);

    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  /**
   * init
   * get lastest message
   */
  componentWillMount() {
    //this._isMounted = true; 
  }

  /**
   * listen handler
   */
  componentDidMount() {
    this.props.getChats();
    this.props.receiveMessage();
    this.setState(() => {
      return {
        messages: this.props.chat,
      };
    });
  }

  /**
   * 
   */
  componentWillUnmount() {
    //this._isMounted = false;
  }

  /**
   * 
   */
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true
      }
    });

    // get history message
    /*setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, chats),
            loadEarlier: false,
            isLoadingEarlier: false
          };
        });
      }
    }, 1000); // simulating network*/
  }

  /**
   * 
   * @param {Array} messages 
   */
  onSend(messages = []) {
    this.props.apiSendChat(this.state.username, messages[0]);
    this._storeMessages(messages);
  }

  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  /**
   * 
   * @param {*} props 
   */
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
  
  /**
   * 
   * @param {*} props 
   */
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  /**
   * 
   */
  render() {
    const user = { _id: this.state.username || -1 };

    console.log(this.props.chat);
    if (this.props.messages.isFetching) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator
                    animating={true}
                    size="large"
                />
            </View>
        )
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={user}
        renderBubble={this.renderBubble}
        renderFooter={this.renderFooter}
      />
    );
  }

}
