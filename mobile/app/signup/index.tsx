import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox"
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState<string | null>(null);
  const handleRegister = () => {
    if (!name || !email || !password || !team) {
      alert("Please fill all fields");
      return;
    }

    fetch("https://test.blockfuselabs.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        team_name: team,
      }),
    }).then((res) => 
      res.json().then((data) => {
        if (res.ok) {
          AsyncStorage.setItem("user", JSON.stringify({ name, email }));
          alert("Registration successful!");
          router.replace("/signin");
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
    <View className="flex-1 items-center px-4">
      <Image
        source={require("../../assets/images/signuplogo.png")}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
        }}
      />
      <View className="gap-y-10 -mt-8" >
        <TextInput
          className="w-[340px] border-b-2 border-[#989898]"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <View className="w-full">
          <Text className="mb-2 text-gray-400">Team Name</Text>
          <View className="flex-row justify-around gap-4 mt-2">
            {["404", "Elons", "Titans", "Pull Request"].map((teamName) => (
              <View key={teamName} className="flex-row items-center gap-x-2">
                <Checkbox
                  color={"#001F3F"}
                  value={team === teamName}
                  onValueChange={() =>
                    setTeam(team === teamName ? null : teamName)
                  }
                />
                <Text>{teamName}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={handleRegister}  className="bg-[#001F3F] rounded-full px-2 py-6 -mt-4">
          <Text className="text-white text-xl text-center">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row items-center -mt-6">
          <View className="flex-1 h-[2px] bg-gray-400" />
          <Text className="mx-3 text-gray-500">Or sign in with</Text>
          <View className="flex-1 h-[2px] bg-gray-400" />
        </View>
        <TouchableOpacity className="bg-gray-400 shadow-md rounded-full py-5 -mt-6 flex-row items-center justify-center">
          <FontAwesome name="google" size={26} color="#DB4437" /><Text className="text-2xl text-center pl-2">Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-2xl mt-4">Already have an acoount?<Text onPress={() => router.push("/signin")} className="font-bold text-lg">signin</Text></Text>
    </View>
  );
}
