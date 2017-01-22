import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/MaterialIcons';

import RNFetchBlob from 'react-native-fetch-blob'

const blue = '#5fb5fe';

const prompts = [
  'How was your day?', 
  'What happened today?', 
  'How are you feeling?',
  'What\'s up?'];

function randomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

const green = '#4CAF50';

export default class Prompts extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac'
    };

    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._play = this._play.bind(this);
  }
  prepareRecordingPath(audioPath){
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "High",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }
  componentDidMount() {
    this.prepareRecordingPath(this.state.audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.status == "OK"});
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${data.audioFileURL}`);
    };
  }

  _start() {

    if(this.state.stoppedRecording){
        this.prepareRecordingPath(this.state.audioPath);
      }
          AudioRecorder.startRecording();
    this.setState({
      recording: true
    })
  }
  _stop() {
    if (this.state.recording) {
        AudioRecorder.stopRecording();
        this.setState({stoppedRecording: true, recording: false});

        console.log(this.state.audioPath);
        RNFetchBlob.fs.readFile(this.state.audioPath, 'base64')
          .then((data) => {
            console.log(data);
            RNFetchBlob.fetch('POST', 'http://73f584e6.ngrok.io/new_session', {
              'Content-Type' : 'application/octet-stream',
            }, data)
            .then((res) => {
              console.log(res.text());
            })
            .catch((err) => {
              console.log(err);
            })
          })

    }
  }

   _play() {
      this._stop();
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
             console.log('successfully finished playing');
           } else {
             console.log('playback failed due to audio decoding errors');
           }
        });
      }, 500)
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.recording? "Recording..." : randomPrompt()}
        </Text>
        <TouchableNativeFeedback
          onPressIn={this._start}
          onPressOut={this._stop}
          background={TouchableNativeFeedback.SelectableBackground()}
          style={{borderRadius: 70}}>
          <View style={[styles.playButton, {backgroundColor: this.state.recording? green: blue}]}>
            <Icon name="mic" size={45} color="#FFF" />
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={this._play}
          background={TouchableNativeFeedback.SelectableBackground()}
          style={{borderRadius: 70}}>
          <View style={[styles.playButton, {backgroundColor: '#f00' }]}>
            <Icon name="mic" size={45} color="#FFF" />
          </View>
        </TouchableNativeFeedback>

        {this.state.recording? 
          <Text style={styles.instructions}>{this.state.currentTime}s</Text> :  
          <Text style={styles.instructions}>Press and hold to record your answer
          </Text>}

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
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
    instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
  },
});
