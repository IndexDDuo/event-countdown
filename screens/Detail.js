import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonGroup } from "react-native-elements";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
//https://www.npmjs.com/package/react-countdown-circle-timer

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Detail({ navigation, route }) {
  cacheFonts([FontAwesome.font]);
  const { name, date, desc } = route.params;
  console.log(name + date + desc);

  function calcDays(date) {
    // const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now() / 1000;
    const dateDue = new Date(date).getTime() / 1000;
    console.log("now: " + now + "datedue; " + dateDue);
    const diffsecs = Math.round(dateDue - now);
    console.log(diffsecs);
    return diffsecs;
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <Text style={styles.completedText}>Event countdown completed!</Text>
      );
    }
    const days = Math.floor(remainingTime / 86400);
    const hours = Math.floor((remainingTime % 86400) / 3600);
    const minutes = Math.floor((remainingTime % 86400) / 3600 / 60);
    const seconds = remainingTime % 60;

    return (
      <View>
        <Text>Remaining</Text>
        <Text>
          {days} days {hours}:{minutes}:{seconds}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Event Name: {name}</Text>
        <Text>Event occurs on: {date}</Text>
        <Text>Event Description: {desc}</Text>

        <View style={styles.timerCircle}>
          <CountdownCircleTimer
            isPlaying
            duration={calcDays(date)}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </View>
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
  completedText: {
    marginLeft: 40,
  },
  timerCircle: {
    marginLeft: 50,
  },
});
