import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../config/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export default function SignupScreen({route}) {
  const {userid} = route.params;
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currentMedications, setCurrentMedications] = useState("no medication");
  const [pastOperations, setPastOperations] = useState("no past operations");
  const navigation = useNavigation();
  
  const handleHealthInfo = async() => {
    try{
      await setDoc(doc(db, "users", userid), {
        height,
        weight,
        currentMedications,
        pastOperations,
      },{merge: true});
      console.log("adding info success");
    }
   catch (error) {
    console.error('Error adding info ', error);
  }
  navigation.navigate("ChronicDiseasesScreen", {userid});
  }

  return (
    <View style={styles.container}>
      <ScrollView>

      <Text style={styles.getStartedText}>Some health info 💊</Text>
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
            borderColor: "#3159f6",
          }}
        ></View>
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
            2
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
          <Text style={{ fontSize: 20, color: "#e8ebf3", fontWeight: "bold" }}>
            3
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Height (CM)"
          value={height}
          onChangeText={(text)=>setHeight(text)}
          style={[styles.input, styles.halfInput]}
        />
        <TextInput
          placeholder="Weight (KG)"
          value={weight}
          onChangeText={(text)=>setWeight(text)}
          style={[styles.input, styles.halfInputLast]}
        />
      </View>
        <Text style={{fontWeight: "bold"}}>Current Medications</Text>
      <TextInput
        placeholder="Medication 1, Medication 2, ..."
        value={currentMedications}
        onChangeText={(text)=>setCurrentMedications(text)}
        style={{...styles.input, height: 150}}
      />
      <Text style={{fontWeight: "bold"}}>Past Operations</Text>
      <TextInput
        placeholder="Operation 1, Operation 2, ..."
        value={pastOperations}
        onChangeText={(text)=>setPastOperations(text)}
        style={{...styles.input, height: 150}}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={{
            ...styles.input,
            width: "47%",
            backgroundColor: "#e8ebf0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ ...styles.buttonText, color: "black" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.input,
            width: "47%",
            backgroundColor: "#3159f6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          //onPress={() => navigation.navigate("ChronicDiseasesScreen")}
          onPress={handleHealthInfo}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
