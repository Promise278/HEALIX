import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Config } from "../../constants/Config";

const HomeScreen = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = [
    "All",
    "General Medicine",
    "Pediatrics",
    "Dermatology",
    "Mental Health",
    "Cardiology",
    "Gynecology",
    "Orthopedics",
    "Nutrition",
    "Dentist",
    "Eye",
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const url = selectedSpecialty && selectedSpecialty !== "All"
        ? `${Config.API_URL}/api/doctors/getalldoctors?specialization=${selectedSpecialty}`
        : `${Config.API_URL}/api/doctors/getalldoctors`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  return (
    <ScrollView className="flex-1 bg-background mt-8">
      {/* Header */}
      <View className="bg-card px-5 pt-6 pb-6 shadow-md flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Hello, User</Text>
          <Text className="text-sm text-muted">How are you feeling today?</Text>
        </View>
        <TouchableOpacity className="relative p-2 rounded-full bg-blue-300">
          <Feather name="bell" size={20} color="#333" />
          <View className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="relative mt-4 px-5">
        <Feather
          name="search"
          size={18}
          color="#6c7d92"
          style={{
            position: "absolute",
            left: 25,
            top: 12,
            zIndex: 10,
          }}
        />
        <TextInput
          placeholder="Search doctors, specialties..."
          placeholderTextColor="#888"
          className="pl-10 pr-4 h-12 bg-[#ceddf0] rounded-xl border border-[#ceddf0] text-gray-900"
        />
      </View>

      {/* Specialty Filter */}
      <View className="mt-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              onPress={() => setSelectedSpecialty(specialty)}
              className={`mr-3 px-4 py-2 rounded-full ${
                (selectedSpecialty === specialty || (specialty === "All" && !selectedSpecialty))
                  ? "bg-[#23a9ba]"
                  : "bg-gray-100"
              }`}
            >
              <Text
                className={`${
                  (selectedSpecialty === specialty || (specialty === "All" && !selectedSpecialty))
                    ? "text-white"
                    : "text-gray-600"
                } font-medium`}
              >
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Hero Section */}
      <View className="px-5 mt-6 bg-[#23a9ba] rounded-md overflow-hidden mx-5">
        <View className="relative h-40">
          <Image
            source={require("../../assets/images/hero-medical.jpg")}
            className="w-full h-full"
            resizeMode="cover"
            style={{ opacity: 0.4 }}
          />
          <View className="absolute inset-0 bg-primary/80 flex justify-center px-6">
            <View className="max-w-[65%]">
              <Text className="text-white text-xl font-semibold mb-1">
                24/7 Medical Care
              </Text>
              <Text className="text-gray-100 text-sm opacity-90">
                Consult with specialists anytime
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="mt-8 px-5">
        <Text className="text-lg font-semibold mb-3 text-gray-900">
          Quick Actions
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => router.push('/(tabs)/chat')} className="items-center bg-[#2ac9de] rounded-2xl p-3 flex-1 mx-1">
            <Feather name={"video"} size={20} color="#d5fcfe" />
            <Text className="text-[#d5fcfe] text-sm font-medium mt-1">
              {"Call Now"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/chat')} className="items-center bg-[#2ac9de] rounded-2xl p-3 flex-1 mx-1">
            <Feather name={"calendar"} size={20} color="#d5fcfe" />
            <Text className="text-[#d5fcfe] text-sm font-medium mt-1">
              {"Book"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Doctors List */}
      <View className="mt-8 px-5 mb-10">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-900">
            {selectedSpecialty && selectedSpecialty !== "All"
              ? `${selectedSpecialty} Doctors`
              : "Available Doctors"}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#23a9ba" className="mt-4" />
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              onPress={() => router.push(`/chat/${doctor.id}` as any)}
              className="flex-row items-center bg-white rounded-2xl p-3 mb-3 shadow-sm border border-gray-100"
            >
              <View className="w-14 h-14 rounded-full bg-[#eaf7fb] justify-center items-center mr-4">
                <Feather name="user" size={24} color="#23a9ba" />
              </View>

              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {doctor.fullname}
                </Text>
                <Text className="text-sm text-gray-600">{doctor.specialization}</Text>
                <Text className="text-xs text-[#23a9ba] font-bold mt-1">
                  Fee: ${doctor.consultationfee}
                </Text>
              </View>

              <View
                className={`w-3 h-3 rounded-full ${
                  doctor.isVerified ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-10">
            No verified doctors found for this specialty.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;