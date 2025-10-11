import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <LinearGradient
      colors={["#4ade80", "#4ade"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 px-6"
    >
      {/* Main content */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../assets/images/healix-logo-removebg-preview.png")}
          className="w-64 h-72 mb-8 rounded-2xl"
        />
        <Text className="text-5xl font-extrabold text-black mb-3">HEALIX</Text>
        <Text className="text-center text-black text-base mb-8 leading-6">
          Healing through linking - quality healthcare at home{'\n'}
          Your health, our priority. Connect with top doctors anytime, anywhere.
        </Text>

        {/* Unique Get Started button */}
        <TouchableOpacity
          onPress={() => router.push("/signup")}
          className="bg-white rounded-full px-16 py-5 mb-4 shadow-xl"
        >
          <Text className="text-green-600 text-2xl font-bold text-center">
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Sign In link */}
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text className="text-white text-lg font-semibold underline">
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer text */}
      <View className="items-center mb-14">
        <Text className="text-sm text-center text-gray-600">
          By continuing, you agree to our{" "}
          <Text className="underline font-semibold">Terms</Text> &{" "}
          <Text className="underline font-semibold">Privacy Policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}
