import React from 'react'
import { View, Text, TextInput, Button, Image, ScrollView } from 'react-native'
import { SigninUserData, routeProps } from '../../../constants/AllTypes';

import { useState } from 'react';
import { styles } from '../../../constants/GlobalStyle';
import { authstyles } from '../authStyle';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { notify } from '../../../constants/GlobalStyle';
import { AUTH_STACK_SCREEN } from '../../../constants/Navigation';
import { Google, LargLogo } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
const initialState = { email: "", password: "" }


export default function Login({ navigation }: routeProps) {
  const [loading, setisloading] = useState(false)
  const [state, setState] = useState(initialState)

  const handleChange = (name: string, value: string): void => {
    setState((s) => ({ ...s, [name]: value }));
  };
  const handleSubmite = () => {


    const { email, password } = state
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) {
      return notify("plz Enter Email", " formate like: abc@gmail.com", "error");
    }
    if (!validRegex.test(email)) {
      return notify("Invalid Email Format", " formate like: abc@gmail.com", "error");
    }

    if (password.length < 6) {
      return notify("Invalid Password", "Password length minimum 6 character", "error");
    }
    let userData = { email, password }
    setisloading(true)
    createUser(userData)
    setState(initialState)

  }
  const createUser = (userData: SigninUserData): void => {

    auth().signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        notify("User Login Successfully!", "wellcome to instagramMeToYou app", "success");
        setisloading(false)
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false)
          return notify("Email Error", "That email address is already register!", "error");
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false)
          return notify("Email|Password Error", "plz try again", "error");
        }
        setisloading(false)
        return notify("Email|Password Error", "plz try again", "error");
      });

  }

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
  
      // Notify after successful sign-in
      notify("Login With Google", "User Login Successfully", "error");
    } catch (error:FirebaseAuthTypes.NativeFirebaseError) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle user cancellation
        console.log('Google Sign In canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Error during Google Sign In:', error);
      }
    }
  };
  

  return (

    <View style={[styles.flexContainer]}>
      <ScrollView >
        <View style={[styles.horizantalyCenter, authstyles.textLogo]}>
          <LargLogo/>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <TextInput
            style={styles.formControl}
            placeholder='Enter your email'
            placeholderTextColor={"#D1D3D4"}
            keyboardType='email-address'
            value={state.email}
            onChangeText={(value: string) => handleChange("email", value)}
          />
          <TextInput
            style={styles.formControl}
            placeholder='Enter your password'
            placeholderTextColor={"#D1D3D4"}
            value={state.password}
            secureTextEntry
            onChangeText={(value: string) => handleChange("password", value)}
          />
        </View>
        <View style={[styles.flexEnd]}>
        <Text style={authstyles.forget} onPress={() => { navigation.navigate(AUTH_STACK_SCREEN.FORGOT_PASSWORD) }}>Forgot password?</Text>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <View style={{ width: "90%" }}>
            {loading ?
              <Button title='loading...'
                disabled={true}
              />
              :
              <Button
                title='Log In'

                onPress={handleSubmite}
              />

            }
          </View>
        </View>
        <View style={[styles.horizantalyCenter]}>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 30 }}>
            <Google width= "16.67" height= "16.67" style={{ marginHorizontal: 10,  }} />
            <Text style={[styles.fontL,styles.fontWeightXl,styles.SpacingM,{textAlign:"center",color:Colors.textclr}]} onPress={handleGoogleSignin}>Login with Google</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginVertical: 5 }}>
            <View style={[authstyles.line]}></View>
            <Text style={[styles.fontSm,styles.fontWeightXl, styles.SpacingSm,{textAlign:"center",color:Colors.textLight}]}>OR</Text>
            <View style={[authstyles.line]}></View>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Text style={[styles.fontL,styles.fontWeightM,styles.SpacingM,{textAlign:"center",color:Colors.textLight}]}>Don't have an account.<Text style={authstyles.forget} onPress={() => { navigation.navigate(AUTH_STACK_SCREEN.SIGNUP) }} >Sign up.</Text></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}