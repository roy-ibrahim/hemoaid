import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Modal } from "react-native";
import { StatusBar } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import AddBloodTestScreen from "./AddBloodTestScreen";

export default function HomeScreen() {
  const userid = auth.currentUser.uid;
  const [data1, setData1] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData1 = async () => {
    setError(null); // Reset the error state before making a new request

    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=medical', {
        headers: {
          'X-Api-Key': 'EBeSmF6XhC6UJcgIBr268g==hdmrIBB6pgJs3t1d',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData1(result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", userid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(userData.firstName);
      } else {
        console.log("No document found");
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={{ ...styles.container, paddingTop: StatusBar.currentHeight + 10}}>
      <View>
        <Text style={styles.welcomeText}>Hi {userData.firstName}! 👋</Text>
      </View>
      <View style={{...styles.addBloodTestButton, backgroundColor: "black"}}>
        <Text style={{color: "white", fontSize: 20, marginBottom: 10, fontWeight: "bold"}}>Quote of the day:</Text>
        {data1 && data1.map((quote, index) => (
            <Text key={index} style={{color: "white", fontStyle: "italic", fontSize: 13}}>"{quote.quote}"  --  {quote.author}</Text>
          ))}
      </View>
      <TouchableOpacity style={styles.addBloodTestButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.AddTestText}>Add your blood test now!</Text>
        <ImageBackground
          source={require("../images/image1.png")}
          style={{
            width: 190,
            height: 190,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        ></ImageBackground>
      </TouchableOpacity>
      <View style={{height: 60}}></View>
      <Modal visible={modalVisible} animationType="slide"
      onRequestClose={() => {
        setModalVisible(false);
      }}>
        <AddBloodTestScreen onClose={() => setModalVisible(false)} />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addBloodTestButton: {
    padding: 15,
    height: 200,
    backgroundColor: "#e8ebf0",
    borderRadius: 20,
    marginVertical: 20,
  },
  AddTestText: {
    fontSize: 23,
    fontWeight: "bold",
  },
});
