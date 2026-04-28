"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  MessageSquare,
  Users,
  Clock,
  Search,
  Bell,
  LogOut,
  LayoutDashboard,
  FileText,
  Star,
  CalendarDays,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  User,
} from "lucide-react";
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

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctor stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    if (!token || type !== "doctor") {
      router.push("/");
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchStats();
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
      path: "/pages/docsdashboard",
      active: true,
    },
    {
      label: "Schedule",
      icon: CalendarIcon,
      path: "/pages/docsdashboard",
      active: false,
    },
    {
      label: "Patients",
      icon: Users,
      path: "/pages/docsdashboard",
      active: false,
    },
    {
      label: "Consultations",
      icon: FileText,
      path: "/pages/docsdashboard",
      active: false,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/pages/chat",
      active: false,
    },
  ];

  return (
    <div className="flex h-screen bg-[#fbfcfd] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8fafc] flex flex-col h-full z-20 border-r border-slate-100">
        <div className="p-6">
          <Link href="/pages/homedocs" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0d9488] rounded-md flex items-center justify-center text-white font-black text-sm">
              Hx
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-800 tracking-tight leading-none mb-0.5">
                HeaLix
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Expert Console
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
                  Dr. {user?.fullname || user?.username || "Specialist"}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Medical Admin
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center font-black text-teal-600 text-[10px] border border-teal-100 uppercase">
                {user?.fullname?.[0] || user?.username?.[0] || "D"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto px-10 py-8 scrollbar-hide">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-800 tracking-tight mb-1">
                Clinical Overview
              </h1>
              <p className="text-slate-400 text-[11px] font-medium tracking-tight">Manage patient cases and daily schedule</p>
            </div>
            
            <div className="flex gap-2.5">
              <Link href="/pages/docsdashboard">
                <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white shadow-xs rounded-md px-5 h-9 font-bold text-[11px] transition-all">
                  New Entry
                </Button>
              </Link>
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              label="Consultations" 
              value={appointments.length.toString()} 
              icon={User} 
              trend="Total" 
              color="teal"
              delay={0.1}
            />
            <StatCard 
              label="Earning" 
              value={`$${(appointments.length * 50).toFixed(2)}`} 
              icon={TrendingUp} 
              trend="Estimated" 
              color="blue"
              delay={0.2}
            />
            <StatCard 
              label="Efficiency" 
              value="100%" 
              icon={Activity} 
              trend="Optimal" 
              color="purple"
              delay={0.3}
            />
             <StatCard 
              label="Patients" 
              value={new Set(appointments.map(a => a.patientId)).size.toString()} 
              icon={UserPlus} 
              trend="Unique" 
              color="amber"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Patient List Section */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Incoming Consultations
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                     <div className="h-32 bg-white border border-slate-100 rounded-lg animate-pulse" />
                  ) : appointments.length > 0 ? (
                    appointments.map((apt) => (
                      <GlassCard key={apt.id} className="p-0 border-slate-100 shadow-xs group">
                        <div className="bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-md flex items-center justify-center font-black text-slate-300 border border-slate-100 italic group-hover:bg-teal-500 group-hover:text-white transition-all">
                               Hx
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 text-base tracking-tight mb-0.5">
                                {apt.patient.fullname}
                              </h3>
                              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                HLX-ID: #{apt.id.slice(0, 5).toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <div className="text-right hidden sm:block">
                              <p className="text-[11px] font-bold text-slate-800">
                                {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <p className="text-[9px] text-[#0d9488] font-bold uppercase tracking-widest">
                                {new Date(apt.appointmentDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Link href={`/pages/chat/${apt.id}`}>
                              <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-md h-8 px-5 font-bold text-[10px] uppercase tracking-wider transition-all">
                                Review & Message
                              </Button>
                            </Link>
                          </div>
                        </div>
                        {apt.aiAnalysis && (
                          <div className="px-5 py-3 bg-teal-50/20 border-t border-slate-50">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="w-3 h-3 text-teal-600" />
                              <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest">AI Pre-Analysis</span>
                            </div>
                            <p className="text-[10px] text-slate-500 italic truncate">
                              Symptoms: {apt.aiAnalysis.symptoms}
                            </p>
                          </div>
                        )}
                      </GlassCard>
                    ))
                  ) : (
                    <div className="bg-white p-10 rounded-lg border border-slate-100 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-slate-400 text-xs font-medium">No pending consultations at this time.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* History Table */}
              <section className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-xs">
                <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                   <h3 className="text-sm font-bold text-slate-800">System Logs</h3>
                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recent Activity</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f8fafc] border-b border-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</th>
                        <th className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Context</th>
                        <th className="px-6 py-3 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="hover:bg-[#f8fafc] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-black text-[10px] border border-teal-100">
                                P
                              </div>
                              <span className="text-[11px] font-bold text-slate-700">Patient Registry #{102 + i}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[10px] font-medium text-slate-500 truncate max-w-[200px]">
                            VERIFIED DIAGNOSTICS • HLX RECORD
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-300 hover:text-teal-600 transition-colors">
                              <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <section>
                <SectionHeader title="Clinical Tools" />
                <GlassCard className="p-4 space-y-2 rounded-lg">
                  <Button variant="outline" className="w-full justify-between h-9 rounded-md border-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-3 hover:bg-slate-50 transition-all">
                    System Metrics <Activity className="w-3.5 h-3.5 text-slate-300" />
                  </Button>
                   <Button variant="outline" className="w-full justify-between h-9 rounded-md border-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider px-3 hover:bg-slate-50 transition-all">
                    Medical Hub <Search className="w-3.5 h-3.5 text-slate-300" />
                  </Button>
                </GlassCard>
              </section>

              <section>
                <SectionHeader title="Platform Status" />
                <div className="space-y-3">
                   {[1, 2].map(i => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-white border border-slate-100">
                      <div className="w-1 bg-[#0d9488] rounded-full h-auto" />
                      <div>
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active State</h4>
                        <p className="text-[11px] font-bold text-slate-700 leading-snug">Service Status: Online</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}