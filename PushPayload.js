import React, { Component } from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  Text,
  Image,
  ListView,
  StyleSheet,
  View
} from 'react-native';

class PushPayload extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.route.passprops.pushEvent),
      pushEvent: props.route.passprops.pushEvent
    }
  }

  renderRow(rowData) {
    return(
      <View style={{
        flex: 1,
        justifyContent: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20
      }}>
      {/*<Text>{rowData.sha.subString(0, 6)} - {rowData.message}</Text>*/}
      </View>
    );
  }

  render() {
    console.log(this.state.pushEvent, 'here here')
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'}}>

        <Image
          source={{uri: this.state.pushEvent.actor.avatar_url}}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60
          }}/>

         <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>{moment(this.state.pushEvent.created_at).fromNow()}
        </Text>
        <Text><Text style={styles.bold}>{this.state.pushEvent.actor.login}</Text> pushed to</Text>
        <Text>at {this.state.pushEvent.repo.name}</Text>
        {/*<Text style={{
          paddingTop: 40,
          fontSize: 20
        }}>{this.state.pushEvent.payload.commits.length} commits
        </Text>

       <ListView
          contentInset='-50'
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: '800',
    fontSize: 16
  }
});
export default PushPayload;