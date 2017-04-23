// 'use strict';

import React, { Component } from 'react';
import buffer from 'buffer';
import authService from './AuthService';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.state = {
      showlLoading: false
    }
  }

  onLoginPressed() {
    this.setState({ showlLoading: true });
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showlLoading: false
      },results));

      if (results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }

  render() {
    let errorControl = <View />
    if (!this.state.success && this.state.badCredentials) {
      errorControl = <Text style={styles.error}> The user and password combination is incorrect</Text>
    }
    if (!this.state.success && this.state.unknownError) {
      errorControl = <Text style={styles.error}> There is an error here</Text>
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./images/Octocat.jpg')}>
        </Image>
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Github username">
        </TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Github password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight
          onPress={this.onLoginPressed}
          style={styles.button}>
          <Text style={styles.buttonText}> Login</Text>
        </TouchableHighlight>

        {errorControl}

        <ActivityIndicator
          animating={this.state.showlLoading}
          size='large'
          style={styles.loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    padding: 10,
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});

export default Login;