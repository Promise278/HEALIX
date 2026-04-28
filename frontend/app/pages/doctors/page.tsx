"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  Star, 
  MapPin, 
  CheckCircle,
  Stethoscope,
  Filter,
  ArrowLeft,
  Activity,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/Dashboard/DashboardComponents";
import AppointmentModal from "@/components/Appointment/AppointmentModal";

interface Doctor {
  id: string;
  fullname: string;
  specialization: string;
  yearsofexperience: number;
  consultationfee: number;
  isVerified: boolean;
  bio?: string;
}

const specialties = [
  "All Specialist",
  "General Medicine",
  "Pediatrics",
  "Dermatology",
  "Mental Health",
  "Cardiology",
  "Gynecology",
  "Orthopedics",
  "Nutrition",
  "Dentist",
  "Eye",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialist");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleConsultClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors/getalldoctors`;
      if (selectedSpecialty !== "All Specialist") {
        url += `?specialization=${encodeURIComponent(selectedSpecialty)}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  const filteredDoctors = doctors.filter(doc => 
    doc.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fbfcfd] font-sans text-slate-800 pb-20">
      {/* Search Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-6 py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/pages/dashboard" className="w-8 h-8 flex items-center justify-center bg-[#f8fafc] border border-slate-100 rounded-md text-slate-300 hover:text-teal-600 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Find Specialist</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Verified Medical Registry</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-3.5 h-3.5" />
            <input
              placeholder="Search by name, clinic, or specialization..."
              className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-slate-100 rounded-md text-[11px] placeholder:text-slate-300 focus:ring-1 focus:ring-teal-500/10 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 mt-8">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">Quick Filter:</span>
          {specialties.slice(0, 7).map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all border ${
                selectedSpecialty === spec
                  ? "bg-[#0d9488] border-teal-600 text-white shadow-xs"
                  : "bg-white border-slate-100 text-slate-400 hover:text-slate-600"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Registry Count: <span className="text-slate-800">{filteredDoctors.length} ACTIVE</span>
          </p>
          <div className="flex items-center gap-2">
             <select 
               className="bg-white border border-slate-100 rounded-md px-3 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest outline-none cursor-pointer hover:border-slate-200 transition-all"
               value={selectedSpecialty}
               onChange={(e) => setSelectedSpecialty(e.target.value)}
             >
               {specialties.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-white border border-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <GlassCard 
                key={doctor.id} 
                className="group p-5 hover:border-teal-100 transition-all duration-300 border-slate-100"
              >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#f8fafc] border border-slate-100 rounded-md flex items-center justify-center text-slate-200 font-bold text-lg italic transition-all group-hover:bg-[#0d9488] group-hover:text-white">
                      Hx
                    </div>
                    {doctor.isVerified && (
                      <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-100">
                        <CheckCircle className="w-2.5 h-2.5" />
                        CERTIFIED
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight group-hover:text-[#0d9488] transition-colors">
                      {doctor.fullname}
                    </h3>
                    <p className="text-[#0d9488] text-[10px] font-black uppercase tracking-widest mt-1">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6 border-t border-slate-50 pt-4">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      4.9 RATING
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Activity className="w-3 h-3" />
                      {doctor.yearsofexperience} YRS EXP.
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Session Fee</p>
                      <p className="text-xl font-black text-slate-800 tracking-tight">${doctor.consultationfee}</p>
                    </div>
                    
                    <Button 
                      onClick={() => handleConsultClick(doctor)}
                      className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-black text-[10px] uppercase tracking-widest h-9 px-5 rounded-md shadow-xs"
                    >
                      Consult
                    </Button>
                  </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-100 shadow-xs">
            <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <User className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No Records Found</h3>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              {"We couldn't locate any practitioners matching your current registry filter."}
            </p>
            <Button 
              variant="outline" 
              className="mt-6 font-black text-[10px] uppercase tracking-widest border-slate-100 h-9 rounded-md"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All Specialist");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      {selectedDoctor && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
}
