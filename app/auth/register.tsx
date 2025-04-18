import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useCameraPermissions } from "expo-camera";
import MarqueeText from "@/components/MarqueeText";
import axios from 'axios';


export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [role,setRole]=useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      // Request Location Permission
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert("Permission Denied", "Location access is required to register.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Request Camera Permission
      if (!cameraPermission || !cameraPermission.granted) {
        const cameraResult = await requestCameraPermission();
        if (!cameraResult.granted) {
          Alert.alert("Permission Denied", "Camera access is required to register.");
        }
      }
    };

    requestPermissions();
  }, []);

  const handleRegister = async () => {
    if (!location) {
      Alert.alert("Location Error", "Location data not available");
      return;
    }

    const userData = {
      firstName,
      lastName,
      phone,
      aadhar,
      password,
      rePassword,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      role
    };

    try {
      const res = await axios.post("http://192.168.15.152:5001/api/auth/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (res.status === 200 || res.status === 201) {
        Alert.alert("Success", "User registered successfully!");
        router.push("/auth/login");
      } else {
        Alert.alert("Error", "Failed to register user");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#EFEFEF", "#EFEFEF"]} style={styles.headingContainer}>
        <MarqueeText text="Welcome to UrbanLens! At your help 🫡" speed={3500} />
      </LinearGradient>

      <Text style={styles.title}>Register</Text>

      {[
        { placeholder: "First Name", value: firstName, set: setFirstName },
        { placeholder: "Last Name", value: lastName, set: setLastName },
        { placeholder: "Phone Number", value: phone, set: setPhone, keyboardType: "phone-pad" },
        { placeholder: "aadhar Number", value: aadhar, set: setAadhar, keyboardType: "numeric" },
        { placeholder: "Password", value: password, set: setPassword, secure: true },
        { placeholder: "Re-enter Password", value: rePassword, set: setRePassword, secure: true },
        { placeholder: "Role", value: role,set:setRole  },
      ].map((field, index) => (
        <View style={styles.inputContainer} key={index}>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor="#6B7280"
            value={field.value}
            onChangeText={field.set}
            keyboardType={field.keyboardType}
            secureTextEntry={field.secure}
          />
        </View>

      ))}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <LinearGradient colors={["#2563EB", "#1E40AF"]} style={styles.gradientButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  headingContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: "#111827",
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  linkText: {
    color: "#2563EB",
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
