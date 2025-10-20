import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FileText, Download } from "lucide-react-native";

const records = [
  {
    id: 1,
    title: "Blood Test Results",
    date: "Dec 15, 2024",
    doctor: "Dr. Sarah Johnson",
    type: "Lab Report",
  },
  {
    id: 2,
    title: "Prescription - Cardiology",
    date: "Dec 10, 2024",
    doctor: "Dr. Sarah Johnson",
    type: "Prescription",
  },
  {
    id: 3,
    title: "General Checkup Report",
    date: "Nov 28, 2024",
    doctor: "Dr. Michael Chen",
    type: "Medical Report",
  },
];

const Records = () => {
  return (
    <View className="flex-1 bg-white px-4 mt-14 pb-20">
      <Text className="text-2xl font-bold mb-6 text-gray-900">
        Medical Records
      </Text>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row items-start gap-3">
              {/* Icon */}
              <View className="p-3 rounded-xl bg-[#2ac9de20]">
                <FileText size={22} color="#2ac9de" />
              </View>

              {/* Text Info */}
              <View className="flex-1">
                <Text className="font-semibold text-gray-900" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500">{item.doctor}</Text>

                <View className="flex-row items-center gap-2 mt-2">
                  <Text className="text-xs text-gray-400">{item.date}</Text>
                  <View className="px-2 py-0.5 rounded-full bg-gray-100">
                    <Text className="text-xs text-gray-500">{item.type}</Text>
                  </View>
                </View>
              </View>

              {/* Download button */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-2 rounded-full"
                onPress={() => console.log("Download pressed for", item.title)}
              >
                <Download size={18} color="#2ac9de" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Records;