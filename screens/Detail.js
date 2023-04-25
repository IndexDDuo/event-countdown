import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
//https://www.npmjs.com/package/react-countdown-circle-timer

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font));
}
export default function Detail({ navigation, route }) {
  cacheFonts([FontAwesome.font]);
  const { name, date, desc, reminder, reminderTime } = route.params;
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
  const checkReminder = (reminder) => {
    if (reminder == true) {
      return (
        <View>
          <Text>You will be reminded on: {reminderTime}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.detailContainer}>
          <Text style={styles.name}>Event Name: {name}</Text>
          <Text style={styles.date}>Event occurs on: {date}</Text>

          <Text>{checkReminder(reminder)}</Text>
        </View>
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
        <Text style={styles.desc}>Event Description: {desc}</Text>
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
    alignItems: "center",
    // marginLeft: 150,
    margin: 50,
    alignContent: "center",
  },
  detailContainer: {
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
  },
  name: {
    textAlign: "center",
    backgroundColor: "#CCB3AD",
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  date: {
    textAlign: "center",
    backgroundColor: "#CCB3AD",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  desc: {
    textAlign: "left",
    backgroundColor: "#CCB3AD",
    paddingVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingBottom: 150,
  },
});
