import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResultScreen({ route, navigation }) {
  const { result, recommendation, score, date } = route.params;

  useEffect(() => {
    const saveHistory = async () => {
      const newEntry = { score, result, recommendation, date };

      // Get the existing history from AsyncStorage
      const history = await AsyncStorage.getItem("phq9_history");
      const parsedHistory = history ? JSON.parse(history) : [];

      // Add the new entry to the history array
      parsedHistory.push(newEntry);

      // Sort the history array by date in descending order (latest result first)
      parsedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Save the updated and sorted history back to AsyncStorage
      await AsyncStorage.setItem("phq9_history", JSON.stringify(parsedHistory));
    };

    saveHistory();
  }, [score, result, recommendation, date]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b0d2ff",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
          width: "100%",
          maxWidth: 360,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Your PHQ-9 Results
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#2980b9",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Score: {score}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#34495e",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {result}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#7f8c8d",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Recommendation:
          {"\n"}
          {recommendation}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Resources")}
          style={{
            backgroundColor: "#3498db",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
            View Resources
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
