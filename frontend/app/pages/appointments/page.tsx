"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/Dashboard/DashboardComponents";

interface Appointment {
  id: string;
  appointmentDate: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  reason: string;
  doctor: {
    fullname: string;
    specialization: string;
  };
  aiAnalysis?: any;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchAppointments();
  }, [router]);

  const fetchAppointments = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/patient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfcfd] font-sans text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/pages/dashboard" className="w-8 h-8 flex items-center justify-center bg-[#f8fafc] border border-slate-100 rounded-md text-slate-300 hover:text-teal-600 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Medical Sessions</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Appointment History & Schedule</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 mt-8 max-w-4xl">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white border border-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <GlassCard key={apt.id} className="p-0 overflow-hidden border-slate-100 group">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-md flex items-center justify-center text-slate-200 font-bold text-lg italic group-hover:bg-teal-500 group-hover:text-white transition-all">
                      Hx
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base tracking-tight mb-1">
                        {apt.doctor.fullname}
                      </h3>
                      <p className="text-teal-600 text-[10px] font-black uppercase tracking-widest mb-3">
                        {apt.doctor.specialization}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(apt.appointmentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-[9px] font-black uppercase tracking-widest ${
                      apt.status === "confirmed" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                      apt.status === "cancelled" ? "bg-red-50 border-red-100 text-red-600" :
                      apt.status === "completed" ? "bg-blue-50 border-blue-100 text-blue-600" :
                      "bg-amber-50 border-amber-100 text-amber-600"
                    }`}>
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </div>
                    
                    {apt.status === "confirmed" && (
                      <Link href={`/pages/chat/${apt.id}`}>
                        <Button className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-black text-[10px] uppercase tracking-widest h-8 px-5 rounded-md shadow-xs">
                          Enter Session
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                
                {apt.reason && (
                  <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50">
                    <p className="text-[11px] text-slate-600 leading-relaxed italic">
                      <span className="font-bold uppercase text-[9px] text-slate-400 mr-2 not-italic">Note:</span>
                      "{apt.reason}"
                    </p>
                  </div>
                )}

                {apt.aiAnalysis && (
                  <div className="px-6 py-4 bg-teal-50/30 border-t border-teal-50">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-3 h-3 text-teal-600" />
                      <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">AI Pre-Analysis Summary</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {Object.entries(apt.aiAnalysis).map(([q, a]: any) => (
                         <div key={q}>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">{q}</p>
                            <p className="text-[10px] text-slate-700 font-medium">{a}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-100 shadow-xs">
            <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <Calendar className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No Appointments</h3>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              You haven't scheduled any medical sessions yet. Connect with a specialist to get started.
            </p>
            <Link href="/pages/doctors">
              <Button className="mt-6 bg-[#0d9488] hover:bg-[#0f766e] text-white font-black text-[10px] uppercase tracking-widest h-9 px-6 rounded-md shadow-xs">
                Find a Doctor
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
