import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Button, Text, CheckBox } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";
import DateTimePicker from "react-datetime-picker";

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}

export default function Edit({ navigation, route }) {
  cacheFonts([FontAwesome.font]);

  const { modalVisible, setModalVisible, eventData, setEventData } =
    route.params;

  // // handling the all day? checkbox
  const [allDayChecked, setAllDayChecked] = useState(eventData.eventAllDay);

  // // handling the reminder checkbox
  const [reminderChecked, setReminderChecked] = useState(
    eventData.eventReminder
  );

  const [copyData, setCopyData] = useState(eventData);

  useEffect(() => {
    console.log(`modalVisible is ${modalVisible} in Edit.`);
  }, [setModalVisible]);
  // useEffect(() => {
  //   console.log("Event data:", eventData);
  // }, [eventData]);

  const [value, onChange] = useState(new Date());

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Event Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setCopyData({ ...copyData, eventName: e });
              setEventData({ ...copyData, eventName: e });
              console.log("copy" + copyData.eventName);
              console.log("event" + eventData.eventName);
            }}
          ></TextInput>
          <Text>Event Date:</Text>
          <DateTimePicker onChange={onChange} value={value} />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setCopyData({ ...copyData, eventDate: e });
              setEventData({ ...copyData, eventDate: e });
            }}
          ></TextInput>

          <CheckBox
            title={"All day?"}
            checked={allDayChecked}
            onPress={() => {
              setAllDayChecked(!allDayChecked);
              setCopyData({ ...copyData, eventAllDay: !allDayChecked });
              setEventData({
                ...copyData,
                eventAllDay: !allDayChecked,
              });
            }}
          />
          <CheckBox
            title={"Reminder?"}
            checked={reminderChecked}
            onPress={() => {
              setReminderChecked(!reminderChecked);
              setCopyData({ ...copyData, eventReminder: !reminderChecked });
              setEventData({
                ...copyData,
                eventReminder: !reminderChecked,
              });
            }}
          />
          <Text>Event Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setCopyData({ ...copyData, eventDescription: e });
              setEventData({ ...copyData, eventDescription: e });
            }}
          ></TextInput>
        </View>
      </ScrollView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Saved!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
