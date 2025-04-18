import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Animated, 
    ImageBackground,Alert
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useRouter } from "expo-router"; 
  import { LinearGradient } from "expo-linear-gradient"; 
import MarqueeText from "@/components/MarqueeText";
import axios from "axios";
  
  export default function Login() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    // Animation for heading
    const fadeAnim = new Animated.Value(0);
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, []);
  
    const handleLogin = async() => {
      if (!phone || !password) {
        alert("Please fill in all fields.");
        return;
      }
    
      try {
        const res = await axios.post("http://192.168.196.152:5001/api/auth/login", {phone,password}, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (res.status === 200 || res.status === 201) {
          Alert.alert("Success", "User LoggedIn successfully!");
          router.push("/pages/Home");
        } else {
          Alert.alert("Error", "Failed to Logged in user");
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "An error occurred during Login");
      }
    
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* UrbanLens Heading with Animation */}
        <LinearGradient colors={["#EFEFEF", "#EFEFEF"]} style={styles.headingContainer}>
          <MarqueeText  text="Welcome Back to UrbanLens! 😎🫡" speed={3500} />
        </LinearGradient>
  
        {/* Login Form */}
        <Text style={styles.title}>Login</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#6B7280"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <LinearGradient colors={["#2563EB", "#1E40AF"]} style={styles.gradientButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
  
        {/* Image at the bottom */}
        <ImageBackground 
  source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9Pzy9H8mIfbGyfRPapTAmS5vs1VkrcczCw&s" }}
  style={styles.bottomImage}
  imageStyle={{ borderRadius: 20 }} // Applies border radius properly
/>
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
    heading: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#443627",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      textAlign: "center",
      alignSelf: "center",
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
    bottomImage: {
        width: "80%",
        height: 200,
        marginTop: 20,
        marginLeft:50
      },
      
  });
  