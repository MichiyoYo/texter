import React from "react";
//importing the screens
import Start from "./src/components/Start";
import Chat from "./src/components/Chat";
//importing react native gesture handler
import "react-native-gesture-handler";
//importing react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Main component that holds the navigation container to
 * switch from one screen to the other
 */
export default class App extends React.Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ title: "Welcome to Texter!" }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
