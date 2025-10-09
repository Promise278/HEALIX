import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    fetch("https://test.blockfuselabs.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => 
      res.json().then((data) => {
        if (res.ok) {
          alert("Login successful!");
          router.replace("/(tabs)");
        } else {
          alert(data.message || "Something went wrong");
        }
      })
    )
    .catch(() => {
      alert("Network error, please try again.");
    });
  }
  return (
    <View className="flex-1 items-center">
      <Image
        source={require("../../assets/images/signuplogo.png")}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
        }}
      />
      <View className="gap-y-12 -mt-8">
        <TextInput
          className="w-[340px] border-b-2 border-[#989898]"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-[340px] border-b-2 border-gray-400 text-lg px-2"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text className="text-2xl font-bold text-[#001F3F] text-center">Forgot Password?</Text>
        <TouchableOpacity onPress={handleLogin} className="bg-[#001F3F] rounded-full px-2 py-6">
          <Text className="text-white text-xl text-center">Sign in</Text>
        </TouchableOpacity>
        <View className="flex-row items-center -mt-4">
          <View className="flex-1 h-[2px] bg-gray-400" />
          <Text className="mx-3 text-gray-500">Or sign in with</Text>
          <View className="flex-1 h-[2px] bg-gray-400" />
        </View>
        <TouchableOpacity className="bg-gray-400 shadow-md rounded-full py-5 flex-row items-center justify-center">
          <FontAwesome name="google" size={26} color="#DB4437" />
          <Text className="text-2xl text-center pl-2">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-2xl mt-4">Don’t have an acoount?<Text onPress={() => router.push("/signup")} className="font-bold text-lg">Register</Text></Text>
    </View>
  );
}
