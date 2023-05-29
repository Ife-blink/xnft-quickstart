import { Text, FlatList, View, Image, Pressable, Button } from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";

interface HomeProps {
  onPress: (params: any) => any,
  onPressLos: (params: any) => any,
  onPressAbj: (params: any) => any,
}

export function HomeScreen({onPress, onPressLos, onPressAbj}: HomeProps) {
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];

  return (
    <Screen style={tw`bg-red-600`}>
      {/* <Text style={tw`mb-4`}>
        You'll find several examples of how to build xNFTs using react-native:
      </Text> */}
      <View>
        <Text style={tw`text-white font-medium text-[1.8rem]`}>
        Monday
        </Text>
        <Text style={tw`mt-2 text-white text-[0.8rem]`}>
        02 January 2024
        </Text>
        <View>
          
        </View>
      </View>

      <View style={tw`w-[100%] bg-[#FFFFFF60] my-3 h-[2px]`}>
      </View>

      <View style={tw`flex flex-row justify-between`}>
        <View style={tw``}>
          <Text style={tw`text-white`}>
            From
          </Text>
          <Pressable onPress={onPressLos}>
          <Text style={tw`text-[4rem] text-white font-bold`}>
            LOS
          </Text>
          </Pressable>
          <Text style={tw`text-white`}>
            Lagos
          </Text>
        </View>
        <View style={tw``}>
          <Text style={tw`flex text-white justify-end`}>
            To
          </Text>
          <Pressable onPress={onPressAbj}>
          <Text style={tw`text-[4rem] text-white font-bold`}>
            ABJ
          </Text>
          </Pressable>
          <Text style={tw`flex justify-end text-white`}>
            Abuja
          </Text>
        </View>
      </View>

      <View style={tw`w-[100%] bg-[#FFFFFF60] my-3 h-[2px]`}>
      </View>

      <View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-white`}>Date</Text>
          <Text style={tw`text-white`}>Person</Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-[2rem] font-medium text-white`}>03 Jan 2024</Text>
          <Text style={tw`text-[2rem] font-medium text-white`}>2</Text>
        </View>
      </View>

      <View style={tw`w-[100%] bg-[#FFFFFF60] my-3 h-[2px]`}>
      </View>

      <View style={tw`w-[100%]`}>
        <Text style={tw`text-white`}>Return</Text>
        <View style={tw`flex flex-row w-[100%] justify-center`}>
        <Pressable style={tw`bg-white mr-1 py-2 px-3`}><Text>One way</Text></Pressable>
        <Pressable style={tw`border-[2px] ml-1 border-white py-2 px-3`}><Text style={tw`text-white`}>Return</Text></Pressable>
        </View>
      </View>

      <View style={tw`w-[100%] bg-[#FFFFFF60] my-3 h-[2px]`}>
      </View>

      <View>
        <Pressable 
        onPress={onPress}
        style={tw`bg-white w-[100%] border-[2px] border-[#00000020] py-2 px-auto flex justify-center`}>
          <Text style={tw`mx-auto`}>Search more tickets</Text>
        </Pressable>
      </View>

      <View>
       <Text style={tw`text-white my-2`}>Hotels</Text>
       <View>
        <View style={tw`border-[2px] border-white w-[100%] flex flex-row items-center`}>
          <View style={tw`w-[50px] h-[50px] bg-black m-2`}>

          </View>
        <Text>Transcorp Hilton</Text>
        </View>
       </View>
      </View>
      {/* <FlatList
        data={features}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>- {item}</Text>}
      /> */}
    </Screen>
  );
}
