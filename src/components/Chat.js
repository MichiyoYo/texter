import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Chat extends Component {
  render() {
    let { name, bgColor } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text>{name}</Text>
      </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({});
