"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  LogOut,
  Activity,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  GlassCard,
  SidebarItem,
  StatCard,
  SectionHeader,
} from "@/components/Dashboard/DashboardComponents";

interface Doctor {
  id: string;
  fullname: string;
  email: string;
  specialization: string;
  yearsofexperience: number;
  isVerified: boolean;
}

interface Patient {
  id: string;
  fullname: string;
  username: string;
  email: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    if (!token || type !== "admin") {
      router.push("/");
    }

    const fetchData = async () => {
      try {
        const doctorsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/doctors`,
        );
        const doctorsData = await doctorsRes.json();
        if (doctorsData.success) setDoctors(doctorsData.data);

        const patientsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/patients`,
        );
        const patientsData = await patientsRes.json();
        if (patientsData.success) setPatients(patientsData.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  const handleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/doctors/${id}/verify`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isVerified: !currentStatus }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.id === id ? { ...doc, isVerified: !currentStatus } : doc,
          ),
        );
      }
    } catch (error) {
      console.error("Error verifying doctor:", error);
    }
  };

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "/pages/admin",
      active: true,
    },
    {
      label: "Doctors",
      icon: GraduationCap,
      path: "/pages/admin",
      active: false,
    },
    { label: "Patients", icon: Users, path: "/pages/admin", active: false },
    { label: "Settings", icon: Settings, path: "/pages/admin", active: false },
  ];

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#fbfcfd]">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
     <div className="flex h-screen bg-[#fbfcfd] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8fafc] flex flex-col h-full z-20 border-r border-slate-100">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0d9488] rounded-md flex items-center justify-center text-white font-black text-sm">
              Hx
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-800 tracking-tight leading-none mb-0.5">
                HeaLix
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                System Admin
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
              placeholder="System search..."
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
                  System Administrator
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                  Full Authority
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center font-black text-teal-600 text-[10px] border border-teal-100 uppercase">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto px-10 py-8 scrollbar-hide">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-800 tracking-tight mb-1">
                Admin Console
              </h1>
              <p className="text-slate-400 text-[11px] font-medium tracking-tight">Real-time platform metrics and user management</p>
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              label="Total Doctors" 
              value={doctors.length.toString()} 
              icon={GraduationCap} 
              trend="+2 new today" 
              color="teal"
              delay={0.1}
            />
            <StatCard 
              label="Total Patients" 
              value={patients.length.toString()} 
              icon={Users} 
              trend="+12% growth" 
              color="blue"
              delay={0.2}
            />
            <StatCard 
              label="Platform Status" 
              value="ACTIVE" 
              icon={Activity} 
              trend="Optimal" 
              color="purple"
              delay={0.3}
            />
          </div>

          {/* Content Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 space-y-8">
               {/* Doctors Table Section */}
               <section className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-xs">
                  <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                       <GraduationCap className="w-4 h-4 text-teal-600" />
                       Verify Practitioners
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-[#f8fafc] border-b border-slate-50">
                        <TableRow>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">PRACTITIONER</TableHead>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">SPECIALIZATION</TableHead>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">EXPERIENCE</TableHead>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">STATUS</TableHead>
                          <TableHead className="px-6 py-3 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">ACTION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-50">
                        {doctors.map((doctor) => (
                          <TableRow key={doctor.id} className="hover:bg-[#f8fafc] transition-colors group">
                            <TableCell className="px-6 py-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 bg-teal-50 text-teal-600 flex items-center justify-center rounded-md font-bold text-[10px] border border-teal-100 italic">Hx</div>
                                <div>
                                  <p className="text-[11px] font-bold text-slate-700">{doctor.fullname}</p>
                                  <p className="text-[9px] text-slate-400 font-medium">{doctor.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-tight">{doctor.specialization}</TableCell>
                            <TableCell className="px-6 py-4 text-[10px] font-medium text-slate-600">{doctor.yearsofexperience} Years</TableCell>
                            <TableCell className="px-6 py-4">
                               {doctor.isVerified ? (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                                  <ShieldCheck className="w-2.5 h-2.5" />
                                  VERIFIED
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-wider border border-amber-100">
                                  <Activity className="w-2.5 h-2.5" />
                                  PENDING
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="px-6 py-4 text-right">
                               <button
                                onClick={() => handleVerify(doctor.id, doctor.isVerified)}
                                className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all border ${
                                  doctor.isVerified
                                    ? "bg-white border-red-100 text-red-500 hover:bg-red-50"
                                    : "bg-[#0d9488] border-teal-600 text-white hover:bg-[#0f766e] shadow-xs"
                                }`}
                              >
                                {doctor.isVerified ? "Revoke" : "Approve"}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
               </section>

               {/* Patients Registry Section */}
               <section className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-xs">
                  <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                       <Users className="w-4 h-4 text-teal-600" />
                       Patient Records
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-[#f8fafc] border-b border-slate-50">
                        <TableRow>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">USER</TableHead>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">USERNAME</TableHead>
                          <TableHead className="px-6 py-3 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">ACCOUNT EMAIL</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-50">
                        {patients.map((patient) => (
                          <TableRow key={patient.id} className="hover:bg-[#f8fafc] transition-colors">
                            <TableCell className="px-6 py-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 bg-slate-50 text-slate-300 flex items-center justify-center rounded-full font-bold text-[10px] border border-slate-100 uppercase">{patient.fullname[0]}</div>
                                <span className="text-[11px] font-bold text-slate-700">{patient.fullname}</span>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-[10px] font-medium text-slate-500">@{patient.username}</TableCell>
                            <TableCell className="px-6 py-4 text-[10px] font-medium text-slate-600 italic tracking-tight">{patient.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
               </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
