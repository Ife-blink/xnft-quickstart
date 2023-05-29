import { useEffect, useState } from "react";
import { usePublicKeys } from "../hooks/xnft-hooks";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  Animated,
} from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { Screen } from "../components/Screen";
import { TokenRow } from "../components/TokenRow";

type RootStackParamList = {
  Ticket: {};
  Depature: {};
  Arrival: {};
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

async function fetchTokenData(count = 20) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=true&price_change_percentage=24h`;
  return fetch(url).then((r) => r.json());
}

function useTokenData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await fetchTokenData();
      console.log("data", data);
      setData(data);
      setLoading(false);
    }

    fetch();
  }, []);

  return { data, loading };
}

function List({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "List">) {
  const { data, loading } = useTokenData();

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
    <Screen>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <TokenRow
              id={item.id}
              name={item.name}
              excerpt={item.current_price}
              imageUrl={item.image}
              onPress={handlePressTokenRow}
            />
          );
        }}
      />
    </Screen>
  );
}

function HomeWrapper({
    navigation,
  }: NativeStackScreenProps<RootStackParamList, "Ticket">) {

    const handlePressSearch = (id: string) => {
        navigation.push("List", { id });
      };
    
      const handlePressDepature = (id: string) => {
        navigation.push("Depature", { id });
      };

      const handlePressArr = (id: string) => {
        navigation.push("Arrival", { id });
      };
      

    return(
        <>
        <HomeScreen 
        onPress={handlePressSearch}
        onPressLos={handlePressDepature}
        onPressAbj={handlePressArr}
        />
        </>
    )
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

function DepatureInfo({
  route,
}: NativeStackScreenProps<RootStackParamList, "Depature">) {
  const { data, loading } = useTokenData();
  const {  } = route.params;

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  return (
    <Screen style={tw`bg-red-600`}>
      <View style={tw`flex flex-col justify-between`}>
      <View style={tw``}>
      <Text style={tw`flex text-white`}>
        GMT +1
        </Text>
        <Text style={tw`text-[4rem] text-white font-bold`}>
        Lagos
        </Text>
      </View>
      <View style={tw``}>
        <Text style={tw`text-white`}>
        Lagos State was created on May 27, 1967 by virtue of States [Creation and Transitional Provisions] Decree No. 14 of 1967 which restructured Nigeria’s Federation into 12 States. Prior to this, Lagos Municipality was administered as a Federal Territory by the Federal Government through the Federal Ministry of Lagos Affairs as the regional authority, while the Lagos City Council governed the City of Lagos. Equally, the Metropolitan areas [Colony Province] of Ikeja, Agege, Mushin, Ojo, Ikorodu, Epe, and Badagry were then administered by the Western Region Government. The State took off as an administrative entity on April 11, 1968 with Lagos Island serving the dual role of being the State and Federal Capital respectively
        </Text>
      </View>
    </View>
    </Screen>
  );
}

function ArrivalInfo({
  route,
}: NativeStackScreenProps<RootStackParamList, "Arrival">) {
  const { data, loading } = useTokenData();
  const {  } = route.params;

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  return (
    <Screen style={tw`bg-red-600`}>
      <View style={tw`flex flex-col justify-between`}>
      <View style={tw``}>
      <Text style={tw`flex text-white`}>
        GMT +1
        </Text>
        <Text style={tw`text-[4rem] text-white font-bold`}>
        Abuja
        </Text>
      </View>
      <View style={tw``}>
        <Text style={tw`text-white`}>
        Abuja is located in the centre of Nigeria, within the Federal Capital Territory (FCT). Abuja is a planned city, and was built mainly in the 1980s. It officially became Nigeria's capital on 12 December 1991, replacing Lagos, though the latter remains the country's most populous city. At the 2006 census, the city of Abuja had a population of 776,298, making it one of the ten most populous cities in Nigeria.
        Abuja has witnessed a huge influx of people into the city; the growth has led to the emergence of satellite towns such as Karu Urban Area, Suleja, Gwagwalada, Lugbe, Kuje and smaller settlements to which the planned city is sprawling. The unofficial metropolitan area of Abuja has a population of well over three million and comprises the fourth largest urban area in Nigeria, surpassed only by Lagos, Kano and Ibadan.
        </Text>
      </View>
    </View>
    </Screen>
  );
}

function MoreTickets({
    route,
  }: NativeStackScreenProps<RootStackParamList, "List">) {
    const { data, loading } = useTokenData();
    const {  } = route.params;
  
    if (loading) {
      return <FullScreenLoadingIndicator />;
    }
  
    // const item = data.find((d) => d.id === id);
  
    // if (!item) {
    //   return null;
    // }
  
    return (
      <Screen style={tw`bg-red-600`}>
        <View style={tw`flex flex-col`}>
        <View style={tw`flex flex-row justify-between`}>
        <View style={tw``}>
          <Text style={tw`text-white`}>
            From
          </Text>
          <Text style={tw`text-[4rem] text-white font-bold`}>
            ABJ
          </Text>
          <Text style={tw`text-white`}>
            Lagos
          </Text>
        </View>
        <View style={tw``}>
          <Text style={tw`flex text-white justify-end`}>
            To
          </Text>
          <Text style={tw`text-[4rem] text-white font-bold`}>
            LOS
          </Text>
          <Text style={tw`flex justify-end text-white`}>
            Abuja
          </Text>
        </View>
      </View>
      <Pressable style={tw`bg-white flex justify-center mt-2 py-3`}>
          <Text style={tw`mx-auto`}>Buy ticket</Text>
      </Pressable>
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

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen
        name="Ticket"
        component={HomeWrapper}
        options={{ title: "My ticket" }}
      />
      <Stack.Screen
        name="Depature"
        component={DepatureInfo}
        options={{ title: "About Lagos" }}
      />
      <Stack.Screen
        name="Arrival"
        component={ArrivalInfo}
        options={{ title: "About Abuja" }}
      />
      <Stack.Screen
        name="List"
        component={MoreTickets}
        options={{ title: "Ticket List" }}
      />
    </Stack.Navigator>
  );
};
