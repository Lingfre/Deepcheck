import React from "react";
import {
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar, // Import StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const resources = [
  {
    title: "NCMH Crisis Hotline",
    url: "https://ncmh.gov.ph/",
    description:
      "Call 1553 for 24/7 free and confidential mental health support.",
    phone: "1553",
  },
  {
    title: "MentalHealthPH",
    url: "https://mentalhealthph.org/",
    description: "Advocacy group for mental health awareness and support.",
    phone: "+639178998727",
  },
  {
    title: "Tawag Paglaum - Centro Bisaya",
    url: "https://www.facebook.com/people/Tawag-Paglaum-Centro-Bisaya/100068862624004/",
    description:
      "Tawag Paglaum Centro Bisaya is a helpline, that is available 24/7, for individuals struggling with emotional and suicidal thoughts",
    phone: "+639664679626",
  },
  {
    title: "In Touch: Crisis Line",
    url: "https://in-touch.org/",
    description: "Crisis lines for relationship problems, addiction, abuse and other emotional problems.",
    phone: "+639190560709",
  },
];

export default function ResourcesScreen() {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url);
  };

  const statusBarHeight = StatusBar.currentHeight || 0; // Get status bar height

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { paddingTop: statusBarHeight }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          <FontAwesome name="heartbeat" size={24} color="#e11d48" />{" "}
          Mental Health Resources (🇵🇭)
        </Text>
        {resources.map((res, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{res.title}</Text>
            <Text style={styles.description}>{res.description}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCall(res.phone)}
            >
              <Icon name="phone-call" size={16} color="#fff" />
              <Text style={styles.buttonText}>Call Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => handleOpenURL(res.url)}
            >
              <Icon name="external-link" size={16} color="#2563eb" />
              <Text style={styles.linkText}>Visit Website</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, // Ensures the SafeAreaView takes full screen height
    backgroundColor: "#b0d2ff",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#1e293b",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    color: "#4b5563",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#2563eb",
    marginLeft: 6,
    fontWeight: "500",
  },
});
