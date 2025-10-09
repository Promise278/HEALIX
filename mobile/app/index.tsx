import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <View className="flex-1 justify-center items-center bg-[#001F3F] px-6">
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 350, height: 350, resizeMode: "contain", marginBottom: 40 }}
      />
      <TouchableOpacity
        onPress={() => router.push("/signup")}
        className="bg-[#FFA500] rounded-lg px-12 py-6"
      >
        <Text className="text-white text-2xl font-serif">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
