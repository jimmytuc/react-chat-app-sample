import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toChat = () => {
    this.props.navigation.navigate('Chat');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to AlfaCore Platform!
        </Text>
        <TouchableOpacity onPress={this.toChat}>
          <Text style={styles.instructions}>Navigate to Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
