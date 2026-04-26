"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Video, MoreVertical, ShieldCheck, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id?: string;
  conversationId: string;
  senderId: string;
  senderModel: string;
  content: string;
  timestamp?: string | Date;
}

interface ChatUser {
  id: string;
  fullname?: string;
  username?: string;
  [key: string]: unknown;
}

export default function ChatPage() {
  const router = useRouter();
  const pathname = usePathname();
  const conversationId = pathname?.split("/").pop() || "";

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState<ChatUser | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    setUserType(type);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  useEffect(() => {
    if (!conversationId || !user) return;

    // Connect to Socket.IO server
    const newSocket = io(
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
    );
    setSocket(newSocket);

    // Join conversation room
    newSocket.emit("join_conversation", conversationId);

    // Listen for incoming messages
    newSocket.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [conversationId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket || !user) return;

    const newMessage: Message = {
      conversationId,
      senderId: user.id || "temp-id",
      senderModel: userType === "patient" ? "Patient" : "Doctor",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("send_message", newMessage);
    setInputMessage("");
  };

  const handleVideoCall = () => {
    router.push(`/pages/video-call/${conversationId}`);
  };

  const backRoute =
    userType === "doctor" ? "/pages/docsdashboard" : "/pages/dashboard";

  return (
    <div className="flex flex-col h-screen bg-[#fbfcfd] overflow-hidden font-sans text-slate-800">

      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-slate-100 h-16 z-20">
        <div className="flex items-center gap-4">
          <Link
            href={backRoute}
            className="w-8 h-8 flex items-center justify-center bg-[#f8fafc] border border-slate-100 rounded-md hover:bg-teal-50 hover:text-teal-600 transition-all text-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0d9488] rounded-md flex items-center justify-center font-bold text-white text-sm relative italic">
              Hx
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-800 text-sm tracking-tight leading-none">
                  {userType === "patient"
                    ? "Clinical Response Team"
                    : "Patient Consultation"}
                </h2>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                 Active secure link • HLX-ID: #{conversationId.slice(0, 4).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="w-9 h-9 flex items-center justify-center bg-[#f8fafc] border border-slate-100 rounded-md hover:bg-teal-50 hover:text-teal-600 transition-all text-slate-300">
            <Phone className="w-4 h-4" />
          </button>
          <Button
            onClick={handleVideoCall}
            className="flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-md px-5 h-9 font-bold text-[11px] shadow-xs"
          >
            <Video className="w-4 h-4" />
            Join Sync
          </Button>
          <button className="w-9 h-9 flex items-center justify-center bg-[#f8fafc] border border-slate-100 rounded-md hover:bg-teal-50 hover:text-teal-600 transition-all text-slate-300">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-10 space-y-6 scrollbar-hide bg-[#fbfcfd]">
        <div className="flex justify-center mb-8">
          <span className="text-[9px] font-black text-slate-400 bg-white border border-slate-100 px-4 py-1.5 rounded-md uppercase tracking-widest">
            Session Established: {new Date().toLocaleDateString()}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === (user?.id || "temp-id");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[50%] p-4 rounded-lg relative ${
                    isMe
                      ? "bg-[#0d9488] text-white shadow-xs rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-800 shadow-xs rounded-tl-none"
                  }`}
                >
                  <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                  <div
                    className={`text-[8px] mt-2 font-bold uppercase tracking-wider ${isMe ? "text-teal-100" : "text-slate-400"}`}
                  >
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Syncing..."}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 z-20">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-3 rounded-lg bg-[#f8fafc] p-2 border border-slate-100 shadow-xs"
        >
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Official clinical communication..."
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 px-4 text-xs text-slate-700 placeholder:text-slate-400 font-medium"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-11 h-11 rounded-md bg-[#0d9488] hover:bg-[#0f766e] text-white shrink-0 flex items-center justify-center transition-all shadow-xs disabled:opacity-30"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </Button>
        </form>
         <p className="text-center mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          End-to-End Encryption • HIPAA COMPLIANT REGISTRY
        </p>
      </div>
    </div>
  );
}
