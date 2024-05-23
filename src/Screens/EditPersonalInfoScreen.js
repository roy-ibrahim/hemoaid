import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditPersonalInfoScreen() {
  const userid = auth.currentUser.uid;
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleEdit = async() => {
    try{
      await updateDoc(doc(db, "users", userid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      console.log("adding info success");
    }
   catch (error) {
    console.error('Error adding info ', error);
  }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.editButton}>
        <Text style={{fontSize: 30, fontWeight: "bold"}}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.inputView}>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.firstName}
          onChangeText={text => setFirstName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLastName(text)}
          value={userData.lastName}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Age:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={userData.dateOfBirth}
        />
      </View>
      <View style={styles.inputView}>
        <Text>height (cm):</Text>
        <TextInput
          style={styles.input}
          value={userData.height}
        />
      </View>
      <View style={styles.inputView}>
        <Text>weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={userData.weight}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Chronic Diseases: </Text>
        <TextInput
          style={styles.input}
          value={userData.chronicDiseases}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Past operations:</Text>
        <TextInput
          style={styles.input}
          value={userData.pastOperations}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Current medications:</Text>
        <TextInput
          style={styles.input}
          value={userData.currentMedications}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <View style={{height: 50}}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  inputView: {
    height: 60,
    backgroundColor: "#e8ebf0",
    marginVertical: 10,
    borderColor: "transparent",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
  },
  saveButton: {
    backgroundColor: '#3159f6',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});