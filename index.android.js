/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import Home from './routes/home';
import Prompts from './routes/prompts';
import Recording from './routes/recording';

export default class android extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      home: true
    }

    this._onPressButton = this._onPressButton.bind(this);
  }
  _onPressButton() {
    this.setState({home: false});
  }
  render() {
    if (this.state.home) {

      return <Home onPressButton={this._onPressButton}/>;
    }
    else {
      return <Prompts></Prompts>;
    }

  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('android', () => android);
