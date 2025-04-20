import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ScrollView, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get("window").width;

export default function CreateIssue() {
  const router=useRouter()
  const navigation = useNavigation(); // hook-based fallback navigation
  const [department, setDepartment] = useState("");
  const [issueAddress, setIssueAddress] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(""); // Holds the selected image URI

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

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async() => {
    try {
      const formData = new FormData();
      formData.append("department", department);
      formData.append("issueAddress", issueAddress);
      formData.append("description", description);

      const token = await AsyncStorage.getItem('token');
      
      if (image) {
        // Get the filename from the image URI
        const filename = image.split("/").pop();
  
        // Ensure that filename is a string and fallback if necessary
        const safeFilename = filename || "https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180"; // Provide a default name if undefined
  
        const match = /\.(\w+)$/.exec(safeFilename);
        const type = match ? `image/${match[1]}` : image;
  
        // Convert the image URI to a Blob
        const imageBlob = await fetch(image).then((res) => res.blob());
        
        // Append the image Blob with the safe filename
        formData.append("image", imageBlob, safeFilename);
      }
  
      const response = await axios.post("http://192.168.15.152:5001/api/issues/createissue", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      alert(response);
  
      if (response.status === 200) {
        Alert.alert("Success", "Issue reported successfully!");
        router.push('/pages/dashboard')
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (error) {
      console.error("Error reporting issue:", error);
      Alert.alert("Error", "Failed to report issue.");
    }
  };

  return (
    <ImageBackground  source={{ uri: "https://i.ytimg.com/vi/L_nIDuFmKdY/hq2.jpg" }} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create a New Issue</Text>

        <TouchableOpacity style={styles.cameraBox} onPress={handleCameraPress}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.cameraText}>📷 Tap to open camera</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Select Issue Category</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={department} onValueChange={(itemValue) => setDepartment(itemValue)} style={styles.picker}>
            <Picker.Item label="Select a category" value="" />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Issue Address</Text>
        <TextInput style={styles.input} placeholder="Enter issue address" value={issueAddress} onChangeText={setIssueAddress} placeholderTextColor="#888" />

        <Text style={styles.label}>Additional Information</Text>
        <TextInput style={styles.input} placeholder="Enter additional details" value={description} onChangeText={setDescription} placeholderTextColor="#888" />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.largeInput} placeholder="Enter full address" value={address} onChangeText={setAddress} multiline placeholderTextColor="#888" />

        <TouchableOpacity style={styles.reportButton} onPress={handleSubmit}>
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
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  reportButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});