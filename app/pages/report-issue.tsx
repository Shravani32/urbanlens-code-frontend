// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// export default function ReportDash() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📢 Issue Dashboard</Text>

//       <TouchableOpacity style={[styles.button, styles.reportButton]}>
//         <Text style={styles.buttonText}>📝 Report a New Issue</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, styles.viewButton]}>
//         <Text style={styles.buttonText}>📜 See All Issues</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, styles.feedbackButton]}>
//         <Text style={styles.buttonTextDark}>💬 Give Feedback</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212", // Dark Mode
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#ffffff",
//     marginBottom: 30,
//   },
//   button: {
//     width: "90%",
//     padding: 15,
//     borderRadius: 12,
//     alignItems: "center",
//     marginVertical: 10,
//     elevation: 5, // Shadow for Android
//     shadowColor: "#000", // Shadow for iOS
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   reportButton: {
//     backgroundColor: "#3498db", // Blue
//   },
//   viewButton: {
//     backgroundColor: "#2ecc71", // Green
//   },
//   feedbackButton: {
//     backgroundColor: "#f1c40f", // Yellow
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonTextDark: {
//     color: "#333",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });




import React, { useState } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker"; // NEW

const screenWidth = Dimensions.get("window").width;

export default function CreateIssue({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [issueAddress, setIssueAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null); // NEW

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
  
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
  
      if (geocode.length > 0) {
        const addr = geocode[0];
        const fullAddress = `${addr.name}, ${addr.street}, ${addr.city}, ${addr.region}, ${addr.postalCode}`;
        setAddress(fullAddress);
      }
    })();
  }, []);

  const categories = [
    "Lighting Department",
    "Health Department",
    "Sewerage and Drainage Department",
    "Stray Animals",
    "Gardening Department",
    "Water Department",
    "Consumer Affairs",
    "Pan, Gutkha, Spitting Related / Spitting Related",
    "Prime Minister Housing Scheme",
    "Paid Sanitization Services",
    "Public Relations Department",
  ];

  // NEW
  const handleCameraPress = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.ytimg.com/vi/L_nIDuFmKdY/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYfyBFKBMwDw==&rs=AOn4CLDP3KnHYae-UetlKksLE1d85-BOwg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create a New Issue</Text>

        {/* Camera/Image Section */}
        <TouchableOpacity style={styles.cameraBox} onPress={handleCameraPress}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.cameraText}>📷 Tap to open camera</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Select Issue Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a category" value="" />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Issue Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter issue address"
          value={issueAddress}
          onChangeText={setIssueAddress}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Additional Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter additional details"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.largeInput}
          placeholder="Enter full address"
          value={address}
          onChangeText={setAddress}
          multiline
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    minHeight: Dimensions.get("window").height,
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  cameraBox: {
    width: "100%",
    height: 130,
    backgroundColor: "#ffffffdd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cameraText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#add8e6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#333",
  },
  largeInput: {
    width: "100%",
    height: 80,
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    color: "#333",
  },
  reportButton: {
    width: "100%",
    backgroundColor: "#6600ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
