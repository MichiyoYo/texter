import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import bgImage from "../assets/images/pure-bg.png";
import logo from "../assets/images/logo-text.png";
import Icon from "react-native-vector-icons/FontAwesome";
/**
 * Start is the component that gets renderd as a splash screen
 * from where the user can type a name and pick a background color
 * to use during the chat experience
 */
class Start extends Component {
  // The state of the current component
  state = {
    name: "",
    bgColor: "",
  };

  /**
   * Updates the state with the background color picked from the swatch
   * @param {*} newColor the new color used to update the state
   */
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // The colors for the swatch
  colors = {
    orange: "#f44336",
    magenta: "#e91e63",
    fucsia: "#9c27b0",
    purple: "#673ab7",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.bgImage}
        >
          {/* <Text style={styles.h1}>Texter</Text> */}
          <Image style={styles.logo} source={logo} />
          <View style={styles.box}>
            <View style={styles.inputField}>
              <Icon
                style={styles.iconStyle}
                name="user"
                size={30}
                color="#888"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>
            <View style={styles.colorSwatch}>
              <Text style={styles.subtitle}>Choose Background Color</Text>
              <View style={styles.swatches}>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.orange)}
                >
                  <View style={styles.swatch1}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.magenta)}
                >
                  <View style={styles.swatch2}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.fucsia)}
                >
                  <View style={styles.swatch3}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.changeBgColor(this.colors.purple)}
                >
                  <View style={styles.swatch4}></View>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={styles.btn}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.btnText}>Start Texting</Text>
            </Pressable>
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
  logo: {
    width: "70%",
    height: "auto",
    resizeMode: "contain",
    flex: 1,
  },
  h1: {
    flexGrow: 1,
    flexShrink: 1,
    fontWeight: "800",
    color: "transparent",
    paddingTop: 60,
  },
  box: {
    backgroundColor: "#ffffff",
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
    maxHeight: 290,
    borderRadius: 20,
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 0,
  },
  iconStyle: {
    //padding: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 25,
    width: 25,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#888",
  },
  btn: {
    flex: 1,
    backgroundColor: "#6705e9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 32,
    marginTop: 10,
    width: "90%",
  },
  btnText: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
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
  },
  swatches: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  swatch1: {
    width: 40,
    height: 40,
    backgroundColor: "#f44336",
    borderRadius: 40,
  },
  swatch2: {
    width: 40,
    height: 40,
    backgroundColor: "#e91e63",
    borderRadius: 40,
  },
  swatch3: {
    width: 40,
    height: 40,
    backgroundColor: "#9c27b0",
    borderRadius: 40,
  },
  swatch4: {
    width: 40,
    height: 40,
    backgroundColor: "#673ab7",
    borderRadius: 40,
  },
});

export default Start;
