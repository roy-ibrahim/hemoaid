import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const person = {
  name: 'John Doe',
  age: 30,
  height: '170 cm',
  weight: '70 kg',
  gender: 'Male',
  pastOperations: ['Operation 1', 'Operation 2'],
  currentMedications: ['Medication 1', 'Medication 2'],
  chronicDiseases: ['Disease 1', 'Disease 2'],
};

const HealthSummaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.info}>Age: {person.age}</Text>
      <Text style={styles.info}>Height: {person.height}</Text>
      <Text style={styles.info}>Weight: {person.weight}</Text>
      <Text style={styles.info}>Gender: {person.gender}</Text>
      <Text style={styles.title}>Past Operations:</Text>
      <Text style={styles.list}>
        {person.pastOperations.map((operation, index) => (
          <Text key={index}>{operation}, </Text>
        ))}
      </Text>
      <Text style={styles.title}>Current Medications:</Text>
      <Text style={styles.list}>
        {person.currentMedications.map((medication, index) => (
          <Text key={index}>{medication}, </Text>
        ))}
      </Text>
      <Text style={styles.title}>Chronic Diseases:</Text>
      <Text style={styles.list}>
        {person.chronicDiseases.map((disease, index) => (
          <Text key={index}>{disease}, </Text>
        ))}
      </Text>
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