import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";
import eventData from "../eventData.json";

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Home({ navigation }) {
  cacheFonts([FontAwesome.font]);

  return (
    <SafeAreaView>
      <View>
        <Text>This is Home Screen</Text>
        {/* <FlatList
          data={questionsArr}
          renderItem={({ item, index }) => (
            <TaskDisplay
              prompt={item.prompt}
              choices={item.choices}
              correct={item.correct}
              userChoice={userChoice[index]}
              type={item.type}
            ></TaskDisplay>
          )}
        ></FlatList> */}
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
