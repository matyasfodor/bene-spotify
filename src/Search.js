import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {},
  input: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
    height: 40,
    padding: 10,
  },
  container: {

  },
})

export class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
    }
  }

  handleChangeText(text) {
    const {onChange} = this.props;
    this.setState({text}, () => {
      onChange(text)
    });
  }

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You can search here</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(value) => {
            this.handleChangeText(value)
          }}/>
      </View>
    );
  }
}