import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

const WelcomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [borderColor, setBorderColor] = useState("transparent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.getStartedButton} onPress={toggleModal}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={toggleModal}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.LoginText}>Login to your account</Text>
            <TextInput
              placeholder="Email"
              style={{...styles.input, borderColor: borderColor}}
              onChangeText={(text) => {
                setEmail(text);
                setBorderColor("#3159f6");
            }
              }
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
                <Text style={{fontWeight: "bold", fontSize: 15,}}>Don't have an account?</Text>
                <TouchableOpacity style={styles.registerNowButton}>
                    <Text style={{color: "#3159f6", fontWeight: "bold",}}>Register now</Text>
                </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  getStartedButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "8%",
    position: "absolute",
    bottom: 10,
    backgroundColor: "#3159f6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  getStartedButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
  },
  closeButtonText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  LoginText:{
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 20,
    width: "90%",
    height: "60%",
  },
  signupContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 55,
    backgroundColor:"#e8ebf0",
    marginVertical: 10,
    borderColor: "transparent",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3159f6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerNowButton: {
    marginLeft: 5,
  }
});

export default WelcomeScreen;
