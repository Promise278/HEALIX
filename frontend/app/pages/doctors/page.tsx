"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Video, MessageSquare, MapPin, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import healixLogo from "@/public/healix-logo.png";
import Image from "next/image";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      rating: 4.9,
      reviews: 234,
      experience: "15 years",
      availability: "Available Now",
      location: "New York, NY",
      fee: "$80",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 189,
      experience: "12 years",
      availability: "Available Today",
      location: "Los Angeles, CA",
      fee: "$120",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      rating: 4.9,
      reviews: 312,
      experience: "10 years",
      availability: "Available Now",
      location: "Chicago, IL",
      fee: "$95",
    },
    {
      id: 4,
      name: "Dr. James Williams",
      specialty: "Pediatrician",
      rating: 4.7,
      reviews: 156,
      experience: "18 years",
      availability: "Available Tomorrow",
      location: "Houston, TX",
      fee: "$85",
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      specialty: "Psychiatrist",
      rating: 4.9,
      reviews: 278,
      experience: "14 years",
      availability: "Available Now",
      location: "San Francisco, CA",
      fee: "$110",
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Orthopedic Surgeon",
      rating: 4.8,
      reviews: 201,
      experience: "20 years",
      availability: "Available Today",
      location: "Boston, MA",
      fee: "$150",
    },
  ];

  const specialties = [
    "All Specialties",
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic Surgeon",
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
            <p className="text-gray-600">
              Browse our network of qualified healthcare professionals
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search by doctor name or specialty..."
                className="pl-10 h-12 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={
                    selectedSpecialty === specialty ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={
                    selectedSpecialty === specialty
                      ? "bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white"
                      : ""
                  }
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"}
            </p>
          </div>

          {/* Doctor Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="p-6 hover:shadow-lg transition-all bg-white border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                    {doctor.name.split(" ")[1][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#0cd660] text-[#0cd660]" />
                        <span className="text-sm font-medium">
                          {doctor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between gap-2 text-gray-600">
                    <div className="flex gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <span className="text-gray-600">
                      {doctor.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Consultation Fee</span>
                    <span className="text-blue-600">{doctor.fee}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/video-call/${doctor.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white hover:from-[#011414] hover:to-[#f4f803]">
                      <Video className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>
                  </Link>
                  <Link href={`/chat/${doctor.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-[#0cd660] text-[#0cd660] hover:bg-blue-50"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No doctors found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Doctors;
