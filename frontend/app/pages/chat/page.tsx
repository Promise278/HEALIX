"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Search, 
  ChevronRight,
  User,
  ShieldCheck,
  Bell,
  LayoutDashboard, 
  Calendar, 
  FileText, 
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SidebarItem } from "@/components/Dashboard/DashboardComponents";

interface Conversation {
  conversationId: string;
  lastMessage: string;
  timestamp: string;
  senderModel: string;
  name?: string;
}

export default function ChatListPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; fullname?: string; username?: string; [key: string]: unknown } | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

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
    if (!user) return;

    const fetchConversations = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/api/messages/conversations/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setConversations(data.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: userType === "doctor" ? "/pages/docsdashboard" : "/pages/dashboard",
      active: false,
    },
    {
      label: userType === "doctor" ? "Schedule" : "Appointments",
      icon: Calendar,
      path: userType === "doctor" ? "/pages/docsdashboard" : "/pages/dashboard",
      active: false,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/pages/chat",
      active: true,
    },
    {
      label: userType === "doctor" ? "Patients" : "Medical Records",
      icon: userType === "doctor" ? User : FileText,
      path: userType === "doctor" ? "/pages/docsdashboard" : "/pages/dashboard",
      active: false,
    },
  ];

  return (
    <div className="flex h-screen bg-[#fbfcfd] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8fafc] flex flex-col h-full z-20 border-r border-slate-100">
        <div className="p-6">
          <Link href={userType === "doctor" ? "/pages/homedocs" : "/pages/home"} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0d9488] rounded-md flex items-center justify-center text-white font-black text-sm">
              Hx
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-800 tracking-tight leading-none mb-0.5">
                HeaLix
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {userType === "doctor" ? "Expert Console" : "Patient Portal"}
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 mt-6 space-y-1">
          {navItems.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              icon={item.icon}
              href={item.path}
              active={item.active}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-slate-400 hover:text-red-500 rounded-lg transition-all duration-200 font-bold text-[10px] uppercase tracking-widest"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="bg-white px-8 py-4 items-center justify-between border-b border-slate-100 flex h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Messages</h1>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold bg-[#f8fafc] px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-100">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              Secure
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative w-48 mr-2">
              <Search className="w-3 h-3 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#f8fafc] border-none rounded-md text-[11px] placeholder:text-slate-300 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-700 leading-tight">
                  {user?.fullname || user?.username || "Account"}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Healthcare Admin
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center font-black text-teal-600 text-[10px] border border-teal-100 uppercase">
                {user?.fullname?.[0] || user?.username?.[0] || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Chat List Area */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-3xl mx-auto space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Synchronizing...</p>
              </div>
            ) : conversations.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {conversations.map((conv, idx) => (
                  <motion.div
                    key={conv.conversationId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href={`/pages/chat/${conv.conversationId}`}>
                      <GlassCard className="p-4 group hover:border-teal-100 transition-all cursor-pointer shadow-xs border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center font-black text-slate-300 group-hover:bg-[#0d9488] group-hover:text-white transition-all text-sm border border-slate-100 italic">
                            Hx
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                              <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                                {userType === "patient" ? "Clinical Specialist" : "Patient ID"} #{conv.conversationId.slice(-4)}
                              </h3>
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                                {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate font-medium group-hover:text-slate-700 transition-colors">
                              {conv.lastMessage}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-teal-600 transition-all" />
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-800 mb-1">No Active Consultations</h3>
                  <p className="text-slate-400 max-w-xs mx-auto text-[11px] font-medium leading-relaxed">
                    Start a new session to begin communicating with our medical registry.
                  </p>
                </div>
                <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-md px-6 h-9 font-bold text-[11px] shadow-xs">
                  New Session
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
