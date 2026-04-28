"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageSquare,
  FileText,
  Activity,
  Search,
  Bell,
  LogOut,
  LayoutDashboard,
  Pill,
  CheckCircle2,
  Clock,
  Video,
  User,
} from "lucide-react";
import HealixChatbot from "@/components/HealixAi";
import { useRouter } from "next/navigation";
import {
  GlassCard,
  SidebarItem,
  StatCard,
  SectionHeader,
} from "@/components/Dashboard/DashboardComponents";
import { motion } from "framer-motion";

interface User {
  fullname?: string;
  username?: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors/getalldoctors`);
      const data = await res.json();
      if (data.success) {
        setAvailableDoctors(data.data.slice(0, 2)); // Show only 2 for dashboard preview
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    if (!token || type !== "patient") {
      router.push("/");
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchDoctors();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "/pages/dashboard",
      active: true,
    },
    {
      label: "Appointments",
      icon: Calendar,
      path: "/pages/appointments",
      active: false,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/pages/chat",
      active: false,
    },
    {
      label: "Medical Records",
      icon: FileText,
      path: "/pages/dashboard",
      active: false,
    },
    {
      label: "Prescriptions",
      icon: Pill,
      path: "/pages/dashboard",
      active: false,
    },
  ];

  return (
    <div className="flex h-screen bg-[#fbfcfd] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8fafc] flex flex-col h-full z-20 border-r border-slate-100">
        <div className="p-6">
          <Link href="/pages/home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0d9488] rounded-md flex items-center justify-center text-white font-black text-sm">
              Hx
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-800 tracking-tight leading-none mb-0.5">
                HeaLix
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Patient Portal
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
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#f8fafc] border-none rounded-md text-[11px] placeholder:text-slate-300 focus:ring-1 focus:ring-teal-500/10 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative w-8 h-8 flex items-center justify-center text-slate-300 hover:text-teal-600 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-700 leading-tight">
                  {user?.fullname || user?.username || "Patient Account"}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Healthcare User
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center font-black text-teal-600 text-[10px] border border-teal-100 uppercase">
                {user?.fullname?.[0] || user?.username?.[0] || "P"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto px-10 py-8 scrollbar-hide">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-800 tracking-tight mb-1">
                Patient Dashboard
              </h1>
              <p className="text-slate-400 text-[11px] font-medium tracking-tight">Overview of health metrics and upcoming sessions</p>
            </div>
            
            <div className="flex gap-2.5">
              <Link href="/pages/doctors">
                <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white shadow-xs rounded-md px-5 h-9 font-bold text-[11px] transition-all">
                  Book Session
                </Button>
              </Link>
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              label="Next Session" 
              value="None" 
              icon={Calendar} 
              trend="Scheduled" 
              color="teal"
              delay={0.1}
            />
            <StatCard 
              label="Prescriptions" 
              value="0" 
              icon={Pill} 
              trend="Current" 
              color="blue"
              delay={0.2}
            />
            <StatCard 
              label="Health Score" 
              value="N/A" 
              icon={CheckCircle2} 
              trend="Updating" 
              color="purple"
              delay={0.3}
            />
             <StatCard 
              label="Avg. Steps" 
              value="0" 
              icon={Activity} 
              trend="Syncing" 
              color="amber"
              delay={0.4}
            />
          </div>

          {/* Content Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Active Consultation - Placeholder until appointment logic is added */}
              <section>
                <SectionHeader title="Active Consultation" />
                <GlassCard className="p-0 border-slate-100 shadow-xs">
                  <div className="bg-white p-6 flex flex-col items-center justify-center text-center py-10">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                       <Clock className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-slate-400 text-xs font-medium">No active consultations found.</p>
                    <Link href="/pages/doctors" className="mt-4">
                      <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 rounded-md">
                        Find a Specialist
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              </section>

              <section>
                <div className="flex items-center justify-between mb-3">
                   <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Available Doctors
                  </h3>
                  <Link href="/pages/doctors" className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline">View All</Link>
                </div>
                {loading ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[1, 2].map(i => <div key={i} className="h-32 bg-white border border-slate-100 rounded-lg animate-pulse" />)}
                   </div>
                ) : availableDoctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableDoctors.map((doctor) => (
                      <GlassCard key={doctor.id} className="p-4 border-slate-100">
                        <div className="flex gap-3 items-center mb-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-md flex items-center justify-center text-xs font-black text-slate-300 border border-slate-100">
                            Hx
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-xs tracking-tight">
                              {doctor.fullname}
                            </h3>
                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                              {doctor.specialization}
                            </p>
                          </div>
                        </div>
                         <Link href={`/pages/chat/${doctor.id}`}>
                          <Button variant="outline" className="w-full border-slate-100 text-teal-600 rounded-md h-8 font-black text-[9px] uppercase tracking-widest hover:bg-teal-50 transition-all">
                            Consult
                          </Button>
                        </Link>
                      </GlassCard>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg border border-slate-100 text-center">
                    <p className="text-slate-400 text-xs">No doctors currently available.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
               <section>
                <SectionHeader title="Quick Actions" />
                <GlassCard className="divide-y divide-slate-50">
                  <Link href="/pages/chat" className="p-3.5 flex items-center gap-3 hover:bg-[#f8fafc] transition-all group">
                    <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-800">Review Messages</span>
                  </Link>
                  <Link href="/pages/dashboard" className="p-3.5 flex items-center gap-3 hover:bg-[#f8fafc] transition-all group">
                    <FileText className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-800">Health Reports</span>
                  </Link>
                </GlassCard>
              </section>

              <section>
                <GlassCard className="p-5 bg-slate-800 border-none rounded-lg relative overflow-hidden">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 relative z-10">
                    System Hub
                  </h3>
                  <p className="text-slate-400 text-[10px] mb-4 font-bold uppercase tracking-tight leading-relaxed relative z-10">
                    Verified Diagnostics • HLX-X
                  </p>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-md h-8 font-black text-[9px] uppercase tracking-widest transition-all relative z-10">
                    Access Portal
                  </Button>
                </GlassCard>
              </section>

              <section>
                <SectionHeader title="Status Updates" />
                <div className="space-y-3">
                   {[1, 2].map(i => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-white border border-slate-100">
                      <div className="w-1 bg-[#0d9488] rounded-full h-auto" />
                      <div>
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Platform Update</h4>
                        <p className="text-[10px] font-bold text-slate-700 leading-snug">Service Status: Active</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      <HealixChatbot />
    </div>
  );
}
