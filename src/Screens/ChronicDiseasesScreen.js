import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export default function SignupScreen({route}) {
  const [gender, setGender] = useState(null);
  const navigation = useNavigation();
  const {userid} = route.params;
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  //{selected.join(", ")}
  const handleChronicDiseases = async() => {
    try{
      await setDoc(doc(db, "users", userid), {
        chronicDiseases: selected.join(", "),
      },{merge: true});
      console.log("adding info success");
    }
   catch (error) {
    console.error('Error adding info ', error);
  }
  }

  const fetchData = async () => {
    const response = await fetch(
      `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${input}`
    );
    const data = await response.json();
    setResults(data[3]);
  };

  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <>

    <View style={styles.container}>

      <Text style={styles.getStartedText}>Any severe problem?🩸</Text>
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
            3
          </Text>
        </View>
      </View>
      <View>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={setInput}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <FlatList
          scrollEnabled
          style={{
            backgroundColor: "#e8ebf0",
            borderRadius: 20,
            marginVertical: 5,
            height: "31%",
            padding: 10,
          }}
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
                bottom: 5,
              }}
            >
              <RadioButton
                value={item[0]}
                status={selected.includes(item[0]) ? "checked" : "unchecked"}
                onPress={() => handleSelect(item[0])}
              />
              <Text>{item[0]}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.selectedDiseases}>
          <Text style={{ fontWeight: "bold" }}>Selected Diseases:</Text>
          <Text>{selected.join(", ")}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{ ...styles.halfButton, backgroundColor: "#e8ebf0", marginRight:10 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ ...styles.buttonText, color: "black" }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.halfButton}
          onPress={handleChronicDiseases}>
            <Text style={styles.buttonText}>Finish!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
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
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    backgroundColor: "#3159f6",
    borderColor: "transparent",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  halfButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "47.5%",
    backgroundColor: "#3159f6",
    borderColor: "transparent",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    height: "20%",
    width: "100%",
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
  },
  selectedDiseases: {
    backgroundColor: "#e8ebf0",
    width: "100%",
    height: "90%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    bottom: 10,
  },
});
