import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SymptomsCausesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <MaterialIcons name="psychology" size={24} color="#8b5cf6" />
            <Text style={styles.header}>Symptoms and Causes of Depression</Text>
          </View>
          <Text style={styles.text}>
            Depression is a complex mental health disorder with various symptoms and potential causes. Here are some common ones:
          </Text>

          <Text style={styles.subheader}>Common Symptoms:</Text>
          <View style={styles.bulletList}>
            {[
              "Persistent sadness or low mood",
              "Loss of interest in enjoyable activities",
              "Fatigue or low energy",
              "Changes in appetite or weight",
              "Insomnia or excessive sleeping",
              "Difficulty concentrating or making decisions",
              "Feelings of worthlessness or guilt",
              "Thoughts of self-harm or suicide",
            ].map((item, index) => (
              <Text key={index} style={styles.bulletItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.subheader}>Possible Causes:</Text>
          <View style={styles.bulletList}>
            {[
              "Genetic predisposition or family history",
              "Imbalance in brain chemicals (neurotransmitters)",
              "Chronic stress or trauma",
              "Medical conditions (e.g., thyroid problems, chronic illness)",
              "Substance abuse",
              "Major life events such as loss, divorce, or job stress",
            ].map((item, index) => (
              <Text key={index} style={styles.bulletItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.text}>
            Understanding the symptoms and causes is a crucial first step toward seeking help and recovery.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#b0d2ff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  header: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1f2937",
  },
  subheader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 6,
  },
});
