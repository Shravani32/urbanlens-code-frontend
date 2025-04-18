import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get device width

// Define prop types explicitly
interface MarqueeTextProps {
  text: string;
  speed?: number; // Optional prop
}

export default function MarqueeText({ text, speed = 4000 }: MarqueeTextProps) {
  const translateX = useRef(new Animated.Value(width)).current; // Start outside the screen

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(width); // Reset position
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -width, // Move completely off-screen
          duration: speed, // Adjust animation speed
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, [speed]);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.Text style={[styles.marqueeText, { transform: [{ translateX }] }]}>
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  marqueeContainer: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
  },
  marqueeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
