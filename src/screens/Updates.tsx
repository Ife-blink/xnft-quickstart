import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import flightData from "../utils/flightUpdates.json";

import { Screen } from "../components/Screen";
import { TokenRow } from "../components/TokenRow";

type RootStackParamList = {
  List: {};
  Detail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

function FullScreenLoadingIndicator() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

// async function fetchTokenData(count = 20) {
//   const url = `https://api.newscatcherapi.com/v2/search?q="Abuja"`;
//   return fetch(url, {
//     headers: {
//         'x-api-key': "bRSHXjlxwYf2RpAT0yNEwfyf8Pzyc2ZQMVbFnYppYGk"
//       }
//   }).then((r) => r.json());
// }

function useTokenData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
     // const data = await fetchTokenData();
      // console.log("data", data);
      setData(data);
      setLoading(false);
    }

    fetch();
  }, []);

  return { data, loading };
}
console.log(flightData)

function List({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "List">) {
  const { loading } = useTokenData();
  //const [ flightData, setFlightData ] = useState<any[]>([])

  useEffect(() => {
    function fetch() {
      //setFlightData(FlightData)
      console.log("data", flightData);
    }

    fetch();
  }, []);

  const handlePressTokenRow = (id: string) => {
    navigation.push("Detail", { id });
  };

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: "#eee", borderBottomWidth: 1 }}
    />
  );

  return (
    <Screen style={tw`max-w-screen`}>
      <Text style={tw`font-bold text-[1.6rem] my-2`}>Updates on your city of arrival</Text>
      <FlatList
        style={{ flex: 1 }}
        data={flightData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <TokenRow
              id={item.id}
              name={item.title}
              excerpt={item.excerpt}
              imageUrl={item.image}
              onPress={handlePressTokenRow}
            />
          );
        }}
      />
    </Screen>
  );
}

function Detail({
  route,
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { data, loading } = useTokenData();
  const { id } = route.params;

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const item = data.find((d) => d.id === id);

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <View style={tw`bg-yellow-100 items-center justify-center p-4`}>
        <Image source={{ uri: item.image }} style={tw`w-8 h-8 rounded m-4`} />
        <Text style={tw`font-bold text-lg`}>{item.name}</Text>
        <Text style={tw`font-bold text-lg`}>Symbol: {item.symbol}</Text>
        <Text style={tw`font-bold text-lg`}>
          Total supply: {item.total_supply}
        </Text>
        <Text style={tw`font-bold text-lg`}>All time high: {item.ath}</Text>
      </View>
    </Screen>
  );
}

const forSlide: StackCardStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

export const UpdateListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen
        name="List"
        component={List}
        options={{ title: "Notification" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};
