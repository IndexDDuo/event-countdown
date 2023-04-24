import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Detail({ navigation, route }) {
  cacheFonts([FontAwesome.font]);
  const { name, date, desc } = route.params;
  console.log(name + date + desc);

  return (
    <SafeAreaView>
      <View>
        <Text>Event Name: {name}</Text>
        <Text>Event Due Date: {date}</Text>
        <Text>Event Description: {desc}</Text>
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
