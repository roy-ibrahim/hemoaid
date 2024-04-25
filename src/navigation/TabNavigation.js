// TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "../Screens/HomeScreen";
import ChatbotScreen from "../Screens/ChatBotScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Chatbot") {
            iconName = focused ? "comment" : "comment-o";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3159f6",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: () => null, headerShown: false }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ tabBarLabel: () => null }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: () => null, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
