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
    const now = Date.now();
    const dateDue = new Date(date);
    const diffsecs = Math.round(now - dateDue);
    console.log(diffsecs);
    return diffsecs;
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Event Name: {name}</Text>
        <Text>Event occurs on: {date}</Text>
        <Text>Event Description: {desc}</Text>
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
