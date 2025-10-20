import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { User, Mail, Phone, MapPin, Settings, LogOut } from "lucide-react-native";

const Profile = () => {
  const menuItems = [
    { icon: Settings, label: "Settings", action: () => console.log("Settings") },
    { icon: LogOut, label: "Logout", action: () => console.log("Logout"), destructive: true },
  ];

  return (
    <View className="flex-1 bg-white px-4 mt-14 pb-20">
      {/* Header */}
      <Text className="text-2xl font-bold mb-6 text-gray-900">Profile</Text>

      {/* Profile Card */}
      <View className="items-center bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <View className="w-24 h-24 rounded-full bg-[#2ac9de] items-center justify-center mb-4">
          <Text className="text-white text-3xl font-bold">JD</Text>
        </View>
        <Text className="text-xl font-semibold text-gray-900">John Doe</Text>
        <Text className="text-sm text-gray-500 mt-1">Patient ID: #12345</Text>
      </View>

      {/* Personal Info */}
      <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Personal Information</Text>

        <View className="flex-row items-center gap-3 mb-3">
          <Mail size={20} color="#6b7280" />
          <Text className="text-sm text-gray-700">john.doe@email.com</Text>
        </View>

        <View className="flex-row items-center gap-3 mb-3">
          <Phone size={20} color="#6b7280" />
          <Text className="text-sm text-gray-700">+1 (555) 123-4567</Text>
        </View>

        <View className="flex-row items-center gap-3">
          <MapPin size={20} color="#6b7280" />
          <Text className="text-sm text-gray-700">New York, NY</Text>
        </View>
      </View>

      {/* Settings & Logout */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.action}
            activeOpacity={0.8}
            className={`w-full flex-row items-center gap-3 h-14 px-4 rounded-xl border 
              ${item.destructive ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"}`}
          >
            <item.icon size={22} color={item.destructive ? "#ef4444" : "#374151"} />
            <Text
              className={`text-base ${
                item.destructive ? "text-red-500 font-medium" : "text-gray-800"
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;