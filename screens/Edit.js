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
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
//https://www.npmjs.com/package/react-datetime-picker
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarStyle = {
    marginTop: isCalendarOpen ? 275 : 0,
  };
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);
  const calendarStyle2 = {
    marginTop: isCalendarOpen2 ? 275 : 0,
  };

  useEffect(() => {
    console.log(`modalVisible is ${modalVisible} in Edit.`);
  }, [setModalVisible]);
  // useEffect(() => {
  //   console.log("Event data:", eventData);
  // }, [eventData]);

  // const [value, onChange] = useState(new Date());
  const [val, time] = useState(new Date());

  const [eventDateFormat, setEventDateFormat] = useState("y-MM-dd h:mm:ss a");
  const [showOptionReminder, setShowOptionReminder] = useState(false);
  useEffect(() => {
    if (copyData.eventAllDay == true) {
      console.log("all day set to true");
      setEventDateFormat("y-MM-dd");
    } else {
      console.log("all day set to false");
      setEventDateFormat("y-MM-dd h:mm:ss a");
    }
  }, [copyData.eventAllDay]);

  useEffect(() => {
    if (copyData.eventReminder == true) {
      console.log("reminder set to true");
      setShowOptionReminder(true);
    } else {
      setShowOptionReminder(false);
      console.log("reminder set to false");
    }
  }, [copyData.eventReminder]);

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View>
          <Text style={styles.inputText}>Event Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setCopyData({ ...copyData, eventName: e });
              setEventData({ ...copyData, eventName: e });
              // console.log("copy" + copyData.eventName);
              // console.log("event" + eventData.eventName);
            }}
          ></TextInput>
          <Text style={styles.inputText}>Event Date:</Text>
          <DateTimePicker
            onChange={(e) => {
              var day;
              if (copyData.eventAllDay == true) {
                day = e.toISOString().substring(0, 10);
              } else {
                day = e;
              }
              console.log(day);
              setCopyData({ ...copyData, eventDate: day });
              setEventData({ ...copyData, eventDate: day });
            }}
            value={copyData.eventDate}
            format={eventDateFormat}
            isCalendarOpen={false}
            calendarIcon={null}
            closeWidgets={false}
            open={true}
            onCalendarOpen={() => {
              setIsCalendarOpen(true);
            }}
            onCalendarClose={() => {
              setIsCalendarOpen(false);
            }}
            isClockOpen={false}
            disableClock={true}
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setCopyData({ ...copyData, eventDate: e });
              setEventData({ ...copyData, eventDate: e });
            }}
          ></TextInput> */}
        </View>
        <View style={calendarStyle}>
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
          {showOptionReminder && (
            <DateTimePicker
              onChange={(e) => {
                var day;
                if (copyData.eventReminder == true) {
                  day = e;
                } else {
                  day = "";
                }
                console.log(day);
                setCopyData({ ...copyData, eventReminderDate: day });
                setEventData({ ...copyData, eventReminderDate: day });
              }}
              value={copyData.eventReminderDate}
              format={"y-MM-dd h:mm:ss a"}
              isCalendarOpen={false}
              calendarIcon={null}
              closeWidgets={false}
              open={true}
              onCalendarOpen={() => {
                setIsCalendarOpen2(true);
              }}
              onCalendarClose={() => {
                setIsCalendarOpen2(false);
              }}
              isClockOpen={false}
            />
          )}
          <View style={calendarStyle2}>
            <Text style={styles.inputText}>Event Description:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setCopyData({ ...copyData, eventDescription: e });
                setEventData({ ...copyData, eventDescription: e });
              }}
            ></TextInput>
          </View>
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
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 15,
    borderColor: "#008ae6",
    marginBottom: 20,
    paddingBottom: 10,
  },
  inputText: { margin: 5, marginLeft: 5, fontSize: 18 },
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
