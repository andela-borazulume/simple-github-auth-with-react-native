import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';
import Feed from './Feed';

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'feed'
    }

  }

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title='Feed'
          selected={this.state.selectedTab == 'feed'}
          icon={require('./images/feed.png')}
          onPress={() => { this.setState({ selectedTab: 'feed' }) }}>
          <Feec/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Search'
          selected={this.state.selectedTab == 'search'}
          icon={require('./images/feed.png')}
          onPress={() => { this.setState({ selectedTab: 'search' }) }}>
          <Text style={styles.welcome}> Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
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
  }
});
export default AppContainer