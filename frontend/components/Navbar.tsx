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
  const [initialTab, setInitialTab] = useState<"login" | "signup">("login");

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

          <div className="hidden md:flex items-center gap-4">
            <button 
              className="text-sm font-medium text-foreground hover:text-[#5fc1e0] transition-colors"
              onClick={() => {
                setInitialTab("login");
                setAuthDialogOpen(true);
              }}
            >
              Sign In
            </button>
            <button 
              className="bg-linear-to-r from-[#19c3ee] to-[#0cd660] px-6 h-10 rounded-md text-white hover:opacity-90 font-medium"
              onClick={() => {
                setInitialTab("signup");
                setAuthDialogOpen(true);
              }}
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
              <button 
                className="bg-linear-to-r from-[#19c3ee] to-[#0cd660] w-32 h-10 rounded-md text-white"
                onClick={() => {
                  setInitialTab("signup");
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

      <AuthDialog key={initialTab} open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialTab={initialTab} />
    </nav>
  );
};

export default Navbar;