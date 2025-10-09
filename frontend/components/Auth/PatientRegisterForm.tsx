"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function PatientRegisterForm({ onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);

  const handlePatientSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !fullName) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        "http://10.252.178.237:5000/api/patientregister",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            role: "patient",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("✅ Patient registered successfully!");
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
    <form onSubmit={handlePatientSignup} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Patient Registration</h3>
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
        <Label htmlFor="patient-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="patient-name"
            placeholder="John Doe"
            className="pl-10"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patient-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="patient-email"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patient-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="patient-password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up as Patient"}
      </Button>
    </form>
  );
}
