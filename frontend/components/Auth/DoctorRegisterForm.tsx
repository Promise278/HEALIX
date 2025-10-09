"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onClose: () => void;
}

export default function DoctorRegisterForm({ onClose }: Props) {
  const [doctorStep, setDoctorStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [medicalSchool, setMedicalSchool] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      alert("Please fill in all fields");
      return;
    }
    setDoctorStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch("http://10.252.178.237:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role: "doctor",
          medicalLicenseNumber: licenseNumber,
          yearsOfExperience: parseInt(yearsExperience),
          specialty: specialization,
          medicalSchool,
          licenseCountry,
          graduationYear: parseInt(graduationYear),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("✅ Doctor registration submitted successfully!");
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {doctorStep === 1 ? (
        <form onSubmit={handleStep1} className="space-y-4">
            <div className="flex justify-between">
          <h3 className="text-lg font-semibold">
            Doctor Registration - Step 1
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setUserType(null)}
          >
            Change
          </Button>
          </div>

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="Dr. John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="doctor@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660]"
          >
            Continue
          </Button>
        </form>
      ) : (
        <form onSubmit={handleStep2} className="space-y-4">
          <h3 className="text-lg font-semibold">
            Doctor Verification - Step 2
          </h3>

          <div className="space-y-2">
            <Label>Medical License Number</Label>
            <Input
              placeholder="ABC123"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>License Country</Label>
            <Select value={licenseCountry} onValueChange={setLicenseCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Specialization</Label>
            <Input
              placeholder="Cardiology"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Medical School</Label>
            <Input
              placeholder="Harvard Medical School"
              value={medicalSchool}
              onChange={(e) => setMedicalSchool(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Graduation Year</Label>
              <Input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Years of Experience</Label>
              <Input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDoctorStep(1)}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660]"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
