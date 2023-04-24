import { StyleSheet, View, FlatList, Modal, Pressable } from "react-native";
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
import { TouchableOpacity } from "react-native-web";

import Detail from "./Detail.js";

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Home({ navigation }) {
  cacheFonts([FontAwesome.font]);

  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  var event2 = [];

  //stop infinity loooooping
  useEffect(() => {
    const logAllItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        console.log("All events:", items);
        console.log("items" + items.length);
        for (var i = 0; i < items.length; i++) {
          if (items[i][0] != "EXPO_CONSTANTS_INSTALLATION_ID") {
            event2.push(JSON.parse(items[i][1]));
          }
        }
        // console.log("items after loop" + event2);
        // console.log(JSON.parse(items[0][1]).eventName);
        setEvents(event2);
        // console.log("items after loop" + event2[0].eventName);
      } catch (e) {
        console.log(e);
      }
    };
    logAllItems();
  }, []);

  function calcDays(date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const dateDue = new Date(date);
    const diffDays = Math.round(Math.abs((now - dateDue) / oneDay));
    console.log(diffDays);
    return diffDays;
  }

  function checkDateCurrent(date) {
    const now = Date.now();
    const dateDue = new Date(date);
    if (now < dateDue) {
      return (
        <Text>
          {calcDays(date)} days left until {date}
        </Text>
      );
    } else {
      return (
        <Text>
          {calcDays(date)} days since {date}
        </Text>
      );
    }
  }
  useEffect(() => {
    console.log(`App.js ${modalVisible}`);
  }, [modalVisible]);

  function showModal() {
    return (
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
            <Text style={styles.modalText}>test</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                // navigation.navigate("Home");
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  const TaskDisplay = ({ name, date }) => (
    <View>
      <TouchableOpacity
        style={styles.eventStyle}
        onPress={() => {
          showModal();
          // navigation.navigate("Detail");
        }}
      >
        <Text style={styles.eventNameStyle}>{name}</Text>
        <Text style={styles.eventDateStyle}>{checkDateCurrent(date)}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Text>This is Home Screen</Text> */}
        <FlatList
          data={events}
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
  eventStyle: {
    padding: 20,
    paddingHorizontal: 70,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  eventNameStyle: {
    textAlign: "center",
    backgroundColor: "#CCB3AD",
    paddingVertical: 20,
    marginHorizontal: 25,
  },
  eventDateStyle: {
    textAlign: "center",
    backgroundColor: "#CCB3AD",
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginTop: 2,
  },
});
