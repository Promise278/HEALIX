"use client"
import React from "react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import healixLogo from "@/public/healix-logo.png";
import Image from "next/image";

function Dashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;
    
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
      <div>Users Dashboard</div>
    </>
  );
}

export default Dashboard;
