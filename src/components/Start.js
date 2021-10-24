import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import bgImage from "../assets/images/bkg-img.png";

class Start extends Component {
  state = {
    name: "",
    bgColor: "",
  };

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: "#090C08",
    gray: "#474056",
    lightBlue: "#8A95A5",
    lightGreen: "#B9C6AE",
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
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.black)}
                >
                  <View style={styles.swatch1}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.gray)}
                >
                  <View style={styles.swatch2}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.lightBlue)}
                >
                  <View style={styles.swatch3}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.lightGreen)}
                >
                  <View style={styles.swatch4}></View>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              style={styles.btn}
              title="Start Chatting"
              color={"#757083"}
              containerViewStyle={{ width: "100%", marginLeft: 0 }}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Styles for Start view
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
    flex: 1,
    height: 50,
    maxHeight: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: "88%",
    padding: 5,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  btn: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },
  colorSwatch: {
    flex: 1,
    padding: 20,
    marginTop: 5,
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
