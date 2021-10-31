import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import PropTypes from "prop-types";
import firebase from "firebase";
import "firebase/firestore";

class CustomActions extends Component {
  /**
   * Lets the user pick an image from the camera roll
   * @function pickImage
   * @async
   */
  pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (permissionResult.granted) {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Images",
        }).catch((err) => console.log(err));
        if (!pickerResult.cancelled) {
          const imageUrl = await this.uploadImageFetch(pickerResult.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Lets the user take a picture with the device's camera
   * @function takePhoto
   * @async
   */
  takePhoto = async () => {
    let permissionCameraResult = await Camera.requestCameraPermissionsAsync();
    let permissionCameraRollResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (
        permissionCameraResult.granted &&
        permissionCameraRollResult.granted
      ) {
        let cameraResult = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((err) => console.error(err));

        if (!cameraResult.cancelled) {
          const imageUrl = await this.uploadImageFetch(cameraResult.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Lets the user send the location by using the device's GPS
   * @function getLocation
   * @async
   */
  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync().catch((err) =>
          console.error(err)
        );
        const longitude = JSON.stringify(result.coords.longitude);
        const latitude = JSON.stringify(result.coords.latitude);
        if (result) {
          this.props.onSend({
            location: {
              longitude: longitude,
              latitude: latitude,
            },
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Uploads images to firebase
   * @param {*} uri the uri of the image to upload
   * @function uploadImageFetch
   * @async
   */
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  /**
   * Hanlder of the press event on the different options
   * presented to the user when they try to send a media
   */
  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          case 2:
            console.log("user wants to get their location");
            return this.getLocation();
          default:
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Send an image or your location"
        style={[styles.container]}
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
