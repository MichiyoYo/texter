import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Button,
  LogBox,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
} from "react-native-gifted-chat";
import "firebase/firestore";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import { db } from "../firebase";

/**
 * The Chat class renders the screen where the chat happens
 */
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      loadingMsg: "Loading the conversation...",
      user: {
        _id: 0,
        name: "",
        avatar: "",
      },
    };
    LogBox.ignoreLogs([
      "Setting a timer",
      "Warning: ...",
      "undefined",
      "Animated.event now requires a second argument for options",
    ]);
  }
  /**
   * Lifecycle method to make sure that the component mounted
   * before the options of the current screen are set
   */
  componentDidMount() {
    //get user name from start screen
    const { name } = this.props.route.params;

    //setting up the screen title
    this.props.navigation.setOptions({ title: name ? name : "Anonymous" });

    const auth = getAuth();
    this.authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }
      //adding user to state
      this.setState({
        uid: user.uid,
        messages: [],
        loadingMsg: "",
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });

      this.msgCollection = collection(db, "messages");
      //listening for collection changes for the current user
      this.unsubscribeChatUser = onSnapshot(
        query(this.msgCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          this.onCollectionUpdate(snapshot);
        }
      );

      //setting up system message with name of the user when they join the convo
      const systemMsg = {
        _id: `sys-${Math.floor(Math.random() * 10000)}`,
        text: `${name ? name : "Anonymous"} joined the conversation 👋`,
        createdAt: new Date(),
        system: true,
      };
      this.addMessages(systemMsg);
    });

    //reference to the messages collection
    /*
    this.msgCollection = collection(db, "messages");

    if (this.msgCollection) {
      this.unsubscribe = onSnapshot(
        query(
          this.msgCollection,
          // where("user._id", "==", this.state.uid),
          orderBy("createdAt", "desc")
        ),
        (snapshot) => {
          this.onCollectionUpdate(snapshot);
        }
      );
      this.addMessages(systemMsg);
    } else {
      console.error("There was an error while retrieving the collection");
    }
    */
  }

  /**
   * Lifecycle method used to unsubsribe from updates and authentications
   * when component unmounts
   */
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeChatUser();
  }

  /**
   * Updates the state when a new message with the snapshot
   * @param {*} snapshot
   */
  onCollectionUpdate = (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      let data = { ...doc.data() };

      messages.push({
        _id: doc.id,
        createdAt: data.createdAt.toDate(),
        text: data.text || "",
        system: data.system,
        user: data.user,
      });
    });

    this.setState({ messages });
  };

  /**
   * Adds a new message to the Firebase DB
   * @param {} msg
   */
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
      uid: this.state.uid,
    }));
    this.addMessages(this.state.messages[0]);
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
          <Text style={styles.loadingMsg}>{this.state.loadingMsg}</Text>
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
  loadingMsg: {
    color: "#fff",
    textAlign: "center",
    margin: "auto",
    fontSize: 12,
    paddingVertical: 10,
  },
});
