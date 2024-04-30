import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import EditPersonalInfoScreen from "./EditPersonalInfoScreen";

export default function ProfileScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ ...styles.container, paddingTop: StatusBar.currentHeight + 10 }}
    >
      <View style={{flexDirection: "row"}}>
      <Image
        source={require("../images/profileImage.jpg")}
        style={{
          width: 110,
          height: 110,
          borderRadius: 200,
          borderColor: "#3159f6",
          borderWidth: 3,
        }}
      ></Image>
      <View style={{marginLeft: 10}}>
        <Text style={styles.name}>Roy Ibrahim</Text>
        <Text style={styles.smalltext}>Gender: Male</Text>
        <Text style={styles.smalltext}>Age: 23</Text>
        <Text style={styles.smalltext}>Height: 185cm | Weight: 56kg</Text>
      </View>
      </View>

      <View style={styles.secondcontainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
            onPress={() => navigation.navigate("EditPersonalInfoScreen")}
          >
            <Icon name="user" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Edit personal info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="cog" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Edit account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="medkit" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>View blood tests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="list" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Health summary</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="info-circle" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="question-circle" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
          >
            <Icon name="phone" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  name:{
    fontSize: 25,
    fontWeight: "bold",
    color: "#3159f6",
  },
  secondcontainer: {
    top: 15,
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  smalltext: {
    fontWeight: "bold",

  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 10,
    color: "black",
  },
});
