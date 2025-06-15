import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LearnMoreScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Banner image */}
        <Image
          source={require("../images/Banner.jpg")}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* Symptoms and Causes - Now Tappable */}
        <TouchableOpacity onPress={() => navigation.navigate("SymptomsCauses")}>
        <View style={styles.card}>
            <View style={styles.headerRow}>
            <MaterialIcons name="psychology" size={22} color="#8b5cf6" />
            <Text style={styles.subheader}>Symptoms and Causes</Text>
            </View>
            <Text style={styles.text}>
            Common symptoms include persistent sadness, loss of interest, fatigue,
            changes in sleep or appetite, and difficulty concentrating. Causes can
            be biological, psychological, or environmental, such as genetics, trauma,
            or chronic stress.
            </Text>
        </View>
        </TouchableOpacity>

        {/* Early Detection */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <MaterialIcons name="health-and-safety" size={22} color="#ef4444" />
            <Text style={styles.subheader}>Importance of Early Detection</Text>
          </View>
          <Text style={styles.text}>
            Early detection and intervention are crucial to prevent depression from
            becoming more severe. It helps individuals seek appropriate support and
            treatment, improving their quality of life and overall well-being.
          </Text>
        </View>

        {/* Support Resources - now tappable */}
        <TouchableOpacity onPress={() => navigation.navigate("Resources")}>
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <MaterialIcons name="support-agent" size={22} color="#f59e0b" />
              <Text style={styles.subheader}>Where to Get Help</Text>
            </View>
            <Text style={styles.text}>
              If you're feeling overwhelmed, it's okay to ask for help. Tap here to
              view a list of mental health hotlines and support services available to
              you.
              {"\n\n"}
              Click here to get help.
            </Text>
          </View>
        </TouchableOpacity>

        {/* About PHQ-9 */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <MaterialIcons name="info-outline" size={22} color="#3b82f6" />
            <Text style={styles.header}>About the PHQ-9</Text>
          </View>
          <Text style={styles.text}>
            The PHQ-9 (Patient Health Questionnaire-9) is a self-administered tool
            used to screen, diagnose, monitor, and measure the severity of
            depression. It is a reliable measure based on the diagnostic criteria
            for major depressive disorder in the DSM-IV.
          </Text>
        </View>

        {/* Scoring Guide */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <FontAwesome5 name="list-ol" size={18} color="#10b981" />
            <Text style={styles.subheader}>Scoring Guide</Text>
          </View>
          <View style={styles.bulletList}>
            {[
              "0–4: Minimal or no depression",
              "5–9: Mild depression",
              "10–14: Moderate depression",
              "15–19: Moderately severe depression",
              "20–27: Severe depression",
            ].map((item, index) => (
              <Text key={index} style={styles.bulletItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
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
      paddingHorizontal: 16,
      paddingBottom: 40,
      backgroundColor: "#b0d2ff",
    },
    banner: {
      width: "100%",
      height: 150,
      marginBottom: 20,
      borderRadius: 12,
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
      fontSize: 22,
      fontWeight: "700",
      color: "#1f2937",
    },
    subheader: {
      fontSize: 18,
      fontWeight: "600",
      color: "#374151",
    },
    text: {
      fontSize: 16,
      color: "#4b5563",
      lineHeight: 24,
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