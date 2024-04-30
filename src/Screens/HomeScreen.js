import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function HomeScreen() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 67, 40, 35, 76, 60, 49],
        color: (opacity = 1) => `rgba(1, 1, 246, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#1cc910",
    backgroundGradientFrom: "#e8ebf0",
    backgroundGradientTo: "#e8ebf0",
    decimalPlaces: 2, // optional, defaults to 2
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    },
  };

  return (
    <ScrollView
      style={{ ...styles.container, paddingTop: StatusBar.currentHeight + 10 }}
    >
      <View>
        <Text style={styles.welcomeText}>Hi Roy! 👋</Text>
      </View>
      <TouchableOpacity style={styles.addBloodTestButton}>
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
      <Text style={styles.AddTestText}>Track your progress</Text>
      <LineChart
        data={data}
        width={320}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 20,
        }}
      />
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
