import { StyleSheet, View, FlatList } from "react-native";
import { Button, Text } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";
// import eventData from "../eventData.json";
import { eventData, getData } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Home({ navigation }) {
  cacheFonts([FontAwesome.font]);

  const [events, setEvents] = useState([]);

  //stop infinity loooooping
  useEffect(() => {
    const logAllItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        console.log("All events:", items);
        console.log(JSON.parse(items[0][1]).eventName);
        setEvents(items);
      } catch (e) {
        console.log(e);
      }
    };
    logAllItems();
    const mappingEvents = events.map((e) => {
      return JSON.parse(e[0][1]);
    });
    console.log("events" + mappingEvents);
  }, []);

  const TaskDisplay = ({ name, date }) => (
    <View>
      <Text>
        {name}
        {date}
      </Text>
      <Text>hi</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is Home Screen</Text>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TaskDisplay name={item[1].eventName} date={item[1].eventDate} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
});
