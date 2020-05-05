import React,{useState} from "react";
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity} from "react-native";
import { NavigationEvents } from "react-navigation";
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const LoginScreen = ({navigation})=>{
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    return <View style = {styles.screenStyle}>
        <Text style = {styles.headerStyle}>Welcome Back!</Text>
        <Text style = {styles.subHeaderStyle}>Login to continue</Text>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Username" 
            value = {name}
            onChangeText = {(newText)=>setName(newText)}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholderTextColor = "#BEB184"
            />
        </View>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Password" 
            textContentType = "newPassword"
            value = {pass}
            onChangeText = {(newText)=>setPass(newText)}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholderTextColor = "#BEB184"
            secureTextEntry = {true}
            />
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.passStyle}>
            <Text style = {styles.passTextStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity= {0.6} style = {styles.buttonStyle} onPress={()=>{navigation.navigate("Index")}}><Text style = {styles.buttonTextStyle}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress = {()=>{navigation.navigate("Signup")}}>
            <Text style = {styles.footerStyle}>Create New Account</Text>
        </TouchableOpacity>    
    </View>
};

LoginScreen.navigationOptions = ()=>{
    return{
        headerShown : false 
    };
};

const styles = StyleSheet.create({
    screenStyle : {
        backgroundColor : "#0D0D0D",
        flex :1,
        alignItems : "center"
    },
    headerStyle : {
        color : "#B2983B",
        fontSize : 35*wR,
        marginTop : 140*hR,
    },
    subHeaderStyle : {
        color:"#B2983B",
        fontSize: 18*wR,
        marginBottom : 90*hR,
    },
    inputStyle : {
        backgroundColor : "#1D1D1D",
        borderRadius : 9*wR,
        borderColor : "#B2983B",
        borderWidth : 1*wR,
        width : "75%",
        aspectRatio : 294/45,
        marginBottom :20*hR,
        justifyContent : "center"
    },
    inputTextStyle : {
        color : "#BEB184" ,
        fontSize : 16*wR,
        marginLeft : 15*wR,
        flex : 1,
    },
    passTextStyle : {
        color : "#BEB184",
        fontSize : 15.9*wR,
        marginTop: -10*hR,
        marginRight : 51*wR,
        marginBottom : 15*hR,
    },
    passStyle : {
        alignSelf : "flex-end",
    },
    buttonStyle : {
        backgroundColor : "#B2983B",
        width : "75%",
        aspectRatio : 294/45,
        borderRadius : 9*wR, 
        alignItems : "center",
        justifyContent : "center",
    },
    buttonTextStyle : {
        fontSize : 17*wR,

    },
    footerStyle : {
        color : "#B2983B",
        fontSize : 17*wR,
        marginTop : 30*hR,
        borderBottomWidth : 1*wR,
        borderColor : "#B2983B"
    }
})
export default LoginScreen ;