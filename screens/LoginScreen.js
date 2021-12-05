import React, { useState,useEffect,useLayoutEffect } from 'react';
import { StyleSheet, Text, View,Image,TextInput, Button, KeyboardAvoidingView, ImageBackground } from 'react-native';
import {Ionicons,Entypo,FontAwesome} from "@expo/vector-icons"
import { auth } from '../firebase';
import firebase from "firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';
const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: ()=> null,
        title: "Login",
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        headerTitle: () => (
          <View
            style={{
              flex:1 ,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:'center',
            }}
          >
          <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:'10%'}}>Login</Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#6d071a',
          borderBottomLeftRadius:40,
          borderBottomRightRadius:40,
        },
      });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe =firebase.auth().onAuthStateChanged((authUser)=>{
            if(authUser && email!=="eddy@gmail.com"){
                navigation.replace("MainPage");
            }
        });
        return unsubscribe;
    }, []);
    const signIn = () => {
      if(email!=="eddy@gmail.com"){
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/network-request-failed") {
          setError("No internet connection" );
        } else if (error.code === "auth/wrong-password") {
          setError("Invalid Password");
        } else if (error.code === "auth/user-not-found") {
          setError("No user found\nKindly Register if you don't have an account");
        } else if (error.code === "auth/invalid-email") {
          setError("Email is badly formatted");
        }
      });
      if(error===""){
        navigation.navigate("MainPage")
        }
      }else{
        navigation.navigate("Admin");
      }
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
        style={styles.WineBottle}
        source = {require("../assets/wineSpill.jpg")}>
        <View style={{alignItems: 'center',
        flex: 1,
        justifyContent: 'center'}}>
        <View style={styles.firstInputContainer}>
          <Entypo name="email" size={20} color="#102F44" />
        <TextInput
        placeholder="Email"
        placeholderTextColor="#102F44"
        style={styles.textInput}
        onChangeText={(text)=>setEmail(text)}
      />
      </View>
      <View style={styles.inputContainer}>
      <Ionicons name="lock-closed" size={20} color="#102F44" />
      <TextInput
            secureTextEntry
            placeholder="Mot de Passe"
            placeholderTextColor="#102F44"
            style={styles.textInput}
            onChangeText={(text)=>setPassword(text)}
          />
          </View>
        <TouchableOpacity title="Login" style={styles.inputContainer} onPress={()=>signIn()}>
        <FontAwesome name="sign-in" size={24} color="black" />
        <Text style={styles.textInput}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity title="register" onPress={()=>navigation.navigate("Register")} style={styles.inputContainer}>
        <Entypo name="add-user" size={24} color="black" />
        <Text style={styles.textInput}>Enregister</Text>
        </TouchableOpacity>
      <View>
        <Text style={styles.error}>{error}</Text>
      </View>
        </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
       },
       
       WineBottle:{
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
      },    
      inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: "#102F44",
        borderRadius: 5,
        borderTopColor: "#102F44",
        borderRightColor: "#102F44",
        borderBottomColor: "#102F44",
        borderLeftColor: "#102F44",
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 10,
      },
      inputContainer1: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: "#102F44",
        borderRadius: 5,
        borderTopColor: "#102F44",
        borderRightColor: "#102F44",
        borderBottomColor: "#102F44",
        borderLeftColor: "#102F44",
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 10,
        width: '100%',
      },
      firstInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderTopColor: "#102F44",
        borderRightColor: "#102F44",
        borderBottomColor: "#102F44",
        borderLeftColor: "#102F44",
        paddingVertical: 5,
        marginTop: 50,
        marginBottom: 10,
      },
    textInput: {
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 10,
        color: "#102F44",
        fontSize: 15,
      },
      error: {
        color: "red",
        fontFamily: "Regular",
        fontSize: 15,
        textAlign: "center",
        marginTop: 15,
      },
})