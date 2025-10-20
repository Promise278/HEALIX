import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Calendar, Clock } from "lucide-react-native";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Today",
    time: "2:00 PM",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "Tomorrow",
    time: "10:30 AM",
    status: "upcoming",
  },
  {
    id: 3,
    doctor: "Dr. Emily Roberts",
    specialty: "Dermatologist",
    date: "Dec 20",
    time: "3:00 PM",
    status: "completed",
  },
];

const Appointments = () => {
  return (
    <View className="flex-1 bg-white px-4 mt-14 pb-20">
      <Text className="text-2xl font-bold mb-6 text-gray-900">
        My Appointments
      </Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100"
          >
            {/* Doctor info */}
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="font-semibold text-gray-900">
                  {item.doctor}
                </Text>
                <Text className="text-sm text-gray-500">{item.specialty}</Text>
              </View>

              <View
                className={`px-3 py-1 rounded-full ${
                  item.status === "upcoming"
                    ? "bg-[#2ac9de]"
                    : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    item.status === "upcoming"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Date & Time */}
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Calendar size={16} color="#6b7280" />
                <Text className="text-sm text-gray-500">{item.date}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Clock size={16} color="#6b7280" />
                <Text className="text-sm text-gray-500">{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Appointments;