import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
} from "react-native-gifted-chat";
import "firebase/firestore";
import { collection, onSnapshot, setDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";

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
    const systemMsg = {
      _id: "sys-0000",
      text: `${name} joined the conversation 👋`,
      createdAt: new Date(),
      system: true,
    };

    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
    this.msgCollection = collection(db, "messages");
    if (this.msgCollection) {
      this.unsubscribe = onSnapshot(this.msgCollection, (snapshot) => {
        this.onCollectionUpdate(snapshot);
      });
      this.addMessages(systemMsg);
    } else {
      console.error("There was an error while retrieving the collection");
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  sortMsgs = (a, b) => {
    b.createdAt - a.createdAt;
  };

  onCollectionUpdate = (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      let data = { ...doc.data() };
      data.sortMsgs;
      messages.push({
        _id: doc.id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        system: data.system,
        user: data.user,
      });
    });

    this.setState({ messages });
  };

  addMessages = async (msg) => {
    const docRef = doc(db, "messages", msg._id);
    await setDoc(docRef, msg);
  };
  /**
   * Updates the state by appending the last sent message to the rest
   * @param {*} messages the sent message
   */
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    //console.log(this.state.messages.at(0));
    this.addMessages(this.state.messages.at(0));
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

  /**
   * Renders a customized system message
   * @param {*} props
   * @returns a JSX element that represents a customized System Message
   */
  renderSystemMessage(props) {
    return <SystemMessage {...props} textStyle={{ color: "#fff" }} />;
  }

  /**
   * Renders a customized date
   * @param {*} props
   * @returns a JSX element that represents a customized date
   */
  renderDay(props) {
    return <Day {...props} textStyle={{ color: "#fff" }} />;
  }

  render() {
    const { bgColor, bgImage } = this.props.route.params;
    const payload = {
      _id: "12345",
      createdAt: new Date("Oct 12, 2021"),
      text: "testing add function not on press",
      system: false,
      user: {
        _id: 3,
        name: "banana",
        avatar: "",
      },
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor ? bgColor : "#fff",
        }}
      >
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderSystemMessage={this.renderSystemMessage}
            renderDay={this.renderDay}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
              avatar: "",
            }}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </ImageBackground>
      </View>
    );
  }
}

export default Chat;

// Styles for Chat view
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
});
