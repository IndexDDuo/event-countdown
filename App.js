import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home.js";
import Detail from "./screens/Detail.js";
import Edit, { toggleModalVisibility } from "./screens/Edit.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  // handling modal

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Edit">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => {
                  navigation.navigate("Edit");
                }}
              ></Button>
            ),
          })}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Save"
                onPress={() => {
                  toggleModalVisibility();
                  // navigation.navigate("Home");
                }}
              ></Button>
            ),
          })}
          initialParams={{ setModalVisible: toggleModalVisibility }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
