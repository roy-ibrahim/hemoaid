import React, { useState } from "react";
import { ScrollView, Text, View, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { DataTable } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AddBloodTestScreen = () => {
  const [imagePath, setImagePath] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const userid = auth.currentUser.uid;
  const addInfo = async (dat) => {
    try {
      await setDoc(
        doc(db, "users", userid),
        {
          BloodTest: dat,
        },
        { merge: true }
      );
      console.log("adding info success");
    } catch (error) {
      console.error("Error adding info ", error);
    }
  };
  const parseData = (dataString) => {
    const rows = dataString.trim().split("\n");
    return rows.map((row) => {
      const [name, value, reference] = row.split(",");
      return { name, value, reference };
    });
  };


  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDMgSJdGzmNz7gAzO2jTTIZEIekXuwSuK0"
  );

  async function fileToGenerativePart(path, mimeType) {
    try {
      const base64Data = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      };
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }

  const apply = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt =
        "This is a blood test. extract the name, value and reference of each test done. make it in the format of name,value,reference and each test on a line. don't add another word.";

      const imagePart = await fileToGenerativePart(imagePath, "image/jpeg");

      if (!imagePart) {
        Alert.alert("Failed to read the image file.");
        return;
      }

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setAnswer(text);
      setParsedData(parseData(text));
      addInfo(parsedData);
    } catch (error) {
      console.error("Error generating content:", error);
      Alert.alert("Failed to generate content from the image.");
    }
    setLoading(false);
  };

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to choose an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePath(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        height: "100%",
      }}
    >
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <Text style={{fontSize: 30, fontWeight: "bold", marginBottom: 30}}>Add Your blood test</Text>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#3159f6",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={pickImage}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Import the test from your device (JPG Only)
          </Text>
        </TouchableOpacity>
        {imagePath && (
          <Text>
            Image imported successfully! Press Start to add the blood test
          </Text>
        )}
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#3159f6",
            top: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={apply}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Start processing
          </Text>
          {loading && <ActivityIndicator size="small" color="white" />}

        </TouchableOpacity>
        <DataTable style={{ top: 20 }}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Value</DataTable.Title>
            <DataTable.Title>Reference</DataTable.Title>
          </DataTable.Header>

          {parsedData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.value}</DataTable.Cell>
              <DataTable.Cell>{item.reference}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default AddBloodTestScreen;
