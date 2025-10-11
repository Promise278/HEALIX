import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Bell, Menu, Search, Video, MessageSquare, Calendar, Activity, Clock, Home, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const doctors = [
    { id: 1, image: "👨‍⚕️", name: "Dr. James Carter", specialty: "Dermatologist", rating: "4.9", available: true, nextSlot: "3:00 PM" },
    { id: 2, image: "👩‍⚕️", name: "Dr. Sarah Chen", specialty: "Cardiologist", rating: "4.8", available: false, nextSlot: "5:00 PM" },
  ];

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={["#2563eb", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-b-3xl px-6 pt-12 pb-8 shadow-lg"
        >
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-blue-100 text-sm">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">John Doe</Text>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity className="bg-white/20 backdrop-blur p-2.5 rounded-full">
                <Bell color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/20 backdrop-blur p-2.5 rounded-full">
                <Menu color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View className="bg-white/95 backdrop-blur rounded-2xl p-4 flex-row items-center gap-3 shadow-lg">
            <Search color="#9ca3af" size={20} />
            <TextInput
              placeholder="Search doctors, specialties..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-gray-700 bg-transparent"
            />
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View className="px-6 py-6">
          <View className="flex-row flex-wrap justify-between rounded-md">
            {[
              { icon: Video, label: "Video Call", colors: ["#3b82f6", "#2563eb"] },
              { icon: MessageSquare, label: "Chat", colors: ["#22c55e", "#16a34a"] },
              { icon: Calendar, label: "Schedule", colors: ["#a855f7", "#7e22ce"] },
              { icon: Activity, label: "Records", colors: ["#ec4899", "#db2777"] },
            ].map((action, idx) => (
              <TouchableOpacity key={idx} className="items-center w-[22%] mb-4">
                <LinearGradient
                  // colors={action.colors}
                  colors={["#19c3ee", "#0cd660"]}
                  className="p-4 rounded-2xl shadow-md mb-2"
                >
                  <action.icon color="white" size={24} />
                </LinearGradient>
                <Text className="text-xs text-gray-600 font-medium">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Upcoming</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={["#2563eb", "#7c3aed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-md p-5 shadow-lg"
          >
            <View className="flex-row justify-between mb-4">
              <View className="flex-row gap-4">
                <Text className="text-5xl">👩‍⚕️</Text>
                <View>
                  <Text className="text-white font-bold text-lg">Dr. Sarah Chen</Text>
                  <Text className="text-blue-100 text-sm">Cardiology Checkup</Text>
                </View>
              </View>
              <View className="bg-white/20 px-3 py-3 rounded-full">
                <Text className="text-white text-md font-semibold">TODAY</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Clock color="white" size={16} />
                <Text className="text-sm font-medium text-white">2:00 PM - 2:30 PM</Text>
              </View>
              <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
                <Text className="text-blue-600 text-sm font-semibold">Join Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Available Now Section */}
        <View className="px-6 pb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Available Now</Text>
            <TouchableOpacity onPress={() => setCurrentScreen("doctors")}>
              <Text className="text-blue-600 text-sm font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-y-4">
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                onPress={() => setCurrentScreen("doctorDetail")}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <View className="flex-row items-center gap-4">
                  <Text className="text-4xl">{doctor.image}</Text>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">{doctor.name}</Text>
                    <Text className="text-gray-500 text-sm">{doctor.specialty}</Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-yellow-500 text-sm">⭐</Text>
                      <Text className="text-gray-600 text-sm font-medium ml-1">
                        {doctor.rating}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    {doctor.available && (
                      <View className="bg-green-100 px-3 py-1 rounded-full mb-1">
                        <Text className="text-green-700 text-xs font-semibold">Available</Text>
                      </View>
                    )}
                    <Text className="text-gray-400 text-xs">{doctor.nextSlot}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}