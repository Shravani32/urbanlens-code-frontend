import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UrbanLens Dashboard</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/pages/explore")}>
          <FontAwesome5 name="compass" size={30} color="#2563EB" />
          <Text style={styles.label}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/pages/info")}>
          <Ionicons name="information-circle-outline" size={30} color="#10B981" />
          <Text style={styles.label}>Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/pages/numbers")}>
          <MaterialIcons name="numbers" size={30} color="#F59E0B" />
          <Text style={styles.label}>Numbers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/pages/report-issue")}>
          <Feather name="alert-circle" size={30} color="#EF4444" />
          <Text style={styles.label}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/pages/see_issues")}>
          <Ionicons name="eye-outline" size={30} color="#8B5CF6" />
          <Text style={styles.label}>See Issues</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                <Ionicons name="arrow-back-circle-outline" size={32} color="#2563EB" />
                <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1F2937",
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  iconBox: {
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: 100,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  backText: {
    marginTop: 5,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});
