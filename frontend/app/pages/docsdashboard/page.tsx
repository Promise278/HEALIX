// import type { Metadata } from 'next';
// // import Header from '@/components/common/Header';
// // import DoctorDashboardInteractive from './components/DoctorDashboardInteractive';

// // export const metadata: Metadata = {
// //   title: 'Doctor Dashboard - Healix',
// //   description: 'Comprehensive healthcare provider dashboard for managing appointments, patient records, consultations, revenue analytics, and medical practice administration.'
// // };

// export default function DoctorDashboardPage() {
//   // Mock dashboard statistics
//   const mockStats = [
//   {
//     id: 'patients',
//     title: 'Total Patients',
//     value: '1,247',
//     change: '+12%',
//     changeType: 'increase' as const,
//     icon: 'UserGroupIcon',
//     color: 'bg-primary'
//   },
//   {
//     id: 'appointments',
//     title: "Today\'s Appointments",
//     value: '18',
//     change: '+3',
//     changeType: 'increase' as const,
//     icon: 'CalendarIcon',
//     color: 'bg-healing'
//   },
//   {
//     id: 'revenue',
//     title: 'Monthly Revenue',
//     value: '$24,580',
//     change: '+8.2%',
//     changeType: 'increase' as const,
//     icon: 'CurrencyDollarIcon',
//     color: 'bg-success'
//   },
//   {
//     id: 'satisfaction',
//     title: 'Patient Satisfaction',
//     value: '94.2%',
//     change: '+2.1%',
//     changeType: 'increase' as const,
//     icon: 'HeartIcon',
//     color: 'bg-accent'
//   }];

//   // Mock appointments data
//   const mockAppointments = [
//   {
//     id: '1',
//     patientName: 'Sarah Johnson',
//     patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
//     patientImageAlt: 'Professional headshot of young woman with brown hair and warm smile in business attire',
//     time: '9:00 AM',
//     type: 'video' as const,
//     status: 'upcoming' as const,
//     duration: '30 min',
//     reason: 'Follow-up consultation'
//   },
//   {
//     id: '2',
//     patientName: 'Michael Chen',
//     patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ba2d3fac-1762248835751.png",
//     patientImageAlt: 'Professional portrait of Asian man in navy suit with confident expression',
//     time: '10:30 AM',
//     type: 'in-person' as const,
//     status: 'in-progress' as const,
//     duration: '45 min',
//     reason: 'Annual physical exam'
//   },
//   {
//     id: '3',
//     patientName: 'Emily Rodriguez',
//     patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_190332ac2-1762273805567.png",
//     patientImageAlt: 'Friendly portrait of Hispanic woman with long dark hair and professional appearance',
//     time: '2:00 PM',
//     type: 'phone' as const,
//     status: 'upcoming' as const,
//     duration: '20 min',
//     reason: 'Prescription refill'
//   },
//   {
//     id: '4',
//     patientName: 'David Thompson',
//     patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_191238284-1762273981321.png",
//     patientImageAlt: 'Professional headshot of middle-aged man with beard wearing dark shirt',
//     time: '3:30 PM',
//     type: 'video' as const,
//     status: 'upcoming' as const,
//     duration: '30 min',
//     reason: 'Diabetes management'
//   }];

//   // Mock revenue data
//   const mockRevenueData = [
//   { month: 'Jul', revenue: 18500, consultations: 142, patients: 89 },
//   { month: 'Aug', revenue: 21200, consultations: 156, patients: 94 },
//   { month: 'Sep', revenue: 19800, consultations: 148, patients: 87 },
//   { month: 'Oct', revenue: 23400, consultations: 167, patients: 102 },
//   { month: 'Nov', revenue: 22100, consultations: 159, patients: 96 },
//   { month: 'Dec', revenue: 24580, consultations: 174, patients: 108 }];

//   // Mock patient outcomes
//   const mockOutcomes = [
//   {
//     id: 'recovery',
//     title: 'Recovery Rate',
//     value: '92.4%',
//     percentage: 92,
//     trend: 'up' as const,
//     icon: 'HeartIcon',
//     color: 'bg-success'
//   },
//   {
//     id: 'satisfaction',
//     title: 'Patient Satisfaction',
//     value: '94.2%',
//     percentage: 94,
//     trend: 'up' as const,
//     icon: 'FaceSmileIcon',
//     color: 'bg-primary'
//   },
//   {
//     id: 'adherence',
//     title: 'Treatment Adherence',
//     value: '87.6%',
//     percentage: 88,
//     trend: 'stable' as const,
//     icon: 'ClipboardDocumentCheckIcon',
//     color: 'bg-healing'
//   },
//   {
//     id: 'readmission',
//     title: 'Readmission Rate',
//     value: '3.2%',
//     percentage: 97,
//     trend: 'down' as const,
//     icon: 'ShieldCheckIcon',
//     color: 'bg-accent'
//   }];

//   // Mock quick actions
//   const mockQuickActions = [
//   {
//     id: 'new-appointment',
//     title: 'New Appointment',
//     description: 'Schedule patient consultation',
//     icon: 'CalendarPlusIcon',
//     color: 'bg-primary',
//     href: '/appointment-booking'
//   },
//   {
//     id: 'video-call',
//     title: 'Start Video Call',
//     description: 'Begin patient consultation',
//     icon: 'VideoCameraIcon',
//     color: 'bg-healing',
//     href: '/video-consultation-platform'
//   },
//   {
//     id: 'prescriptions',
//     title: 'Write Prescription',
//     description: 'Create new prescription',
//     icon: 'DocumentTextIcon',
//     color: 'bg-success',
//     href: '/prescriptions',
//     badge: '3'
//   },
//   {
//     id: 'patient-records',
//     title: 'Patient Records',
//     description: 'Access medical history',
//     icon: 'FolderOpenIcon',
//     color: 'bg-accent',
//     href: '/patient-records'
//   }];

//   // Mock recent patients
//   const mockRecentPatients = [
//   {
//     id: '1',
//     name: 'Sarah Johnson',
//     image: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
//     imageAlt: 'Professional headshot of young woman with brown hair and warm smile in business attire',
//     lastVisit: 'Nov 8, 2024',
//     condition: 'Hypertension Management',
//     status: 'stable' as const,
//     nextAppointment: 'Dec 15, 2024'
//   },
//   {
//     id: '2',
//     name: 'Michael Chen',
//     image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ba2d3fac-1762248835751.png",
//     imageAlt: 'Professional portrait of Asian man in navy suit with confident expression',
//     lastVisit: 'Nov 9, 2024',
//     condition: 'Diabetes Type 2',
//     status: 'improving' as const,
//     nextAppointment: 'Nov 23, 2024'
//   },
//   {
//     id: '3',
//     name: 'Emily Rodriguez',
//     image: "https://img.rocket.new/generatedImages/rocket_gen_img_190332ac2-1762273805567.png",
//     imageAlt: 'Friendly portrait of Hispanic woman with long dark hair and professional appearance',
//     lastVisit: 'Nov 7, 2024',
//     condition: 'Anxiety Disorder',
//     status: 'needs-attention' as const,
//     nextAppointment: 'Nov 14, 2024'
//   },
//   {
//     id: '4',
//     name: 'Robert Wilson',
//     image: "https://img.rocket.new/generatedImages/rocket_gen_img_110f7eb3a-1762249140544.png",
//     imageAlt: 'Professional headshot of older gentleman with gray hair and glasses in business suit',
//     lastVisit: 'Nov 5, 2024',
//     condition: 'Cardiac Monitoring',
//     status: 'critical' as const,
//     nextAppointment: 'Nov 12, 2024'
//   },
//   {
//     id: '5',
//     name: 'Lisa Anderson',
//     image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
//     imageAlt: 'Professional portrait of blonde woman in white blazer with confident smile',
//     lastVisit: 'Nov 6, 2024',
//     condition: 'Preventive Care',
//     status: 'stable' as const
//   }];

//   // Mock CME data
//   const mockCMEData = {
//     courses: [
//     {
//       id: '1',
//       title: 'Advanced Cardiac Care Protocols',
//       provider: 'American Heart Association',
//       credits: 4,
//       progress: 75,
//       deadline: 'Dec 31, 2024',
//       category: 'Cardiology',
//       status: 'in-progress' as const
//     },
//     {
//       id: '2',
//       title: 'Digital Health Technologies',
//       provider: 'Healthcare Innovation Institute',
//       credits: 3,
//       progress: 0,
//       deadline: 'Jan 15, 2025',
//       category: 'Technology',
//       status: 'not-started' as const
//     },
//     {
//       id: '3',
//       title: 'Patient Safety and Quality Improvement',
//       provider: 'Joint Commission',
//       credits: 2,
//       progress: 100,
//       deadline: 'Nov 30, 2024',
//       category: 'Quality',
//       status: 'completed' as const
//     }],

//     totalCreditsRequired: 50,
//     creditsEarned: 32
//   };

//   const dashboardData = {
//     stats: mockStats,
//     appointments: mockAppointments,
//     revenueData: mockRevenueData,
//     outcomes: mockOutcomes,
//     quickActions: mockQuickActions,
//     recentPatients: mockRecentPatients,
//     cmeData: mockCMEData
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* <Header /> */}

//       <main className="pt-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Page Header */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-text-primary">Doctor Dashboard</h1>
//                 <p className="text-text-secondary mt-2">
//                   Welcome back, Dr. Smith. Heres your practice overview for today.
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-text-secondary">
//                   {new Date().toLocaleDateString('en-US', {
//                     weekday: 'long',
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </p>
//                 <p className="text-lg font-semibold text-text-primary">
//                   {new Date().toLocaleTimeString('en-US', {
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Content */}
//           {/* <DoctorDashboardInteractive data={dashboardData} /> */}
//         </div>
//       </main>
//     </div>
//     )
// }
"use client";
import React, { useState, useEffect } from "react";
import { Users, Calendar, DollarSign, Heart, Video, FileText, FolderOpen, Clock, TrendingUp, ArrowRight, } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useRouter } from "next/navigation";

interface Appointment {
  id: number;
  patientName: string;
  patientImage: string;
  type: string;
  time: string;
  duration: string;
  status: "upcoming" | "in-progress" | "completed";
}

interface RecentPatient {
  id: number;
  name: string;
  image: string;
  condition: string;
  lastVisit: string;
  nextVisit: string;
  status: "stable" | "improving" | "needs attention";
}

interface StatCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  color: string;
}

export default function DoctorDashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const type = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
    if (!token || type !== "doctor") {
      router.push("/");
    }
  }, [router]);

  const [activeTab, setActiveTab] = useState<"revenue" | "consultations">(
    "revenue"
  );

  const stats: StatCard[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "1,247",
      label: "Total Patients",
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      value: "18",
      label: "Today's Appointments",
      change: "+3",
      color: "bg-green-500",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "$24,580",
      label: "Monthly Revenue",
      change: "+8.2%",
      color: "bg-emerald-600",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "94.2%",
      label: "Patient Satisfaction",
      change: "+2.1%",
      color: "bg-yellow-500",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientImage: "👩‍⚕️",
      type: "Follow-up consultation",
      time: "9:00 AM",
      duration: "30 min",
      status: "upcoming",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientImage: "👨‍💼",
      type: "Annual physical exam",
      time: "10:30 AM",
      duration: "45 min",
      status: "in-progress",
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      patientImage: "👩",
      type: "Prescription refill",
      time: "2:00 PM",
      duration: "20 min",
      status: "upcoming",
    },
    {
      id: 4,
      patientName: "David Thompson",
      patientImage: "👨",
      type: "Diabetes management",
      time: "3:30 PM",
      duration: "30 min",
      status: "upcoming",
    },
  ];

  const recentPatients: RecentPatient[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "👩‍⚕️",
      condition: "Hypertension Management",
      lastVisit: "Nov 8, 2024",
      nextVisit: "Dec 15, 2024",
      status: "stable",
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "👨‍💼",
      condition: "Diabetes Type 2",
      lastVisit: "Nov 9, 2024",
      nextVisit: "Nov 23, 2024",
      status: "improving",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image: "👩",
      condition: "Anxiety Disorder",
      lastVisit: "Nov 7, 2024",
      nextVisit: "Nov 14, 2024",
      status: "needs attention",
    },
  ];

  const revenueData = [
    { month: "Jul", value: 18000 },
    { month: "Aug", value: 21000 },
    { month: "Sep", value: 20000 },
    { month: "Oct", value: 24000 },
    { month: "Nov", value: 22000 },
    { month: "Dec", value: 25000 },
  ];

  //   const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600";
      case "in-progress":
        return "bg-yellow-100 text-yellow-600";
      case "stable":
        return "text-teal-600";
      case "improving":
        return "text-green-600";
      case "needs attention":
        return "text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Doctor Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, Dr. Smith. Heres your practice overview for today.
              </p>
            </div>
            <div className="text-right">
              {/* Format date */}
              <p className="text-sm text-gray-600">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* Format time */}
              <p className="text-2xl font-bold text-gray-900">
                {currentDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} rounded-xl p-3 text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-semibold text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Appointments */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Todays Appointments
                  </h2>
                  <span className="text-sm text-gray-600">
                    {appointments.length} appointments
                  </span>
                </div>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                          {appointment.patientImage}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.patientName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.duration}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status === "in-progress"
                            ? "In-progress"
                            : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Analytics */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Revenue Analytics
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab("revenue")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === "revenue"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Revenue
                    </button>
                    <button
                      onClick={() => setActiveTab("consultations")}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === "consultations"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Consultations
                    </button>
                  </div>
                </div>

                {/* Chart */}
                {/* <div className="mb-6">
                <div className="flex items-end justify-between h-64 space-x-4">
                  {revenueData.map((item, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700"
                        style={{
                          height: `${(item.value / maxRevenue) * 100}%`,
                        }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
                <div className="mb-6 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#4B5563" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "#4B5563" }} />
                      <Tooltip
                        formatter={(value: number) =>
                          `$${value.toLocaleString()}`
                        }
                      />
                       <Bar
                        dataKey="value"
                        fill="#3B82F6"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-5 h-5 text-teal-600 mr-1" />
                      <span className="text-sm text-gray-600">
                        Total Revenue
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$129,580</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Video className="w-5 h-5 text-blue-600 mr-1" />
                      <span className="text-sm text-gray-600">
                        Consultations
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">946</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-yellow-600 mr-1" />
                      <span className="text-sm text-gray-600">Patients</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">576</p>
                  </div>
                </div>
              </div>

              {/* Patient Outcomes */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Patient Outcomes
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Recovery Rate</p>
                        <p className="text-2xl font-bold text-gray-900">
                          92.4%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-green-600">
                        ↗ 92%
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Patient Satisfaction
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          94.2%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-blue-600">
                        ↗ 94%
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "94%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Treatment Adherence
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          87.6%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-600">
                        — 88%
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Actions
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-start p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      New Appointment
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      Schedule patient...
                    </span>
                  </button>

                  <button className="flex flex-col items-start p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Start Video Call
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      Begin patient consultation
                    </span>
                  </button>

                  <button className="flex flex-col items-start p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors relative">
                    <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">3</span>
                    </div>
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Write Prescription
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      Create new prescription
                    </span>
                  </button>

                  <button className="flex flex-col items-start p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-yellow-600 rounded-xl flex items-center justify-center mb-3">
                      <FolderOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      Patient Records
                    </span>
                    <span className="text-xs text-gray-600 mt-1">
                      Access medical...
                    </span>
                  </button>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Next appointment in 15 minutes
                    </span>
                  </div>
                  <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                    Join Now <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Recent Patients */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Patients
                  </h2>
                  <span className="text-sm text-gray-600">
                    {recentPatients.length} patients
                  </span>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            {patient.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {patient.name}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {patient.condition}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold ${getStatusColor(
                            patient.status
                          )}`}
                        >
                          ●{" "}
                          {patient.status === "stable"
                            ? "stable"
                            : patient.status === "improving"
                            ? "improving"
                            : "needs attention"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 ml-13">
                        <span>Last visit: {patient.lastVisit}</span>
                        <span>Next: {patient.nextVisit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center py-2">
                  View All Patients <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* CME Credits */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  CME Credits
                </h2>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Annual Progress
                    </span>
                    <span className="text-sm text-gray-600">
                      32 / 50 credits
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                      style={{ width: "64%" }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">0</span>
                    <span className="text-xs text-blue-600 font-semibold">
                      64.0% Complete
                    </span>
                    <span className="text-xs text-gray-600">50</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Recommended Courses
                  </h3>
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 text-sm">
                        Advanced Cardiac Care
                      </span>
                      <span className="text-xs text-gray-600">4 credits</span>
                    </div>
                    <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      in progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
