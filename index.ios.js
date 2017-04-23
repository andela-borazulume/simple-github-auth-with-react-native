/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from "./component/login/Login";
import AppContainer from "./component/container/AppContainer";

import AuthService from './utils/AuthService';

export default class simpleIOSApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount() {
   AuthService.getAuthInfo((err, authInfo)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  onLogin() {
    this.setState({ isLoggedIn: true })
  }

  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }

   if(this.state.isLoggedIn){
      return (
        <AppContainer />
      );
    }else{
      return (
        <Login onLogin={this.onLogin.bind(this)} />
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
