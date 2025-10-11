"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  User,
  FileText,
  GraduationCap,
  Calendar,
  Award,
  Building,
  Eye,
  EyeOff,
} from "lucide-react";
import healixLogo from "@/public/healix-logo.png";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);
  const [doctorStep, setDoctorStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPatientPassword, setShowPatientPassword] = useState(false);
  const [showDoctorPassword, setShowDoctorPassword] = useState(false);

  // Auth form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patientpassword, setPatientpassword] = useState("");
  const [doctorpassword, setDoctorpassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Doctor verification states
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [medicalSchool, setMedicalSchool] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setUserType(null);
    setDoctorStep(1);
    setDoctorpassword("");
    setLicenseNumber("");
    setLicenseCountry("");
    setSpecialization("");
    setMedicalSchool("");
    setGraduationYear("");
    setYearsExperience("");
    setShowPassword(false);
    setShowPatientPassword(false);
    setShowDoctorPassword(false);
  };

  // const handlePatientSignup = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!email || !patientpassword || !fullName) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patientregister`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           name: fullName,
  //           email,
  //           password: patientpassword,
  //           role: "patient",
  //         }),
  //       }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) throw new Error(data.message || "Registration failed");
  //     alert("✅ Patient registered successfully!");
  //     onOpenChange(false);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       alert(err.message);
  //     } else {
  //       alert("An unknown error occurred");
  //     }
  //   } finally {
  //   setIsLoading(false);
  // }
  // };

  const handlePatientSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !patientpassword || !fullName) {
    alert("Please fill in all fields");
    return;
  }

  setIsLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patientregister`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password: patientpassword,
          role: "patient",
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    alert("✅ Patient registered successfully!");
    resetForm();
    onOpenChange(false);
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


  const handleDoctorStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !doctorpassword || !fullName) {
      alert("Please fill in all fields");
      return;
    }
    setDoctorStep(2);
  };

  const handleDoctorStep2 = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !licenseNumber ||
      !licenseCountry ||
      !specialization ||
      !medicalSchool ||
      !graduationYear ||
      !yearsExperience
    ) {
      alert("Please fill all verification fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/doctorregister`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            password: doctorpassword,
            role: "doctor",
            medicalLicenseNumber: licenseNumber,
            yearsOfExperience: parseInt(yearsExperience),
            specialty: specialization,
            medicalSchool,
            licenseCountry,
            graduationYear: parseInt(graduationYear),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      alert("✅ Doctor registration submitted successfully!");
      resetForm();
      onOpenChange(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
      console.log("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patientlogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert("✅ Login successful!");
      resetForm();
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="relative p-6 sm:p-8">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={healixLogo}
              alt="HEALIX Logo"
              width={40}
              height={40}
              className="group-hover:scale-110 transition-transform rounded-md"
            />

            <DialogHeader className="text-center space-y-2">
              <DialogTitle className="text-2xl font-bold">
                Welcome to HEALIX
              </DialogTitle>
              <DialogDescription>
                Choose how youd like to continue
              </DialogDescription>
            </DialogHeader>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 animate-fade-in">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
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
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4 animate-fade-in">
              {!userType && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    I want to register as:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => setUserType("patient")}
                    >
                      <User className="w-8 h-8 text-[#19c3ee]" />
                      <span>Patient</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-2"
                      onClick={() => setUserType("doctor")}
                    >
                      <FileText className="w-8 h-8 text-[#0cd660]" />
                      <span>Doctor</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Patient Signup */}
              {userType === "patient" && (
                <form onSubmit={handlePatientSignup} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Patient Registration
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
                        type={showPatientPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={patientpassword}
                        onChange={(e) => setPatientpassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPatientPassword(!showPatientPassword)
                        }
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPatientPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
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
              )}

              {/* Doctor Signup - Step 1 */}
              {userType === "doctor" && doctorStep === 1 && (
                <form onSubmit={handleDoctorStep1} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Doctor Registration
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Step 1 of 2: Basic Information
                      </p>
                    </div>
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
                    <Label htmlFor="doctor-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctor-name"
                        placeholder="Dr. John Smith"
                        className="pl-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctor-email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctor-password"
                        type={showDoctorPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={doctorpassword}
                        onChange={(e) => setDoctorpassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowDoctorPassword(!showDoctorPassword)
                        }
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showDoctorPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] hover:opacity-90"
                  >
                    Continue to Verification
                  </Button>
                </form>
              )}

              {/* Doctor Signup - Step 2 */}
              {userType === "doctor" && doctorStep === 2 && (
                <form onSubmit={handleDoctorStep2} className="space-y-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Medical Verification
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Step 2 of 2: Professional Details
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setDoctorStep(1)}
                      >
                        Back
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Medical License Number</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="license"
                        placeholder="ABC123456"
                        className="pl-10"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">License Issuing Country</Label>
                    <Select
                      value={licenseCountry}
                      onValueChange={setLicenseCountry}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="specialization"
                        placeholder="e.g., Cardiology, Pediatrics"
                        className="pl-10"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school">Medical School</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="school"
                        placeholder="Harvard Medical School"
                        className="pl-10"
                        value={medicalSchool}
                        onChange={(e) => setMedicalSchool(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grad-year">Graduation Year</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="grad-year"
                          type="number"
                          placeholder="2010"
                          className="pl-10"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          min="1950"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years Experience</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="experience"
                          type="number"
                          placeholder="5"
                          className="pl-10"
                          value={yearsExperience}
                          onChange={(e) => setYearsExperience(e.target.value)}
                          min="0"
                          max="70"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> Your application will be reviewed
                      by our verification team. Youll receive a notification
                      once your account is verified (typically within 24-48
                      hours).
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#19c3ee] to-[#0cd660] hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;