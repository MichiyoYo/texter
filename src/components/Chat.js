import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Chat extends Component {
  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let { bgColor } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text>Chat screen</Text>
      </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({});
