import React from 'react';
import { View, Text, StyleSheet, Share, Touchable, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const HealthSummaryScreen = () => {
  const userid = auth.currentUser.uid;
  const [userData, setUserData] = useState({});
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
    <View style={styles.container}>
      <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
      <Text style={styles.info}>Age: {userData.dateOfBirth}</Text>
      <Text style={styles.info}>Height: {userData.height}</Text>
      <Text style={styles.info}>Weight: {userData.weight}</Text>
      <Text style={styles.info}>Gender: {userData.gender}</Text>
      <Text style={styles.title}>Past Operations:</Text>
      <Text style={styles.list}>
        {userData.pastOperations}
      </Text>
      <Text style={styles.title}>Current Medications:</Text>
      <Text style={styles.list}>{userData.currentMedications}
      </Text>
      <Text style={styles.title}>Chronic Diseases:</Text>
      <Text style={styles.list}>{userData.chronicDiseases}
      </Text>
      <TouchableOpacity
      onPress={()=> Share.share({
        message: `Name: ${userData.firstName} ${userData.lastName}` +
        `\nAge: ${userData.dateOfBirth}` +
        `\nGender: ${userData.gender}` +
        `\nHeight: ${userData.height} cm` +
        `\nWeight: ${userData.weight} kg` +
        `\nChronic Diseases: ${userData.chronicDiseases}` +
        `\nCurrent Medications: ${userData.currentMedications}` +
        `\nPast Operations: ${userData.pastOperations}`,
      })}>
        <Text style={{fontSize: 20, fontWeight: "bold", color: "#3159f6", textAlign: "center", top :40}}>Tell the Dr about me</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3159f6',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#333',
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
    color: '#333',
  },
});

export default HealthSummaryScreen;