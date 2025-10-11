"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";
import AuthDialog from "./AuthDialog";
import healixLogo from "@/public/healix-logo.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
                src={healixLogo}
                alt="HEALIX Logo"
                width={40}
                height={40}
                className="group-hover:scale-110 transition-transform rounded-md"
            />

            <span className="text-xl font-bold text-foreground">
              HEALIX
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                isActive("/") ? "text-[#5fc1e0]" : "text-foreground"
              }`}
            >
              Home
            </Link>
            {/* <Link 
              href="/doctors" 
              className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                isActive("/doctor") ? "text-[#5fc1e0]" : "text-foreground"
              }`}
            >
              Find Doctors
            </Link>
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-[#5fc1e0] ${
                isActive("/dashboard") ? "text-[#5fc1e0]" : "text-foreground"
              }`}
            >
              Dashboard
            </Link> */}
            <button 
              className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] w-32 h-10 rounded-md text-white hover:opacity-90"
              onClick={() => setAuthDialogOpen(true)}
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
                href="/" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/doctors" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Doctors
              </Link>
              <Link 
                href="/dashboard" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] w-32 h-10 rounded-md text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthDialogOpen(true);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </nav>
  );
};

export default Navbar;