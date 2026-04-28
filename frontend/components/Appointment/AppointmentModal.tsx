"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Sparkles, Loader2, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: {
    id: string;
    fullname: string;
    specialization: string;
  };
}

const AI_QUESTIONS = [
  {
    id: "symptoms",
    question: "What specific health challenges or symptoms have you been experiencing recently?",
    placeholder: "e.g. Constant headaches, lower back pain...",
  },
  {
    id: "duration",
    question: "How long have these challenges been affecting you, and have they worsened?",
    placeholder: "e.g. 2 weeks, getting worse at night...",
  },
  {
    id: "history",
    question: "Is there anything else our AI should note about your medical history regarding this issue?",
    placeholder: "e.g. Previous surgery, allergies...",
  },
];

export default function AppointmentModal({ isOpen, onClose, doctor }: Props) {
  const [step, setStep] = useState(0); // 0: Intro, 1-3: AI Questions, 4: Date/Time, 5: Success
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step >= 1 && step <= 3) {
      const questionId = AI_QUESTIONS[step - 1].id;
      setAnswers({ ...answers, [questionId]: currentAnswer });
      setCurrentAnswer("");
    }
    setStep(step + 1);
  };

  const handleBook = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          appointmentDate,
          reason: answers.symptoms,
          aiAnalysis: answers,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStep(5);
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Brain className="w-7 h-7 text-teal-600" />
              </div>
              <DialogHeader className="text-center mb-8">
                <DialogTitle className="text-2xl font-bold text-slate-800 tracking-tight">AI Pre-Consultation</DialogTitle>
                <p className="text-slate-400 text-sm mt-2">
                  To help <span className="text-teal-600 font-bold">{doctor.fullname}</span> prepare for your session, our AI will ask you 3 quick questions.
                </p>
              </DialogHeader>
              <Button onClick={handleNext} className="w-full bg-[#0d9488] hover:bg-[#0f766e] h-12 rounded-xl font-bold text-sm uppercase tracking-widest transition-all">
                Start Analysis
              </Button>
            </motion.div>
          )}

          {step >= 1 && step <= 3 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Question {step} of 3</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-6 h-1 rounded-full transition-all ${i <= step ? "bg-teal-500" : "bg-slate-100"}`} />
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 leading-tight mb-6">
                {AI_QUESTIONS[step - 1].question}
              </h3>
              
              <Textarea
                placeholder={AI_QUESTIONS[step - 1].placeholder}
                className="min-h-[120px] bg-slate-50 border-slate-100 focus:ring-teal-500/10 rounded-xl mb-8 p-4 text-sm"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />

              <Button 
                onClick={handleNext} 
                disabled={!currentAnswer}
                className="w-full bg-[#0d9488] hover:bg-[#0f766e] h-12 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
              >
                Next Question
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8"
            >
              <DialogHeader className="mb-8">
                <DialogTitle className="text-xl font-bold text-slate-800">Final Step: Schedule</DialogTitle>
                <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Choose your preferred session time</p>
              </DialogHeader>

              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment Date & Time</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input
                      type="datetime-local"
                      className="pl-11 h-12 bg-slate-50 border-slate-100 rounded-xl focus:ring-teal-500/10 text-sm"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleBook} 
                disabled={!appointmentDate || isLoading}
                className="w-full bg-[#0d9488] hover:bg-[#0f766e] h-12 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Appointment"}
              </Button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 mx-auto border border-emerald-100">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Your medical session with <span className="text-slate-800 font-bold">{doctor.fullname}</span> has been successfully scheduled.
              </p>
              <Button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-900 h-12 rounded-xl font-bold text-sm uppercase tracking-widest transition-all">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
