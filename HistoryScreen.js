import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshingMessage, setRefreshingMessage] = useState("");

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("phq9_history");
      if (data) {
        const parsedData = JSON.parse(data);
        // ✅ Ensure sorting is done with getTime()
        parsedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setHistory(parsedData);
        setFilteredHistory(parsedData);
      } else {
        console.log("No history found");
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setIsRefreshing(false);
      setRefreshingMessage("");
    }
  };
  
  const deleteEntry = async (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    // ✅ Re-sort after delete
    updatedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setHistory(updatedHistory);
    setFilteredHistory(updatedHistory.filter((entry) => filterEntry(entry, searchText)));
    await AsyncStorage.setItem("phq9_history", JSON.stringify(updatedHistory));
  };
  
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = history
      .filter((entry) => filterEntry(entry, text))
      // ✅ Sort search results as well
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredHistory(filtered);
  };
  

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  
  const confirmDeleteEntry = (index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteEntry(index),
        },
      ]
    );
  };

  const deleteAllEntries = () => {
    Alert.alert(
      "Confirm Delete All",
      "Are you sure you want to delete all entries?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            setHistory([]);
            setFilteredHistory([]);
            await AsyncStorage.removeItem("phq9_history");
          },
        },
      ]
    );
  };

  const filterEntry = (entry, text) => {
    const lowerText = text.toLowerCase();
    return (
      entry.date.toLowerCase().includes(lowerText) ||
      entry.score.toString().includes(lowerText) ||
      entry.result.toLowerCase().includes(lowerText) ||
      entry.recommendation.toLowerCase().includes(lowerText)
    );
  };



  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshingMessage("Refreshing...");
    loadHistory();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Assessment History</Text>
          <TouchableOpacity
            onPress={deleteAllEntries}
            style={styles.deleteAllButton}
          >
            <Text style={styles.deleteAllText}>Delete All</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search history..."
          value={searchText}
          onChangeText={handleSearch}
        />

        {isRefreshing && (
          <View style={styles.refreshingContainer}>
            <ActivityIndicator size="small" color="#FF5C5C" />
            <Text style={styles.refreshingText}>{refreshingMessage}</Text>
          </View>
        )}

        <FlatList
          data={filteredHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => confirmDeleteEntry(index)}
                style={styles.deleteIcon}
              >
                <Ionicons name="trash" size={24} color="#FF5C5C" />
              </TouchableOpacity>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{item.date}</Text>
              <Text style={styles.label}>Score:</Text>
              <Text style={styles.value}>{item.score}</Text>
              <Text style={styles.label}>Result:</Text>
              <Text style={styles.value}>{item.result}</Text>
              <Text style={styles.label}>Recommendation:</Text>
              <Text style={styles.value}>{item.recommendation}</Text>
            </View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            isRefreshing ? <ActivityIndicator size="large" color="#FF5C5C" /> : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#b0d2ff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  deleteAllButton: {
    padding: 10,
    backgroundColor: "#FF5C5C",
    borderRadius: 20,
  },
  deleteAllText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  value: {
    marginBottom: 5,
    color: "#222",
  },
  refreshingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  refreshingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#FF5C5C",
  },
});
