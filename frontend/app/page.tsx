"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Video,
  MessageSquare,
  Calendar,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  Award,
  TrendingUp,
  Heart,
  User,
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/public/hero-doctor.jpg";
import AuthDialog from "@/components/AuthDialog";
import Image from "next/image";
import Link from "next/link";

const Index = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#22f3f3] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Healthcare
                <span className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] bg-clip-text text-transparent">
                  {" "}
                  at Your Fingertips
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Connect with experienced doctors and healthcare professionals
                instantly. Get consultations, prescriptions, and personalized
                care from the comfort of your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/doctors">
                  <button
                    className="cursor-pointer bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white w-38 h-12 shadow-md rounded-md"
                  >
                    Find a Doctor
                  </button>
                </Link>
                <button
                  className="border cursor-pointer border-[#12a7d7] text-[#12a7d7] w-38 h-12 rounded-md"
                  onClick={() => setAuthDialogOpen(true)}
                >
                  Get Started
                </button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[#12a7d2]">500+</div>
                  <div className="text-sm text-gray-600">Expert Doctors</div>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div>
                  <div className="text-3xl font-bold text-[#3fd49d]">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Available Care</div>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div>
                  <div className="text-3xl font-bold text-[#dc8764]">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-700 opacity-20 blur-3xl rounded-full" />
              <Image
                src={heroImage}
                alt="Doctor consultation"
                className="relative rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose HEALIX?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience healthcare reimagined with our comprehensive
              telemedicine platform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Video Consultations
              </h3>
              <p className="text-gray-600">
                Face-to-face consultations with doctors through secure HD video
                calls
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Messaging</h3>
              <p className="text-gray-600">
                Chat with healthcare professionals anytime for quick medical
                advice
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments that fit your schedule with just a few clicks
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                HIPAA-compliant platform ensuring your health data stays
                protected
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Access healthcare whenever you need it, day or night
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Network</h3>
              <p className="text-gray-600">
                Connect with specialists across various medical fields
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with quality healthcare in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose Your Doctor</h3>
              <p className="text-gray-600">
                Browse our network of qualified doctors and select the one that
                fits your needs
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold">Book Appointment</h3>
              <p className="text-gray-600">
                Schedule a consultation at your convenience through our easy
                booking system
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Treatment</h3>
              <p className="text-gray-600">
                Connect via video or chat for your consultation and receive care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from people who trust HEALIX for their healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                HEALIX made healthcare so accessible. I consulted with a
                specialist from home and got my prescription within hours. Truly
                revolutionary!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">
                    Patient since 2023
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                As a busy professional, I cant always make it to the clinic.
                HEALIXs video consultations saved me so much time while
                providing excellent care.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-gray-600">
                    Patient since 2024
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                The doctors are incredibly professional and the platform is so
                easy to use. I love that I can message them anytime with
                questions!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">
                    Patient since 2023
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Active Patients</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600">200K+</div>
              <div className="text-gray-600">Consultations</div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Medical Specialties We Cover
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access expert care across multiple specialties
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "General Medicine",
              "Pediatrics",
              "Dermatology",
              "Mental Health",
              "Cardiology",
              "Gynecology",
              "Orthopedics",
              "Nutrition",
            ].map((specialty, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-gray-200 text-center"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">{specialty}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default Index;