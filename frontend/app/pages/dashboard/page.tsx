"use client"
import React from "react";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import healixLogo from "@/public/healix-logo.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, MessageSquare, FileText, Clock, Activity } from "lucide-react";

function Dashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      date: "Today, 2:00 PM",
      type: "Video Call",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "Tomorrow, 10:30 AM",
      type: "Chat Consultation",
    },
  ];

  const healthStats = [
    { label: "Blood Pressure", value: "120/80", status: "Normal", icon: Activity },
    { label: "Heart Rate", value: "72 bpm", status: "Good", icon: Activity },
    { label: "Last Checkup", value: "2 weeks ago", status: "Recent", icon: Clock },
  ];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    
  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/pages/home" className="flex items-center gap-3 group">
              <Image
                src={healixLogo}
                alt="HEALIX Logo"
                width={40}
                height={40}
                className="group-hover:scale-110 transition-transform rounded-md"
              />

              <span className="text-xl font-bold text-foreground">HEALIX</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/pages/home"
                className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                  isActive("/pages/home") ? "text-[#5fc1e0]" : "text-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/pages/doctors"
                className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                  isActive("/pages/doctor")
                    ? "text-[#5fc1e0]"
                    : "text-foreground"
                }`}
              >
                Find Doctors
              </Link>
              <Link
                href="/pages/dashboard"
                className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                  isActive("/pages/dashboard")
                    ? "text-[#5fc1e0]"
                    : "text-foreground"
                }`}
              >
                Dashboard
              </Link>
              <div className="ml-12">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                    isActive("/pages/home")
                      ? "text-[#5fc1e0]"
                      : "text-foreground"
                  }`}
                >
                  <LogOut className="w-6 h-6 text-[#5fc1e0]" />
                </Link>
              </div>
            </div>
            <button
              className="md:hidden flex gap-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                  isActive("/pages/home") ? "text-[#5fc1e0]" : "text-foreground"
                }`}
              >
                <LogOut className="w-6 h-6 text-[#5fc1e0]" />
              </Link>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 animate-slide-in">
              <div className="flex flex-col gap-4">
                <Link
                  href="/pages/home"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/pages/doctors"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Doctors
                </Link>
                <Link
                  href="/pages/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="min-h-screen bg-white">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user ? user : "Patient"}!</h1>
          <p className="text-gray-600">Heres your health overview</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/pages/doctors">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer bg-white border-gray-200 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">New Consultation</h3>
                      <p className="text-sm text-gray-600">Book a video call with a doctor</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/pages/doctors">
                <Card className="p-6 hover:shadow-lg transition-all cursor-pointer bg-white border-gray-200 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Quick Chat</h3>
                      <p className="text-sm text-gray-600">Message your doctor instantly</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Upcoming Appointments */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Upcoming Appointments
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center text-white font-semibold">
                        {appointment.doctor.split(' ')[1][0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {appointment.date}
                        </p>
                      </div>
                    </div>
                    <Link href={appointment.type === "Video Call" ? "/video-call" : "/chat"}>
                      <Button className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white hover:from-blue-700 hover:to-blue-800">
                        {appointment.type === "Video Call" ? (
                          <>
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Start Chat
                          </>
                        )}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>

            {/* Health Records */}
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Recent Health Records
                </h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium">General Checkup Report</h3>
                    <p className="text-sm text-gray-600">Dr. Sarah Johnson • 2 weeks ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium">Blood Test Results</h3>
                    <p className="text-sm text-gray-600">Lab Test • 1 month ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Stats */}
            <Card className="p-6 bg-white border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Health Overview</h2>
              <div className="space-y-4">
                {healthStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-emerald-600">{stat.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className="p-6 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white overflow-hidden relative">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-white/90 mb-4">
                  Our support team is available 24/7 to assist you
                </p>
                <Button variant="secondary" size="sm">Contact Support</Button>
              </div>
            </Card>

            {/* Medical Illustration */}
            {/* <Card className="p-0 overflow-hidden border-gray-200">
              <Image 
                src={dashboardIllustration} 
                alt="Healthcare Dashboard" 
                className="w-full h-auto"
              />
            </Card> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
