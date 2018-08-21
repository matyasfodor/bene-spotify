import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Search } from './src/Search';
import Listing from './src/Listing';
import search from './src/api/search';
import token from './src/api/token';

const PAGE = 20;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      items: [],
      offset: 0,
      isFetching: false,
      token: null,
    }
  }

  async loadNextPage() {
    if (this.state.isFetching) {
      console.log('Fetch already in progress');
      return;
    }
    this.setState({isFetching: true});
    const newItems = await search({
      offset: this.state.offset,
      limit: PAGE,
      q: this.state.query,
      token: this.state.token,
    });

    this.setState({
      isFetching: false,
      offset: this.state.offset + PAGE,
      items: [...this.state.items, ...newItems],
    })
  }

  handleSearchChange(text) {
    this.setState({
      query: text,
      items: [],
      offset: 0,
    }, () => {
      this.loadNextPage();
    });
  }

  handleEndReached() {
    this.loadNextPage();
  }

  async componentDidMount() {
    await this.refreshToken();
    await this.loadNextPage();
  }

  async refreshToken() {
    const newToken = await token();
    this.setState({token: newToken})
  }

  render() {
    const { items, isFetching } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <Search onChange={(text) => {this.handleSearchChange(text)}}/>
        { !!items.length && <Listing items={items} onEndReached={() => { this.handleEndReached() }}/> }
        { isFetching && <ActivityIndicator /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 50,
  },
});
