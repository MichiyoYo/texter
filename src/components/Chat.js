import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Chat extends Component {
  render() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chat screen</Text>
      </View>
    );
  }
}

export default Chat;
