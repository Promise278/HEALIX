"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  Call,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

interface UserPayload {
  id: string;
  fullname?: string;
  username?: string;
}

export default function VideoCallPage() {
  const router = useRouter();
  const pathname = usePathname();
  const callId = pathname?.split("/").pop() || "";

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  useEffect(() => {
    if (!user || !callId) return;

    const setupStream = async () => {
      let videoClient: StreamVideoClient | null = null;
      let currentCall: Call | null = null;

      try {
        // Fetch Token
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/api/auth/generate-stream-token`,
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

          currentCall = videoClient.call("default", callId);
          await currentCall.join({ create: true });

          setClient(videoClient);
          setCall(currentCall);
        }
      } catch (error) {
        console.error("Error setting up stream client:", error);
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

    const cleanupPromise = setupStream();

    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [user, callId]);

  if (!client || !call) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 flex-col gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium text-lg">
          Connecting to secure health consultation...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <div className="flex-1 flex flex-col pb-4 h-full relative">
              {/* Header */}
              <div className="absolute top-0 left-0 w-full p-6 z-10 flex items-center justify-between pointer-events-none">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white pointer-events-auto shadow-sm border border-white/10">
                  <h1 className="font-semibold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Encrypted Session: {callId.slice(0, 8)}...
                  </h1>
                </div>
              </div>

              {/* Video Layout */}
              <div className="flex-1 px-4 pt-20">
                <SpeakerLayout participantsBarPosition="bottom" />
              </div>

              {/* Controls */}
              <div className="mt-auto px-4 w-full flex justify-center">
                <div className="bg-gray-800/80 backdrop-blur-xl p-3 rounded-3xl border border-gray-700/50 shadow-2xl">
                  <CallControls
                    onLeave={() => {
                      call.leave();
                      router.back();
                    }}
                  />
                </div>
              </div>
            </div>
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
}
