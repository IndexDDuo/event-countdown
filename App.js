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
const handleSave = (
  modalVisible,
  setModalVisible,
  navigation,
  eventData,
  setEventData
) => {
  setModalVisible(true);
  console.log(`save button is pressed. app.js  ${modalVisible}`);
  navigation.navigate("Edit", { modalVisible: true });
  setEventData(eventData);
  console.log(eventData);
};

export const eventData = [
  {
    eventName: "Summer",
    eventDate: "2023-05-12T13:37:27+00:00",
    allDay: true,
    reminder: true,
    reminderTime: "2023-05-10T13:37:27+00:00",
    eventDesc: "It's summer time!",
  },
];

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventAllDay: false,
    eventReminder: false,
    eventDescription: "",
  });

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
                  handleSave(
                    modalVisible,
                    setModalVisible,
                    navigation,
                    eventData,
                    setEventData
                  );
                }}
              ></Button>
            ),
          })}
          initialParams={{
            setModalVisible: setModalVisible,
            modalVisible: modalVisible,
            eventData: eventData,
            setEventData: setEventData,
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
