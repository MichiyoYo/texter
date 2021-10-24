import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import bgImage from "../assets/images/bkg-img.png";

class Start extends Component {
  state = {
    name: "",
    bgColor: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <Text style={styles.h1}>CHATTY</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
              placeholder="Your Name"
            />
            <View style={styles.colorSwatch}>
              <Text style={styles.subtitle}>Choose Background Color</Text>
              <View style={styles.swatches}>
                <View style={styles.swatch1}></View>
                <View style={styles.swatch2}></View>
                <View style={styles.swatch3}></View>
                <View style={styles.swatch4}></View>
              </View>
            </View>
            <Button
              style={styles.btn}
              title="Start Chatting"
              color={"#757083"}
              containerViewStyle={{ width: "100%", marginLeft: 0 }}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  username: this.state.name,
                })
              }
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#151617",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bgImage: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  h1: {
    flexGrow: 15,
    flexShrink: 10,
    fontSize: 45,
    fontWeight: "800",
    color: "#fff",
    paddingTop: 60,
  },
  box: {
    backgroundColor: "white",
    flexGrow: 1,
    flexShrink: 0,
    width: "88%",
    marginBottom: 30,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    height: 260,
    minHeight: 260,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "88%",
    padding: 5,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  btn: {
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },
  colorSwatch: {
    padding: 20,
    flex: 1,
  },
  swatches: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  swatch1: {
    width: 40,
    height: 40,
    backgroundColor: "#090C08",
    borderRadius: 40,
  },
  swatch2: {
    width: 40,
    height: 40,
    backgroundColor: "#474056",
    borderRadius: 40,
  },
  swatch3: {
    width: 40,
    height: 40,
    backgroundColor: "#8A95A5",
    borderRadius: 40,
  },
  swatch4: {
    width: 40,
    height: 40,
    backgroundColor: "#B9C6AE",
    borderRadius: 40,
  },
});

export default Start;
