import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import tw from "twrnc";

type Props = {
  id: string;
  name: string;
  excerpt: string;
  imageUrl: string;
  onPress: (id: string) => void;
};

export function TokenRow({ id, name, excerpt, imageUrl, onPress }: Props) {
  return (
    <Pressable>
      <View style={tw`flex flex-col max-w-screen`}>
        <Image source={{ uri: imageUrl }} style={tw`w-[100%] h-[10rem] object-contain`} />
        <Text style={tw`font-medium mt-1 text-[1.2rem]`}>{name}</Text>
        <Text style={tw`text-[0.7rem] mt-1`}>{excerpt}</Text>
      </View>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
  },
});
