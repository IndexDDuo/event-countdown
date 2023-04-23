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

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Home({ navigation }) {
  cacheFonts([FontAwesome.font]);

  const eventDataArray = eventData;

  const TaskDisplay = ({ name, date }) => (
    <View>
      <Text>
        {name}
        {date}
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View>
        <Text>This is Home Screen</Text>
        <FlatList
          data={eventDataArray}
          renderItem={({ item }) => (
            <TaskDisplay name={item.eventName} date={item.eventDate} />
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
