import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {createUserWithEmailAndPassword } from "firebase/auth";
//import auth from "../config/firebase";
import { auth, db } from "../config/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export default function SignupScreen() {
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  const userSignUp = async () => {
    let userId = "";
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      userId = userCredential.user.uid;
    } catch(error) {
      console.log(error.message);
    }
    try{
      await setDoc(doc(db, "users", userId), {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
      });
      console.log("adding info success");
    }
   catch (error) {
    console.error('Error adding info ', error);
  }
  navigation.navigate('PersonalInfoScreen', {
    userid: userId
  });
  }


  return (
    <View style={styles.container}>
        
      <ScrollView>
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
          value={firstName}
          onChangeText={(text)=>setFirstName(text)}
          style={[styles.input, styles.halfInput]}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text)=>setLastName(text)}
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
          value={phoneNumber}
          onChangeText={(int) => setPhoneNumber(int)}
          maxLength={8}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={(text)=>setDateOfBirth(text)}
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
        onPress={userSignUp}
        //onPress={()=> navigation.navigate("PersonalInfoScreen")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    
      </ScrollView>
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
