import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Linking,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import EditPersonalInfoScreen from "./EditPersonalInfoScreen";
import ViewBloodTestsScreen from "./ViewBloodTestsScreen";
import HealthSummaryScreen from "./HealthSummaryScreen";

export default function ProfileScreen() {
  const userid = auth.currentUser.uid;
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

    const handleCall = () => {
      const phoneNumber = '+96179197142';
      Linking.openURL(`tel:${phoneNumber}`);
    };

  const handlePers = () => {
    setModalContent(<EditPersonalInfoScreen userid={userid}/>);
    setModalVisible(true);
  };

  const handleBloodTests = () => {
    setModalContent(<ViewBloodTestsScreen />);
    setModalVisible(true);
  };

  const handleHealthSummary = () => {
    setModalContent(<HealthSummaryScreen />);
    setModalVisible(true);
  };

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

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ ...styles.container, paddingTop: StatusBar.currentHeight + 10 }}
    >
      <View style={{ flexDirection: "row" }}>
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
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{userData.firstName} {userData.lastName}</Text>
          <Text style={styles.smalltext}>Gender: {userData.gender}</Text>
          <Text style={styles.smalltext}>Age: 23</Text>
          <Text style={styles.smalltext}>Height: {userData.height}cm | Weight: {userData.weight}kg</Text>
        </View>
      </View>

      <View style={styles.secondcontainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
            onPress={handlePers}
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
            onPress={handleHealthSummary}
          >
            <Icon name="list" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Health summary</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
            onPress={()=> Linking.openURL("https://hemoaid.com")}
          >
            <Icon name="info-circle" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e8ebf0" }]}
            onPress={handleCall}
          >
            <Icon name="phone" size={20} color="#3159f6" />
            <Text style={styles.buttonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {modalContent}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  name: {
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
});
