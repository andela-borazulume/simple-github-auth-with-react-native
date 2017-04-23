import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  ListView,
  View
} from 'react-native';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery,
      respositories: ''
    }
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch() {
    let url = `https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.searchQuery)}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          respositories: responseData.respositories,
          dataSource: this.state.dataSource.cloneWithRows(responseData.items)
        })
      })
      .finally(() => {
        this.setState({
          showProgress: false
        })
      });
  }

  renderRow(rowData) {
    return (
      <View style={{
        padding: 20,
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
      }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>{rowData.full_name}</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}>
          <View style={styles.repoCell}>
            <Image source={require('../../images/search.png')}
              style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>
              {rowData.stargazers_count}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image source={require('../../images/search.png')}
              style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>
              {rowData.forks}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image source={require('../../images/search.png')}
              style={styles.repoCellIcon} />
            <Text style={styles.repoCellLabel}>
              {rowData.open_issues}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    console.log('inside the search')
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
        ></ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});
export default SearchResult;