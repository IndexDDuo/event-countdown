import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import Home from "./screens/Home.js";
import Detail from "./screens/Detail.js";
import Edit from "./screens/Edit.js";

const Stack = createNativeStackNavigator();

// handling modal
const handleSave = (navigation, modalVisible, setModalVisible) => {
  console.log(`save button is pressed. app.js ${modalVisible}`);
  setModalVisible(true);
  navigation.navigate("Edit", {
    setModalVisible: setModalVisible,
  });
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(`App.js ${modalVisible}`);
  }, [modalVisible]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => {
                  navigation.navigate("Edit");
                }}
              ></Button>
            ),
          })}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Save"
                onPress={() => {
                  handleSave(navigation, modalVisible, setModalVisible);
                }}
              ></Button>
            ),
          })}
          initialParams={{
            setModalVisible: setModalVisible,
            modalVisible: modalVisible,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
