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

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}

export default function Edit({ navigation, route }) {
  cacheFonts([FontAwesome.font]);

  const { modalVisible, setModalVisible, eventData, setEventData } =
    route.params;

  // // handling the all day? checkbox
  // const [allDayChecked, setAllDayChecked] = useState(false);

  // // handling the reminder checkbox
  // const [reminderChecked, setReminderChecked] = useState(false);

  useEffect(() => {
    console.log(`modalVisible is ${modalVisible} in Edit.`);
  }, [setModalVisible]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Event Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setEventData({ ...eventData, eventName: e });
            }}
          ></TextInput>
          <Text>Event Date:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setEventData({ ...eventData, eventDate: e })}
          ></TextInput>

          <CheckBox
            title={"All day?"}
            checked={eventData.eventAllDay}
            onPress={() =>
              setEventData({
                ...eventData,
                eventAllDay: !eventData.eventAllDay,
              })
            }
          />
          <CheckBox
            title={"Reminder?"}
            checked={eventData.eventReminder}
            onPress={() =>
              setEventData({
                ...eventData,
                eventReminder: !eventData.eventReminder,
              })
            }
          />
          <Text>Event Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setEventData({ ...eventData, eventDescription: e });
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
