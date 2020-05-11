import React,{useState,useContext} from "react";
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity,Keyboard,ActivityIndicator} from "react-native";
import {Overlay} from "react-native-elements";
import {FontAwesome5} from "@expo/vector-icons" ;
import {getData} from "../utils/firebase";
import {Context} from '../context/BlogContext';
import firebase from "../configs/firebase.js";
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");//digit,lowercase,uppercase,atleast 8char
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const SignupScreen = ({navigation})=>{
    const {setState} = useContext(Context);
    const [pass,setPass] = useState("");
    const [finalScreen,setFinalScreen] = useState(false);
    const [confirmPass,setConfirmPass] = useState("");
    const [emailID,setEmailId] = useState("");
    const [warning,setWarning] = useState("");
    const [loadScreen,setLoadScreen] = useState(false);
    return (
        <View style = {styles.screenStyle}>
        <Overlay overlayStyle={{backgroundColor:"transparent",justifyContent:"center",alignItems:"center",marginTop:63*hR}} fullScreen={true} isVisible={finalScreen} onBackdropPress={()=>{}}>
            <ActivityIndicator size="large" color="#B2983B"/>
            <Text style={{color:"#B2983B",fontSize:18*wR,backgroundColor:"#0D0D0D",padding:5*wR,borderRadius:9*wR,marginTop:30*hR}}>Please verify your email ID and then log in </Text>
        </Overlay>
        <Overlay overlayStyle={{backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}} fullScreen={true} isVisible={loadScreen} onBackdropPress={()=>{}}>
            <ActivityIndicator size="large" color="#B2983B"/>
        </Overlay>
        <Text style = {styles.headerStyle}>Create New Account</Text>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Email ID" 
            value = {emailID}
            onChangeText = {(newText)=>setEmailId(newText)}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholderTextColor = "#BEB184"
            />
        </View>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Password" 
            value = {pass}
            onChangeText = {(newText)=>setPass(newText)}
            autoCapitalize = "none"
            autoCorrect = {false}
            placeholderTextColor = "#BEB184"
            secureTextEntry = {true}
            />   
        </View>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Confirm Password" 
            value = {confirmPass}
            onChangeText = {(newText)=>setConfirmPass(newText)}
            autoCapitalize = "none"
            autoCorrect = {true}
            placeholderTextColor = "#BEB184"
            secureTextEntry = {true}
            />
        </View>
        {
            warning!==""?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>{warning} </Text>: null
        }
        <TouchableOpacity
        onPress = {()=>{
            setWarning("");
            Keyboard.dismiss();
            if(pass==="" || emailID==="" ||confirmPass===""){
                setWarning("  Please enter all the above fields !");
            }
            else if(!emailRegex.test(emailID))
            {
                setWarning("  Please enter a valid email id !");
            }
            else if(pass.length<8)
            {
                setWarning("  A password must be atleast 8 characters long !");
            }
            else if(!strongRegex.test(pass))
                {
                    setWarning("  A password should contain atleast a lowercase letter,an uppercase letter and a digit !");
                }
            else if(pass!==confirmPass)
            {
                setWarning("  The password and the confirmation password do not match !");
            }  
            else{
                setLoadScreen(true);
                firebase.auth().createUserWithEmailAndPassword(emailID,pass)
                .then(()=>{
                    setLoadScreen(false);
                    setFinalScreen(true);
                    async function completeSignUp(){
                            await firebase.auth().currentUser.sendEmailVerification().catch((error)=>console.log(error));
                            await firebase.auth().signOut();
                            setTimeout(function(){
                                navigation.navigate("Login");
                            },3000);
                    }
                    completeSignUp();
                })
                .catch((error)=>{
                    if(error.code==='auth/email-already-in-use')
                        setWarning("  The email ID is already in use !");
                    else if(error.code==='auth/invalid-email')
                        setWarning("  Please enter a valid email id !");  
                    else if(error.code==='auth/operation-not-allowed')
                        setWarning("  There is something wrong with the servers ! Please let the owner of this app know about this issue if it persists!");
                    else {
                        setWarning("  Please make sure you are connected to the internet ! If the issue persists , please contact the owner of the app !")
                    }    
                    setLoadScreen(false);
                });
            }
        }}
        activeOpacity= {0.6} style = {styles.buttonStyle}>
            <Text style = {styles.buttonTextStyle}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress ={()=>{setWarning("");navigation.navigate("Login")}} activeOpacity={0.5}>
            <Text style = {styles.footerStyle}>Already have an account? Login</Text>
        </TouchableOpacity>    
    </View>)
};

SignupScreen.navigationOptions = ()=>{
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
        fontSize : 32*wR,
        marginTop : 135*hR,
        marginBottom : 80*hR,
    },
    subHeaderStyle : {
        color:"#B2983B",
        fontSize: 32*wR,
        marginBottom : 70*hR,
    },
    inputStyle : {
        backgroundColor : "#1D1D1D",
        borderRadius : 9*wR,
        borderColor : "#B2983B",
        borderWidth : 1*wR,
        width : "75%",
        aspectRatio : 294/45,
        marginBottom :20*hR,
        justifyContent : "center",
    },
    inputTextStyle : {
        color : "#BEB184" ,
        fontSize : 16*wR,
        marginLeft : 15*wR,
        maxWidth : "80%",
        flex:1,
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
        marginTop : 24
    },
    buttonTextStyle : {
        fontSize : 17*wR,

    },
    footerStyle : {
        color : "#B2983B",
        fontSize : 17*wR,
        marginTop : 48*hR,
        borderBottomWidth : 1*wR,
        borderColor : "#B2983B"
    },
    warningStyle : {
        color : "#BEB184",
        marginVertical : -6*wR,
        marginHorizontal : 0.13*Dimensions.get("window").width,
        fontSize : 16*wR,
        alignSelf:"flex-start"
    }
})
export default SignupScreen ;