import React, { Component } from 'react';
import {
  NavigatorIOS,
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';
import Feed from './Feed';
import Search from './Search';

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
          <NavigatorIOS
            style={{ flex: 1 }}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Search'
          selected={this.state.selectedTab == 'search'}
          icon={require('./images/feed.png')}
          onPress={() => { this.setState({ selectedTab: 'search' }) }}>
          <NavigatorIOS
            style={{ flex: 1 }}
            initialRoute={{
              component: Search,
              title: 'Search'
            }} />
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