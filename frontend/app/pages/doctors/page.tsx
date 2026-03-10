"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Star,
  Video,
  MessageSquare,
  MapPin,
} from "lucide-react";
import Link from "next/link";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  availability: string;
  location: string;
  fee: string;
}

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const specialties = [
    "All Specialties",
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic Surgeon",
  ];



  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/docs/seedoctors`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          }
        );
        const data = await response.json();
        if (data.success) {
          setDoctors(data.data);
        } else {
          setError(data.message || "Failed to load doctors");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch doctors from server");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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
      {/* Main Content */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
          <p className="text-gray-600 mb-6">
            Browse our network of qualified healthcare professionals
          </p>

          {/* Search + Specialty */}
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

          {/* Results */}
          {loading ? (
            <p>Loading doctors...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No doctors found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="p-6 hover:shadow-lg transition-all bg-white border-gray-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      {doctor.name.split(" ")[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 fill-[#0cd660] text-[#0cd660]" />
                        <span className="text-sm font-medium">
                          {doctor.rating}
                        </span>
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
                      <Button className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-gray-600">
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                    </Link>
                    <Link href={`/chat/${doctor.id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#0cd660] text-[#0cd660]"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Doctors;