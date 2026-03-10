"use client";
import { useEffect, useState } from "react";
import PatientNavbar from "@/components/PatientNavbar";
import DocsNavbar from "@/components/DocsNavbar";
import Navbar from "@/components/Navbar";

const RoleNavbar = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = sessionStorage.getItem("userType");
    setRole(t);
  }, []);

  if (role === "doctor") return <DocsNavbar />;
  if (role === "patient") return <PatientNavbar />;
  return <Navbar />;
};

export default RoleNavbar;
