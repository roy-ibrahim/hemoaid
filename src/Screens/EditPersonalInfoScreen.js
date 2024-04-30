import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function EditPersonalInfoScreen() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');

  const handleEdit = () => {
    // Show the keyboard and allow the user to edit the fields
  };

  const handleSave = () => {
    // Save the user data to the backend or local storage
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
        <Text style={{fontSize: 30, fontWeight: "bold"}}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.inputView}>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLastName(text)}
          value={lastName}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
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