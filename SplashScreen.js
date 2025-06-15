import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../images/Brainicon.png")} style={styles.icon} />
      <Text style={styles.title}>E-DEPCHECK PHQ-9 DEPRESSION ASSESSMENT</Text>
      <Text style={styles.subtitle}>Your mental wellness companion.</Text>

      {/* Lottie Animation */}
      <LottieView
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b0d2ff",
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 30, // Extra margin to make space for spinner
  },
  lottie: {
    width: 100,
    height: 100,
  },
});