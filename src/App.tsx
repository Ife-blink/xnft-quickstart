import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";

import { ExamplesScreens } from "./screens/ExamplesScreen";
import { HomeNavigator } from "./screens/Homestack";
import { TokenListNavigator } from "./screens/TokenNavigator";
import { UpdateListNavigator } from "./screens/Updates";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Ticket"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Ticket",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Updates"
        component={UpdateListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Updates",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Examples"
        component={ExamplesScreens}
        options={{
          tabBarLabel: "Examples",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
