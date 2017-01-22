import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const blue = '#5fb5fe';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tap to start sharing your day...
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
  playButton: {
    width: 70, 
    height: 70, 
    borderRadius: 70,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 50
  },
});
