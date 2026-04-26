import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  Call,
  CallContent,
} from "@stream-io/video-react-native-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { Config } from "../../constants/Config";

// In a real app, use react-native-dotenv or expo-env for this
const apiKey = "ntd48gvsgdpz";

export default function MobileVideoCall() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    const initVideo = async () => {
      let videoClient: StreamVideoClient | null = null;
      let currentCall: Call | null = null;

      try {
        const token = await AsyncStorage.getItem("token");
        const userDataStr = await AsyncStorage.getItem("user");

        if (!token || !userDataStr || !id) {
          router.replace("/signin");
          return;
        }

        const user = JSON.parse(userDataStr);

        // Fetch Token from Backend
        const API_BASE_URL = Config.API_URL;
        const response = await fetch(
          `${API_BASE_URL}/api/auth/generate-stream-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id || "temp-id" }),
          },
        );
        const data = await response.json();

        if (data.success && data.token) {
          const streamUser = {
            id: user.id || "temp-id",
            name: user.fullname || user.username || "User",
            image: "https://getstream.io/random_svg/?id=user1",
          };

          videoClient = new StreamVideoClient({
            apiKey,
            user: streamUser,
            token: data.token,
          });

          currentCall = videoClient.call("default", id);
          await currentCall.join({ create: true });

          setClient(videoClient);
          setCall(currentCall);
        }
      } catch (error) {
        console.error("Error initializing video:", error);
      }

      return () => {
        if (currentCall) {
          currentCall.leave().catch(console.error);
        }
        if (videoClient) {
          videoClient.disconnectUser().catch(console.error);
        }
        setClient(null);
        setCall(null);
      };
    };

    const cleanupPromise = initVideo();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [id, router]);

  if (!client || !call) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#14b8a6" />
        <Text className="text-white mt-4 font-medium">
          Connecting to secure video call...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <View className="flex-1">
            <View className="absolute top-12 left-4 z-10 bg-black/50 px-3 py-1.5 rounded-full flex-row items-center border border-white/10">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
              <Text className="text-white text-xs font-semibold">
                Encrypted Session
              </Text>
            </View>
            <TouchableOpacity
              className="absolute top-12 right-4 z-10 bg-black/50 p-2 rounded-full border border-white/10"
              onPress={() => {
                call.leave();
                router.back();
              }}
            >
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>

            <CallContent
              onHangupCallHandler={() => {
                call.leave();
                router.back();
              }}
            />
          </View>
        </StreamCall>
      </StreamVideo>
    </SafeAreaView>
  );
}
