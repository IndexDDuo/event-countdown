import { StyleSheet, TextInput, View, ScrollView, Modal } from "react-native";
import { Button, Text, CheckBox } from "@rneui/themed";
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

  //handling the all day? checkbox
  const [allDayChecked, setAllDayChecked] = useState(false);

  //handling the render checkbox
  const [reminderChecked, setReminderChecked] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Event Name:</Text>
          <TextInput style={styles.input}></TextInput>
          <Text>Event Date:</Text>
          <TextInput style={styles.input}></TextInput>

          <CheckBox
            title={"All day?"}
            checked={allDayChecked}
            onPress={() => setAllDayChecked(!allDayChecked)}
          />
          <CheckBox
            title={"Reminder?"}
            checked={reminderChecked}
            onPress={() => setReminderChecked(!reminderChecked)}
          />
          <Text>Event Description:</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
      </ScrollView>
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
  input: {
    borderWidth: 1,
  },
});
