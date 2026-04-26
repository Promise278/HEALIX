import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Config } from "../../constants/Config";

interface Message {
  id?: string;
  conversationId: string;
  senderId: string;
  senderModel: string;
  content: string;
  timestamp?: string | Date;
}

export default function ChatRoom() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const type = await AsyncStorage.getItem("userType");
        const userData = await AsyncStorage.getItem("user");

        if (!token) {
          router.replace("/signin");
          return;
        }

        setUserType(type);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    loadUser();
  }, [router]);

  useEffect(() => {
    if (!id || !user) return;

    const SOCKET_URL = Config.SOCKET_URL;

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.emit("join_conversation", id);
    console.log("Joined conversation:", id);

    newSocket.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, user]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket || !user) return;

    const newMessage: Message = {
      conversationId: id,
      senderId: user.id || "temp-id",
      senderModel: userType === "patient" ? "Patient" : "Doctor",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, newMessage]);

    // Send to server
    socket.emit("send_message", newMessage);
    setInputMessage("");
  };

  const handleVideoCall = () => {
    router.push(`/video-call/${id}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shadow-sm z-10">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <Feather name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center mr-3">
            <Text className="text-teal-700 font-bold text-lg">
              {userType === "patient" ? "D" : "P"}
            </Text>
          </View>
          <View>
            <Text className="font-bold text-gray-900 text-base">
              {userType === "patient"
                ? "Doctor Consultation"
                : "Patient Consultation"}
            </Text>
            <Text className="text-xs text-green-500 font-medium">Online</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleVideoCall}
          className="flex-row items-center bg-teal-50 px-3 py-2 rounded-lg"
        >
          <Feather name="video" size={18} color="#0f766e" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-50"
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          className="flex-1 px-4 py-4"
        >
          <View className="items-center mb-6">
            <View className="bg-gray-200 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-500 font-medium">Today</Text>
            </View>
          </View>

          {messages.map((msg, idx) => {
            const isMe = msg.senderId === (user?.id || "temp-id");
            return (
              <View
                key={idx}
                className={`flex-row mb-4 ${isMe ? "justify-end" : "justify-start"}`}
              >
                <View
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    isMe
                      ? "bg-teal-600 rounded-tr-sm"
                      : "bg-white border border-gray-200 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <Text
                    className={`text-base leading-5 ${isMe ? "text-white" : "text-gray-800"}`}
                  >
                    {msg.content}
                  </Text>
                  <Text
                    className={`text-[10px] mt-1 text-right ${isMe ? "text-teal-100" : "text-gray-400"}`}
                  >
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="px-4 py-3 bg-white border-t border-gray-100">
          <View className="flex-row items-end bg-gray-50 rounded-2xl border border-gray-200 p-2">
            <TextInput
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type your message here..."
              placeholderTextColor="#9ca3af"
              multiline
              className="flex-1 px-3 py-2 text-base text-gray-800 max-h-32 min-h-[40px]"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`w-12 h-12 rounded-xl items-center justify-center ml-2 ${
                inputMessage.trim() ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              <Feather name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
