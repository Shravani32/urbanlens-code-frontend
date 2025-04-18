// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";

// const screenWidth = Dimensions.get("window").width;

// const data = [
//   {
//     name: "Assigned Issues",
//     count: 5, // Static for now
//     color: "#ffcc00",
//     legendFontColor: "#333",
//     legendFontSize: 14,
//   },
//   {
//     name: "Pending Issues",
//     count: 3, // Static for now
//     color: "#ff4444",
//     legendFontColor: "#333",
//     legendFontSize: 14,
//   },
//   {
//     name: "Solved Issues",
//     count: 10, // Static for now
//     color: "#00C851",
//     legendFontColor: "#333",
//     legendFontSize: 14,
//   },
// ];

// const chartConfig = {
//   backgroundGradientFrom: "#fff",
//   backgroundGradientTo: "#fff",
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// };

// const Dashboard = () => {
//   // TODO: Replace static data with dynamic fetch from backend once available
//   // Example:
//   // useEffect(() => {
//   //   fetch("https://your-backend-api/issues-count")
//   //     .then(res => res.json())
//   //     .then(data => setChartData(data));
//   // }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Issue Summary</Text>
//       <PieChart
//         data={data.map(d => ({
//           name: d.name,
//           population: d.count,
//           color: d.color,
//           legendFontColor: d.legendFontColor,
//           legendFontSize: d.legendFontSize,
//         }))}
//         width={screenWidth - 20}
//         height={220}
//         chartConfig={chartConfig}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute
//       />

//       <Text style={styles.subHeading}>SMK MC Services</Text>

//       <View style={styles.cardContainer}>
//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardText}>Report Issue</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardText}>See Issues</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardText}>See Emergency Numbers</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardText}>Information About Corporation</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 30,
//     alignItems: "center",
//     backgroundColor: "#f0f4f7",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 20,
//   },
//   subHeading: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginVertical: 20,
//     color: "#444",
//   },
//   cardContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: 15,
//     paddingHorizontal: 10,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     width: screenWidth * 0.42,
//     margin: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     alignItems: "center",
//   },
//   cardText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     textAlign: "center",
//   },
// });

// export default Dashboard;



import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Assigned Issues",
    count: 5,
    color: "#ffcc00",
    legendFontColor: "#333",
    legendFontSize: 14,
  },
  {
    name: "Pending Issues",
    count: 3,
    color: "#ff4444",
    legendFontColor: "#333",
    legendFontSize: 14,
  },
  {
    name: "Solved Issues",
    count: 10,
    color: "#00C851",
    legendFontColor: "#333",
    legendFontSize: 14,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const Dashboard = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={{
        uri: "https://i.ytimg.com/vi/L_nIDuFmKdY/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYfyBFKBMwDw==&rs=AOn4CLDP3KnHYae-UetlKksLE1d85-BOwg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Issue Summary</Text>

        <PieChart
          data={data.map((d) => ({
            name: d.name,
            population: d.count,
            color: d.color,
            legendFontColor: d.legendFontColor,
            legendFontSize: d.legendFontSize,
          }))}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="03"
          absolute
        />

        <Text style={styles.subHeading}>SMK MC Services</Text>

        <View style={styles.cardGrid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/report-issue")}
          >
            <Icon name="report-problem" size={24} color="#333" />
            <Text style={styles.cardText}>Report Issue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push("/see_issues")}>
            <Icon name="list-alt" size={24} color="#333" />
            <Text style={styles.cardText}>See Issues</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push("/numbers")}>
            <Icon name="phone" size={24} color="#333" />
            <Text style={styles.cardText}>See Important Numbers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push("/info")}>
            <Icon name="info" size={24} color="#333" />
            <Text style={styles.cardText}>Information About Corporation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "space-around",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
  },
  card: {
    backgroundColor: "#ffffffdd",
    borderRadius: 15,
    width: screenWidth * 0.42,
    marginVertical: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginTop: 6,
  },
});

export default Dashboard;
