import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself – or that you are a failure?",
  "Trouble concentrating on things, such as reading?",
  "Moving or speaking so slowly that others notice?",
  "Thoughts that you would be better off dead or hurting yourself?",
];

const scores = [0, 1, 2, 3];
const labels = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day",
];

export default function QuestionnaireScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);

  const handleAnswer = (score) => {
    const newResponses = [...responses, score];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newResponses.reduce((acc, score) => acc + score, 0);
      let result = "Your mental well-being seems stable.";
      let recommendation = "None/Watchful Waiting";

      if (totalScore >= 5 && totalScore <= 9) {
        result = "You have a Mild depression.";
        recommendation = "Follow up/Repeat PHQ-9";
      } else if (totalScore >= 10 && totalScore <= 14) {
        result = "You have a Moderate depression.";
        recommendation =
          "Treatment plan, considering counseling, follow-up, and/or pharmacotherapy";
      } else if (totalScore >= 15 && totalScore <= 19) {
        result = "You have a Moderately Severe depression.";
        recommendation =
          "Active treatment with pharmacotherapy and/or psychotherapy";
      } else if (totalScore >= 20) {
        result = "You have a Severe depression.";
        recommendation =
          "Immediate initiation of pharmacotherapy and expedited referral to a mental health specialist for psychotherapy and/or collaborative management";
      }

      navigation.navigate("Result", {
        result,
        recommendation,
        score: totalScore,
        date: new Date().toLocaleString(),
      });
    }
  };

  const handleBack = () => {
    navigation.goBack(); // Goes back to the previous screen (HomeScreen)
  };

  return (
    <View style={styles.container}>
      {/* Back Button with Icon */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Title and Instructions */}
      <Text style={styles.title}>Mental Health Questionnaire (PHQ-9)</Text>
      <Text style={styles.instructions}>
        Please answer the following questions based on how you've felt over the past two weeks.
      </Text>

      {/* Progress Indicator */}
      <Text style={styles.progress}>
        Question {currentQuestion + 1} of {questions.length}
      </Text>

      {/* Question Text */}
      <Text style={styles.question}>{questions[currentQuestion]}</Text>

      {/* Answer Options */}
      {scores.map((score, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleAnswer(score)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{labels[i]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#b0d2ff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    backgroundColor: "#b0d2ff",
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 10,
    top: 50,
    left: 20,
    position: "absolute",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#2c3e50",
    top: 150,
    position: "absolute",
    
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  progress: {
    fontSize: 16,
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 10,
    fontStyle: "italic",
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#34495e",
  },
  optionButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#2c3e50",
  },
});
