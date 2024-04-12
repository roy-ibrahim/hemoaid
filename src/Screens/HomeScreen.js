import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, margin: 10,}}>
      <View>
      <Text>Welcome Back! Roy Ibrahim 👋</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})