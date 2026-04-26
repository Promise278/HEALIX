import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Config } from "../../constants/Config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function HelaraAIChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi, I’m Helara AI — your friendly health companion! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!input.trim() || loading || isFinal) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${Config.API_URL}/api/ai/health`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history: updatedMessages }),
      });

      const data = await response.json();

      if (data?.turnCount >= 4) {
        setIsFinal(true);
      }

      if (data?.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else if (data?.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch (error) {
      console.error("Helara AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, loading]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <Feather name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
            <Text className="text-xl">🤖</Text>
          </View>
          <View>
            <Text className="font-bold text-gray-900 text-base">Helara AI</Text>
            <Text className="text-xs text-green-500 font-medium">Virtual Assistant</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-50"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, idx) => (
            <View
              key={idx}
              className={`flex-row mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <View
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#23a9ba] rounded-tr-sm"
                    : "bg-white border border-gray-200 rounded-tl-sm shadow-sm"
                }`}
              >
                <Text
                  className={`text-base leading-5 ${
                    msg.role === "user" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}

          {loading && (
            <View className="flex-row mb-4 justify-start">
              <View className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <ActivityIndicator size="small" color="#23a9ba" />
              </View>
            </View>
          )}

          {isFinal && (
            <View className="mt-4 bg-green-50 p-6 rounded-3xl border border-green-100 items-center">
              <Text className="text-green-800 text-center font-medium mb-4 text-sm">
                Clinical assessment complete. You can now consult a verified specialist with this report.
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)")}
                className="bg-[#23a9ba] px-8 py-3 rounded-xl w-full"
              >
                <Text className="text-white text-center font-bold">Find a Doctor</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {!isFinal && (
          <View className="px-4 py-3 bg-white border-t border-gray-100">
            <View className="flex-row items-end bg-gray-50 rounded-2xl border border-gray-200 p-2">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask a health question..."
                placeholderTextColor="#9ca3af"
                multiline
                className="flex-1 px-3 py-2 text-base text-gray-800 max-h-32 min-h-[40px]"
              />
              <TouchableOpacity
                onPress={handleSend}
                disabled={!input.trim() || loading}
                className={`w-12 h-12 rounded-xl items-center justify-center ml-2 ${
                  input.trim() && !loading ? "bg-[#23a9ba]" : "bg-gray-300"
                }`}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
