import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const bloodTestsData = [
  {
    name: 'Test 1',
    date: 'Tuesday, April 30, 2024',
    results: [
      { name: 'Glucose', value: '100', range: '70-110' },
      { name: 'Cholesterol', value: '200', range: '125-200' },
      { name: 'Triglycerides', value: '150', range: '10-150' },
      { name: 'HDL', value: '60', range: '40-60' },
      { name: 'LDL', value: '100', range: '0-100' },
      { name: 'Hematocrit', value: '40', range: '37-47' },
      { name: 'Hemoglobin', value: '14', range: '12-16' },
      { name: 'MCV', value: '80', range: '80-100' },
      { name: 'MCH', value: '27', range: '27-31' },
      { name: 'MCHC', value: '32', range: '32-36' },
    ],
  },
];

const TableRow = ({ name, value, range }) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{name}</Text>
      <Text style={styles.tableCell}>{value}</Text>
      <Text style={styles.tableCell}>{range}</Text>
    </View>
  );
};

const TableHeader = () => {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.tableHeader]}>Test Name</Text>
      <Text style={[styles.tableCell, styles.tableHeader]}>Value</Text>
      <Text style={[styles.tableCell, styles.tableHeader]}>Reference</Text>
    </View>
  );
};

const BloodTestResultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.testName}>Dr. John's Test</Text>
      <Text style={styles.testDate}>{bloodTestsData[0].date}</Text>
      <TableHeader />
      {bloodTestsData.map((test, index) => (
        <FlatList
          key={index}
          data={test.results}
          renderItem={({ item }) => (
            <TableRow name={item.name} value={item.value} range={item.range} />
          )}
          keyExtractor={item => item.name}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: 70,
    flex: 1,
    padding: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  testName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3159f6',
    marginBottom: 10,
  },
  testDate: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
});

export default BloodTestResultScreen;