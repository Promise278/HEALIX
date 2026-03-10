"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, GraduationCap } from "lucide-react";

interface Doctor {
  id: string;
  fullname: string;
  email: string;
  specialization: string;
  yearsofexperience: number;
}

interface Patient {
  id: string;
  fullname: string;
  username: string;
  email: string;
}

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/doctors`);
        const doctorsData = await doctorsRes.json();
        if (doctorsData.success) setDoctors(doctorsData.data);

        const patientsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/patients`);
        const patientsData = await patientsRes.json();
        if (patientsData.success) setPatients(patientsData.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboards...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of all doctors and patients</p>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
              <h3 className="text-2xl font-bold">{doctors.length}</h3>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <h3 className="text-2xl font-bold">{patients.length}</h3>
            </div>
          </Card>
        </div>

        {/* Doctors Table */}
        <Card className="p-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Available Doctors
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.fullname}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.yearsofexperience} Years</TableCell>
                    <TableCell className="text-gray-600">{doctor.email}</TableCell>
                  </TableRow>
                ))}
                {doctors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">No doctors found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Patients Table */}
        <Card className="p-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Registered Patients
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.fullname}</TableCell>
                    <TableCell>{patient.username}</TableCell>
                    <TableCell className="text-gray-600">{patient.email}</TableCell>
                  </TableRow>
                ))}
                {patients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">No patients found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
