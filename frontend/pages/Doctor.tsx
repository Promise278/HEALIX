import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { Search, Star, Video, MessageSquare, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Browse our network of qualified healthcare professionals</p>
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
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
                className={selectedSpecialty === specialty ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : ""}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 hover:shadow-lg transition-all bg-white border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {doctor.name.split(' ')[1][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-purple-600 text-purple-600" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-gray-600">{doctor.experience} experience</span>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                    {doctor.availability}
                  </Badge>
                </div> */}
                <div className="flex items-center justify-between font-semibold">
                  <span>Consultation Fee</span>
                  <span className="text-blue-600">{doctor.fee}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/video-call/${doctor.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                </Link>
                <Link href={`/chat/${doctor.id}`}>
                  <Button variant="outline" size="icon" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;