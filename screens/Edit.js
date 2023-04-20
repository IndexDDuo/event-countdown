import { StyleSheet, TextInput, View } from "react-native";
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
export default function Edit({ navigation }) {
  cacheFonts([FontAwesome.font]);

  return (
    <SafeAreaView>
      <View>
        <Text>Event Name:</Text>
        <TextInput></TextInput>
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
