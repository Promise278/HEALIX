"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Glassmorphism Card
export const GlassCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "bg-white border border-slate-100 shadow-xs rounded-lg overflow-hidden",
      className,
    )}
  >
    {children}
  </motion.div>
);

// Animated Sidebar Item
export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
}) => (
  <Link href={href}>
    <motion.div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-bold text-[11px] uppercase tracking-wider group",
        active
          ? "bg-teal-50 text-teal-600 shadow-xs border border-teal-100/50"
          : "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
      )}
    >
      <Icon
        className={cn(
          "w-3.5 h-3.5 transition-colors",
          active ? "text-teal-600" : "text-slate-400 group-hover:text-teal-600",
        )}
      />
      <span>{label}</span>
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </motion.div>
  </Link>
);

// Premium Stat Card
export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color = "teal",
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: "teal" | "blue" | "purple" | "amber";
  delay?: number;
}) => {
  const colors = {
    teal: "bg-teal-50 text-teal-600 border-teal-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-slate-50 text-slate-700 border-slate-100",
    amber: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <GlassCard delay={delay} className="p-6 flex flex-col justify-between h-36 border-slate-100 shadow-xs">
      <div className="flex justify-between items-start">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center border",
            colors[color],
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-widest">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black text-gray-900">{value}</h3>
      </div>
    </GlassCard>
  );
};

// Section Header
export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-black text-gray-900 tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 font-medium">{subtitle}</p>}
  </div>
);
