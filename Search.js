// 'use strict';

import React, { Component } from 'react';
import SearchResult from 'SearchResult';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    }
  }

  onSearchPressed() {
    this.props.navigator.push({
      title: 'Result',
      component: SearchResult,
      passprops: {
        searchQuery: this.state.searchQuery
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.heading}>Search</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ searchQuery: text })}
          placeholder="Search">
        </TextInput>
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}> Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    padding: 10,
  },
  heading: {
    fontSize: 30,
    margin: 10,
    marginBottom: 20
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
  }
});

export default Search;