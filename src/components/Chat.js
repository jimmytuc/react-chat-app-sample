import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';

import { GiftedChat, Bubble, Actions } from 'react-native-gifted-chat';

import { receiveMessage } from '../actions/chat';

//import CustomActions from './CustomAction';
import CustomView from './CustomView';

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
      typingText: null,
      loadEarlier: true,
      isLoadingEarlier: false,
      username: "guest1"
    };

    this.onSend = this.onSend.bind(this);
    this.renderCustomView = this.renderCustomView.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

  }
  
  /**
   * 
   */
  componentDidMount() {
    receiveMessage((msg) => this.props.newMsg(msg));
  }

  /**
   * 
   */
  componentWillMount() {

    const welcomeMsgs = [
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Xin chào, hôm nay bạn thấy thế nào ?',
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 99,
            name: "@nana"
        }
      }
    ];
    this._storeMessages(welcomeMsgs);
  }
  
  /**
   * 
   * @param {*} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.chat.chats);

    this._storeMessages(nextProps.chat.chats);
  }

  /**
   * 
   * @param {*} messages 
   */
  onSend(messages = []) {
    //console.log('onSend: ', messages);
    this.props.sendChat(this.state.username, messages[0]);
    this._storeMessages(messages[0]);

    this._botTyping(messages);
  }
  
  /**
   * 
   * @param {*} messages 
   */
  _botTyping(messages) {
    if (messages.length > 0) {
      if (messages[0]) {
        this.setState((previousState) => {
          return {
            typingText: '@nana is typing'
          };
        });
      }
    }

    // hide appear
    setTimeout(() => {
      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
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
   * @param {*} props 
   */
  renderActions(props) {
    /*if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }*/
    const options = {
      'Camera': (props) => {
        alert('This function will not work in simulator');
      },
      'Choose from Library': (props) => {
        alert('This function will not work in simulator');
      },
      'Send Location': (props) => {
        alert('This function will not work in simulator');
      },
      'Alfacore': (props) => {
        alert('About Alfacore');
      },
      'Contact': (props) => {
        alert('Contact us');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  /**
   * 
   * @param {*} props 
   */
  renderCustomView(messages) {
    console.log(messages);
    return (
      <CustomView
        {...messages}
      />
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
          renderActions={this.renderActions}
          renderBubble={this.renderBubble}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
        />
    );
  }


  /**
   * 
   * @param {*} messages 
   */
  _storeMessages(messages) {
    //console.log('setState: ', messages);
    this.setState((previousState) => {
      
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };

      
    });
  }

}

export default ChatComponent;