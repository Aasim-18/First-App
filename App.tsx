import React, {useState} from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import * as yup from "yup";

const PasswordSchema = yup.object().shape({
  PasswordLength: yup.number()
  .min(4, "Password length should be at least 4 characters")
  .max(16, "Password length should not be greater than 16 characters")
  .required("Password length is required"),
})



function App() {
 return <View>
  <Text style={styles.HeadingText}>Password Generator</Text>
  </View>
}

const styles = StyleSheet.create({
  HeadingText: {
    fontWeight: 700,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    
  }
})



export default App;
