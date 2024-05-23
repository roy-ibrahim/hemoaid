import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const GeminiChat = () => {
  const userid = auth.currentUser.uid;
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(
          `The patient is a ${userData.dateOfBirth}-year-old with a history of ${userData.chronicDiseases}. They are currently taking ${userData.currentMedications}. Their height is ${userData.height} cm and weight is ${userData.weight} kg. Past operations include ${userData.pastOperations}. take this into consideration before answering any question`
        );
      } else {
        console.log("No document found");
      }
    };

    fetchUserData();
  }, []);

  const API_KEY = "AIzaSyDMgSJdGzmNz7gAzO2jTTIZEIekXuwSuK0";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `You are named HemoAid, the medical helper, you answer medical questions, only small answers`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to state

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Wait for chatbot response and then update state
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
      setLoading(false);
      setUserInput("");
    }, 1000); // Adjust the delay as needed
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessage : styles.chatbotMessage,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          color: item.user ? "black" : "white",
        }}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginBottom: 5,
          height: 30,
          padding: 5,
          backgroundColor: "red",
          width: "60%",
          backgroundColor: "#e8ebf0",
          alignSelf: "center",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={()=> setUserInput(`I am ${userData.dateOfBirth}-year-old with a history of ${userData.chronicDiseases}. I am currently taking ${userData.currentMedications}. My height is ${userData.height} cm and weight is ${userData.weight} kg. Past operations include ${userData.pastOperations}`)}
      >
        <Text
          style={{
            color: "black",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          Tell HemoAid about myself
        </Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.text}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="small" color="black" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffff" },
  messageContainer: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e8ebf0", // Red background for user messages
    color: "black", // White text for user messages
    marginRight: 10,
  },
  chatbotMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3159f6", // Blue background for chatbot messages
    color: "white",
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e8ebf0",
    borderRadius: 10,
    height: 50,
  },
  sendButton: {
    backgroundColor: "#3159f6",
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
  },
  sendButtonText: { color: "white", fontSize: 16 },
});

export default GeminiChat;
