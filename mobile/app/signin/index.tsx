import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "../../constants/Config";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${Config.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("userType", data.user.role);

      Alert.alert("Success", data.message || "Login successful!");
      
      if (data.user.role === "patient") {
        router.replace("/(tabs)");
      } else if (data.user.role === "doctor") {
        router.replace("/docsdashboard" as any); // Assuming this route exists
      } else if (data.user.role === "admin") {
        router.replace("/admin" as any); // Assuming this route exists
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
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
            onPress={handleLogin}
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