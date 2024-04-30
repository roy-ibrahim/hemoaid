import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const bloodTestsData = [
  {
    name: "Test 1",
    date: "Tuesday, April 30, 2024",
    hospital: "Hospital A",
  },
  {
    name: "Test 2",
    date: "Monday, April 29, 2024",
    hospital: "Hospital B",
  },
  // Add more test data here
];

const ViewBloodTestsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
      style={{backgroundColor: "white", padding: 20}}
        data={bloodTestsData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.test} onPress={() => {}}>
            <Text style={styles.testName}>{item.name}</Text>
            <Text style={styles.testDate}>{item.date}</Text>
            <Text style={styles.testHospital}>{item.hospital}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{
          ...styles.test,
          backgroundColor: "#3159f6",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: "90%",
          position: "absolute",
          bottom: 10,
          right: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Add test
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#white",
  },
  test: {
    backgroundColor: "#e8ebf0",
    borderRadius: 10,
    height: 100,
    marginVertical: 10,
    padding: 10,
  },
  testName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3159f6",
  },
  testDate: {
    fontSize: 14,
    color: "#666",
  },
  testHospital: {
    fontSize: 14,
    color: "#666",
  },
});

export default ViewBloodTestsScreen;
