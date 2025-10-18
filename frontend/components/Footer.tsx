"use client"
import Link from 'next/link'
import React from 'react'
import { useState } from "react";
import AuthDialog from "@/components/AuthDialog";
import healixLogo from "@/public/healix-logo.png";
import Image from "next/image";
import { usePathname } from 'next/navigation';

function Footer() {
  const pathname = usePathname();
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const handleGetStarted = () => {
    if (pathname === '/' || pathname === '/home' || pathname === '/doctors' || pathname === '/dashboard') {
      return;
    }
    setAuthDialogOpen(true);
  };
  return (
    <>
    <div>
        <section className="py-20 bg-gradient-to-r from-[#17a8ce] to-[#2bbfb5] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust HEALIX for their healthcare needs
          </p>
          {!(pathname === '/pages/home' || pathname === '/pages/doctors' || pathname === '/pages/dashboard') && (
          <button
            className="shadow-lg hover:scale-105 bg-[#42d799] rounded-md text-white w-40 h-12 transition-transform"
            onClick={() => setAuthDialogOpen(true)}
          >
            Get Started Now
          </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={healixLogo}
                  alt="HEALIX Logo"
                  width={40}
                  height={40}
                  className="group-hover:scale-110 transition-transform rounded-md"
                />
                <span className="font-bold text-lg">HEALIX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Healing through linking - quality healthcare at home
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
            {(pathname === '/pages/home' || pathname === '/pages/doctors' || pathname === '/pages/dashboard') && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pages/doctors" className="hover:text-primary transition-colors">Find Doctors</Link></li>
                <li><Link href="/pages/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            )}
             {(pathname === '/') && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Find Doctors</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            )}
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 HEALIX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>

    <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  )
}

export default Footer