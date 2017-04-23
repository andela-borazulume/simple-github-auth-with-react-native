import React, { Component } from 'react';
import moment from 'moment';
import PushPayload from './PushPayload'
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  Image,
  ListView,
  View
} from 'react-native';

class Feed extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    }
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      let url = "https://api.github.com/users/andela-borazulume/received_events";
      fetch(url)
        .then((response) => response.json()
        )
        .then((responseData) => {
          let feedItems = responseData.filter((ev) =>
            ev.type == 'WatchEvent');
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(feedItems),
            showProgress: false
          })
        })
    });
  }

  pressRow(rowData) {    
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passprops: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor='#ddd'>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1
        }}>
          <Image
            source={{ uri: rowData.actor.avatar_url }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18
            }}
          />
          <View style={{
            paddingLeft: 20
          }}>
            <Text style={{ backgroundColor: '#fff' }}>{moment(rowData.created_at).fromNow()}</Text>
            <Text style={{ backgroundColor: '#fff' }}>{rowData.actor.login} pushed to</Text>
            <Text style={{ backgroundColor: '#fff' }}> at
            <Text style={{ fontWeight: "600" }}>{rowData.repo.name}</Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size='large'
            animating={true} />
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        ></ListView>
      </View>
    );
  }
}
export default Feed;