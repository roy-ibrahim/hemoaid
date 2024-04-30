import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
//import auth from "../config/firebase";
import { auth, db } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function SignupScreen() {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  const signUp = async () => {
    try {
      console.log('YOO:',email, password)
      // Create a new user
      createUserWithEmailAndPassword(email, password);
  
      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.getStartedText}>Let's get you started👏</Text>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#3159f6",
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            1
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            borderWidth: 2,
            height: 1,
            margin: 4,
            borderColor: "#e8ebf3",
          }}
        ></View>
        <View
          style={{
            width: 40,
            height: 40,
            borderWidth: 3,
            borderColor: "#e8ebf3",
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "#e8ebf0", fontWeight: "bold" }}>
            2
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            borderWidth: 2,
            height: 1,
            margin: 4,
            borderColor: "#e8ebf0",
          }}
        ></View>
        <View
          style={{
            width: 40,
            height: 40,
            borderWidth: 3,
            borderColor: "#e8ebf3",
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "#e8ebf3", fontWeight: "bold" }}>
            3
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="First Name"
          style={[styles.input, styles.halfInput]}
        />
        <TextInput
          placeholder="Last Name"
          style={[styles.input, styles.halfInputLast]}
        />
      </View>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View
        style={{ ...styles.input, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ right: 4, fontWeight: "bold", color: "#3159f6" }}>
          +961
        </Text>
        <TextInput
          placeholder="Phone Number"
          maxLength={8}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Date of Birth"
          style={[styles.input, styles.halfInput]}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            mode="dropdown" // Optional: specify the picker mode
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TextInput
        placeholder="Re-enter Your Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity
        style={{
          ...styles.input,
          backgroundColor: "#3159f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={signUp}
        //onPress={()=> navigation.navigate("PersonalInfoScreen")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "content",
    padding: 20,
  },
  getStartedText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 55,
    backgroundColor: "#e8ebf0",
    marginVertical: 10,
    borderColor: "transparent",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pickerContainer: {
    height: 55,
    flex: 1,
    top: 10,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "#e8ebf0",
    justifyContent: "center", // Added to vertically center the picker text
  },
  halfInput: {
    flex: 1,
    marginRight: 5,
  },
  halfInputLast: {
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});
