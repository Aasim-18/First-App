import React, {useState} from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import * as yup from "yup"; 
import { Formik } from "formik";
import  BouncyCheckbox  from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const PasswordSchema = yup.object().shape({
  PasswordLength: yup.number()
  .min(4, "Password length should be at least 4 characters")
  .max(16, "Password length should not be greater than 16 characters")
  .required("Password length is required"),
})



function App() {
    const [password, setPassword] = useState("");
    const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

    const generatePasswordString = (passwordLength: number) => {
      let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength )

    setPassword(passwordResult)
    setIsPassGenerated(true)
    
    }








  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
      
    }
    return result;
  }
   const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
   }
    
  const styles = StyleSheet.create({
  // --- App Container ---
  appContainer: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark background for the whole app
  },
  formContainer: {
    margin: 16,
    padding: 8,
  },

  // --- Typography ---
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 40, // Increased spacing
    color: '#ffffff', // Set text color to white
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color: '#ffffff', // Set text color to white
  },
  description: {
    color: '#c7c7cc', // A slightly off-white for description
    marginBottom: 24, // Increased margin for better spacing
  },
  heading: {
    fontSize: 16, // Slightly larger for readability
    color: '#ffffff', // Set text color to white
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#ff453a', // A red that is visible on a dark background for errors
  },

  // --- Input and Controls ---
  inputWrapper: {
    marginBottom: 30, // Increased spacing
    alignItems: 'center',
    justifyContent: 'space-between', // Push label and input apart
    flexDirection: 'row', // Align input to right
  },
  inputColumn: {
    flexDirection: 'column',
    marginLeft: 1,
   justifyContent: 'space-between'
  },
  inputStyle: {
    padding: 10,
    width: 90, // Adjusted width for right-corner alignment
    borderWidth: 1,
    borderRadius: 4, // Less rounded corners
    borderColor: '#555555', // Visible border for dark mode
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#1e1e1e', // added to match dark background
  },

  // --- Switch / Checkbox Row ---
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // label left, checkbox right
    marginBottom: 25,
  },

  // --- Buttons ---
  formActions: {
    flexDirection: 'column', // stack vertically
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  primaryBtn: {
    marginHorizontal: 12,
    backgroundColor: '#2c2c2e',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  primaryBtnTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  secondaryBtn: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#8e8e93',
    fontSize: 16,
  },

  // --- Result Card ---
  card: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 24,
  },
  cardElevated: {
    backgroundColor: '#2c2c2e',
  },
  generatedPassword: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});





return (
   <ScrollView keyboardShouldPersistTaps = "handled">
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
       initialValues={{ PasswordLength: "" }}
       
       validationSchema={PasswordSchema}
       
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.PasswordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.PasswordLength && errors.PasswordLength && (
              <Text style={styles.errorText}>
                {errors.PasswordLength}
              </Text>
            )}
            <TextInput
            style={styles.inputStyle}
            value={values.PasswordLength}
            onChangeText={handleChange("PasswordLength")}
            placeholder='Ex. 8'
            keyboardType='numeric'
            />
            
          </View>
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include lowercase</Text>
         <BouncyCheckbox
          
          isChecked={lowerCase}
          onPress={ () => setLowerCase(!lowerCase) }
          fillColor='#29ABB7'
           style={{ marginLeft: 151, justifyContent: 'space-between' }}
          />
         </View>
          <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    style={{ marginLeft: 94, justifyContent: 'space-between' }}
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    style={{ marginLeft: 160, justifyContent: 'space-between' }}
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                   <BouncyCheckbox
                  style={{ marginLeft: 165, justifyContent: 'space-between' }}
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
         <View style={styles.inputWrapper}></View>
         <View style={styles.inputWrapper}></View>
         <View style={styles.inputWrapper}></View>

         <View style={styles.formActions}>
         <TouchableOpacity
         disabled={!isValid}
         style={styles.primaryBtn}
         onPress={handleSubmit}
         >
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.secondaryBtn}
         onPress={ ()=> {
          handleReset();
          resetPasswordState()
         }}
         >
          <Text style={styles.secondaryBtnTxt}>Reset</Text>
         </TouchableOpacity>
         </View>
         
         </>
       )}
     </Formik>
      </View>
      {isPassGenerated ? (
      <View style={[styles.card, styles.cardElevated]}>
        <Text style={styles.subTitle}>Result:</Text>
        <Text style={styles.description}>Long Press to Copy</Text>
        <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
      </View>
      ) : null}
    </SafeAreaView>
   </ScrollView>
  )

  

}






  




export default App;
