import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import HistoryScreen from "./screens/HistoryScreen";
import LearnMoreScreen from "./screens/LearnMoreScreen";
import ResourcesScreen from "./screens/ResourcesScreen";
import ResultScreen from "./screens/ResultScreen";
import SymptomsCausesScreen from "./screens/SymptomsCausesScreen";

// Create navigators
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab Navigator (without QuestionnaireScreen)
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      barStyle={{ backgroundColor: "#daeaff" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <Icon name="time-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnMoreScreen}
        options={{
          tabBarLabel: "Learn",
          tabBarIcon: ({ color }) => (
            <Icon name="book-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{
          tabBarLabel: "Resources",
          tabBarIcon: ({ color }) => (
            <Icon name="medkit-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator (with QuestionnaireScreen)
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={TabNavigator} />
      <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="SymptomsCauses" component={SymptomsCausesScreen} />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* Main Tab Navigator inside Drawer */}
        <Drawer.Screen
          name="Main"
          component={AppStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
