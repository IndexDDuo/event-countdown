import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import Home from "./screens/Home.js";
import Detail from "./screens/Detail.js";
import Edit from "./screens/Edit.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  // handling modal
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(`modalVisible has been updated to ${modalVisible}`);
  }, [modalVisible]);

  // const handleSave = useMemo(() => {
  //   setModalVisible(true);
  //   console.log(
  //     `save button is pressed. modalVisible is set to ${modalVisible}`
  //   );
  //   navigation.navigate("Edit", {
  //     modalVisible: modalVisible,
  //     setModalVisible: setModalVisible,
  //   });
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Edit">
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
                  handleSave();
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
