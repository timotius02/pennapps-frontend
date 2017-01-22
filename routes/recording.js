import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const green = '#4CAF50';

function randomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export default class Recording extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Recording...
        </Text>
        <TouchableNativeFeedback
          onPress={this.props.onPressButton}
          background={TouchableNativeFeedback.SelectableBackground()}
          style={{borderRadius: 70}}>
          <View style={styles.playButton}>
            <Icon name="mic" size={45} color="#FFF" />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 50
  },
  playButton: {
    width: 70, 
    height: 70, 
    borderRadius: 70,
    backgroundColor: green,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
