import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

/**
 * The Chat class renders the screen where the chat happens
 */
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  /**
   * Lifecycle method to make sure that the component mounted
   * before the options of the current screen are set
   */
  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Cree",
            avatar:
              "https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/44589.jpg?1627430194",
          },
        },
        {
          _id: 2,
          text: `${name ? name : "Anonymous"} joined the conversation 👋`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  /**
   * Updates the state by appending the last sent message to the rest
   * @param {*} messages the sent message
   */
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  /**
   * Renderes a customized chat bubble
   * @param {*} props
   * @returns a JSX element that rapresents a text bubble with custon bg color
   */
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2f2f2fb8",
          },
          left: {
            backgroundColor: "#ffffffd9",
          },
        }}
      />
    );
  }

  render() {
    const { bgColor } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor ? bgColor : "#fff",
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

export default Chat;

// Styles for Chat view
const styles = StyleSheet.create({});
