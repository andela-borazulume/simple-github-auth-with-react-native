/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from "./Login";
import AppContainer from "./AppContainer";

import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AuthService from './AuthService';

export default class simpleIOSApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount () {
    console.log('getting here')
    AuthService.getAuthInfo((err, authInfo) => {
      console.log(err, 'authInfo')
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  onLogin() {
    console.log(this.state,'islogged in');
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size='large'
            style={styles.loader}>
          </ActivityIndicator>
        </View>
      );
    }
    if (this.state.isLoggedIn) {
      return (
        <View>
          <Text>I am here oooo</Text>  
          {/* add AppContainer here */}        
        </View>
      
      );
    } else {
      return(
        <Login onLogin={this.onLogin} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('simpleIOSApp', () => simpleIOSApp);
