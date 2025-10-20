import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { User } from "lucide-react-native";
// import { useRouter } from "expo-router";

const Chat = () => {
  // const router = useRouter();

  const conversations = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      lastMessage: "Your test results look good. Let's schedule a follow-up.",
      timestamp: "2m ago",
      unreadCount: 2,
      icon: "User",
      online: true,
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Physician",
      lastMessage: "Don't forget to take your medication twice daily.",
      timestamp: "1h ago",
      unreadCount: 0,
      icon: "UserCircle",
      online: true,
    },
    {
      id: 3,
      doctorName: "Dr. Emily Roberts",
      specialty: "Dermatologist",
      lastMessage: "The prescription has been sent to your pharmacy.",
      timestamp: "Yesterday",
      unreadCount: 0,
      icon: "UserCircle",
      online: false,
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-[#f6f8fa] px-4 mt-14"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text className="text-2xl font-bold text-gray-900 mb-4">Messages</Text>

      <View className="relative mb-6">
        <Feather
          name="search"
          size={18}
          color="#6c7d92"
          style={{ position: "absolute", top: 14, left: 12 }}
        />
        <TextInput
          placeholder="Search conversations..."
          placeholderTextColor="#8a8a8a"
          className="bg-white rounded-xl border border-gray-200 pl-10 pr-3 h-12 text-gray-800"
        />
      </View>

      {/* 💬 Chat List */}
      <View className="gap-3">
        {conversations.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            className="flex-row items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
            // onPress={() => router.push(`/chat/${chat.id}`)}
            activeOpacity={0.7}
          >
            <View className="relative mr-3">
              <User size={40} color="#23a9ba" />
              {chat.online && (
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </View>

            {/* Info */}
            <View className="flex-1">
              <View className="flex-row justify-between items-start mb-1">
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold text-gray-900"
                    numberOfLines={1}
                  >
                    {chat.doctorName}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {chat.specialty}
                  </Text>
                </View>
                <Text className="text-xs text-gray-400 ml-2">
                  {chat.timestamp}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text
                  className="text-sm text-gray-600 flex-1"
                  numberOfLines={1}
                >
                  {chat.lastMessage}
                </Text>
                {chat.unreadCount > 0 && (
                  <View className="bg-[#23a9ba] rounded-full w-5 h-5 items-center justify-center ml-2">
                    <Text className="text-white text-xs font-semibold">
                      {chat.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Chat;