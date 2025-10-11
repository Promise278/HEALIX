import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const handleRegister = () => {
  //   if (!name || !email || !password ) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   fetch("https://test.blockfuselabs.com/api/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then((res) =>
  //       res.json().then((data) => {
  //         if (res.ok) {
  //           alert("Registration successful!");
  //           router.replace("/signin");
  //         } else {
  //           alert(data.message || "Something went wrong");
  //         }
  //       })
  //     )
  //     .catch(() => {
  //       alert("Network error, please try again.");
  //     });
  // };
  return (
    <View className="flex-1 items-center px-4">
      <Image
        source={require("../../assets/images/healix-logo.png")}
        style={{
          width: 230,
          height: 230,
          resizeMode: "contain",
        }}
        className="mt-20"
      />
      <Text className="-mt-6">Your trusted telemedicine platform</Text>
        <View className="mt-10 w-[320px] gap-y-8">
          {/* Email */}
          <View>
            <Text className="text-gray-700 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <Feather name="mail" size={18} color="#888" />
              <TextInput
                placeholder="your@email.com"
                keyboardType="email-address"
                className="flex-1 ml-2"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          {/* Password */}
          <View>
            <Text className="text-gray-700 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <Feather name="lock" size={18} color="#888" />
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                className="flex-1 ml-2"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          {/* Gradient Button */}
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => router.push('/(tabs)')}
            className="rounded-full w-72 ml-10 mb-2 overflow-hidden mt-4"
          >
            <LinearGradient
              colors={["#19c3ee", "#0cd660"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center text-white font-semibold text-lg">
                  Sign in
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
      <View className="mt-4 flex-row justify-center items-center">
        <Text className="text-lg text-gray-600">Dont have an account? </Text>
        <Text
          onPress={() => router.push("/signup")}
          className="text-[#19c3ee] font-semibold text-base underline"
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}