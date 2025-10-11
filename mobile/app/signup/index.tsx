import { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doctorStep, setDoctorStep] = useState(1);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [medicalSchool, setMedicalSchool] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

const handleNextDoctorStep = () => {
  setDoctorStep(2);
};

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // fetch("https://test.blockfuselabs.com/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: name,
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((res) =>
    //     res.json().then((data) => {
    //       if (res.ok) {
    //         alert("Registration successful!");
    //         router.replace("/signin");
    //       } else {
    //         alert(data.message || "Something went wrong");
    //       }
    //     })
    //   )
    //   .catch(() => {
    //     alert("Network error, please try again.");
    //   });
  };
  return (
    <View className="flex-1 items-center px-4">
      <Image
        source={require("../../assets/images/healix-logo.png")}
        style={{
          width: 230,
          height: 230,
          resizeMode: "contain",
        }}
        className="mt-8"
      />
      <Text className="-mt-6">Your trusted telemedicine platform</Text>
      <View className="flex-row gap-6 bg-blue-300 w-80 h-18 rounded-md p-1 border border-blue-300 overflow-hidden shadow-sm mt-6">
        <TouchableOpacity
          onPress={() => setActiveTab("patient")}
          className={`flex-1 py-3 items-center h-12 rounded-md ${
            activeTab === "patient" ? "bg-white" : "bg-gray-100"
          }`}
        >
          <Text
            className={`font-semibold ${
              activeTab === "patient" ? "text-black" : "text-gray-400"
            }`}
          >
            Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("doctor")}
          className={`flex-1 py-3 items-center h-12 rounded-md ${
            activeTab === "doctor" ? "bg-white" : "bg-gray-100"
          }`}
        >
          <Text
            className={`font-semibold ${
              activeTab === "doctor" ? "text-black" : "text-gray-400"
            }`}
          >
            Doctor
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "patient" && (
        <View className="mt-2 w-[320px] space-y-3">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold">Patient Registration</Text>
          </View>
          {/* Full Name */}
          <View>
            <Text className="text-gray-700 mb-1">Full Name</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <Feather name="user" size={18} color="#888" />
              <TextInput
                placeholder="John Doe"
                className="flex-1 ml-2"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          {/* Email */}
          <View>
            <Text className="text-gray-700 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <Feather name="mail" size={18} color="#888" />
              <TextInput
                placeholder="your@email.com"
                keyboardType="email-address"
                className="flex-1 ml-2"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          {/* Password */}
          <View>
            <Text className="text-gray-700 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <Feather name="lock" size={18} color="#888" />
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                className="flex-1 ml-2"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          {/* Gradient Button */}
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleRegister}
            className="rounded-full w-72 ml-10 mb-2 overflow-hidden mt-4"
          >
            <LinearGradient
              colors={["#19c3ee", "#0cd660"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center text-white font-semibold text-lg">
                  Sign Up as Patient
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {activeTab === "doctor" && (
        <View className="w-[320px]">
          {doctorStep === 1 ? (
            <View className="mt-2 w-[320px] space-y-3">
              <View className="mb-4">
                <Text className="text-2xl font-semibold">
                  Doctor Registration
                </Text>
                <Text className="text-gray-500 mb-4">Step 1 of 2: Basic Information</Text>
              </View>
              {/* Full Name */}
              <View>
                <Text className="text-gray-700 mb-1 -mt-6">Full Name</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Feather name="user" size={18} color="#888" />
                  <TextInput
                    placeholder="John Doe"
                    className="flex-1 ml-2"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              {/* Email */}
              <View>
                <Text className="text-gray-700 mb-1">Email</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Feather name="mail" size={18} color="#888" />
                  <TextInput
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    className="flex-1 ml-2"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              {/* Password */}
              <View>
                <Text className="text-gray-700 mb-1">Password</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Feather name="lock" size={18} color="#888" />
                  <TextInput
                    placeholder="••••••••"
                    secureTextEntry
                    className="flex-1 ml-2"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              {/* Gradient Button */}
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleNextDoctorStep}
                className="rounded-full w-72 ml-10 mb-2 overflow-hidden mt-4"
              >
                <LinearGradient
                  colors={["#19c3ee", "#0cd660"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-3"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-center text-white font-semibold text-lg">
                      Sign Up as Doctor
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text className="text-2xl font-semibold mb-2">
                Medical Verification
              </Text>
              <Text className="text-gray-500 mb-4">
                Step 2 of 2: Professional Details
              </Text>

              <View className="gap-y-2">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                <MaterialIcons name="article" size={18} color="#888" />
              <TextInput
                placeholder="ABC123456"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
              />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                <Feather name="globe" size={18} color="#888" />
              <TextInput
                placeholder="e.g. United States"
                value={licenseCountry}
                onChangeText={setLicenseCountry}
              />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                <Feather name="award" size={18} color="#888" />
              <TextInput
                placeholder="Cardiology, Pediatrics"
                value={specialization}
                onChangeText={setSpecialization}
              />
              </View>

              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                <Feather name="book" size={18} color="#888" />
                <TextInput
                  placeholder="Harvard Medical School"
                  value={medicalSchool}
                  onChangeText={setMedicalSchool}
                />
              </View>

              <View className="flex-row justify-between">
                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                <Feather name="calendar" size={18} color="#888" />
                <TextInput
                  placeholder="2010"
                  keyboardType="numeric"
                  value={graduationYear}
                  onChangeText={setGraduationYear}
                />
                </View>

                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Feather name="briefcase" size={18} color="#888" />
                  <TextInput
                    placeholder="5"
                    keyboardType="numeric"
                    className="flex-1 ml-2"
                    value={yearsExperience}
                    onChangeText={setYearsExperience}
                  />
                </View>
              </View>
              </View>


              <View className="bg-gray-100 p-3 rounded-lg mb-4">
                <Text className="text-xs text-gray-500">
                  <Text className="font-bold">Note:</Text> Your application will
                  be reviewed by our verification team within 24–48 hours.
                </Text>
              </View>

              {/* <GradientButton
                // onPress={handleDoctorStep2}
                text="Submit Application"
                loading={isLoading}
              /> */}

              <TouchableOpacity
                onPress={() => setDoctorStep(1)}
                className="mt-3"
              >
                <Text className="text-center text-blue-500 underline">
                  Back
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <View className="mt-2 flex-row justify-center items-center">
        <Text className="text-lg text-gray-600">Already have an account? </Text>
        <Text
          onPress={() => router.push("/signin")}
          className="text-[#19c3ee] font-semibold text-base underline"
        >
          Sign in
        </Text>
      </View>
    </View>
  );
}
