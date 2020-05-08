import React,{useState,useContext} from "react";
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity,Keyboard,ActivityIndicator} from "react-native";
import {Overlay} from "react-native-elements";
import firebase from "../configs/firebase.js";
import {Context} from '../context/BlogContext';
import {getData} from "../utils/firebase";
import {FontAwesome5} from "@expo/vector-icons" ;
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const LoginScreen = ({navigation})=>{
    const {setState} = useContext(Context);
    const [finalScreen,setFinalScreen] = useState(false);
    const [emailID,setemailID] = useState("");
    const [pass,setPass] = useState("");
    const [warning,setWarning] = useState("");
    return <View style = {styles.screenStyle}>
         <Overlay overlayStyle={{backgroundColor:"transparent",justifyContent:"center"}} fullScreen={true} isVisible={finalScreen} onBackdropPress={()=>{}}>
            <ActivityIndicator size="large" color="#B2983B"/>
        </Overlay>
        <Text style = {styles.headerStyle}>Welcome Back!</Text>
        <Text style = {styles.subHeaderStyle}>Login to continue</Text>
        <View style = {styles.inputStyle}>
            <TextInput style={styles.inputTextStyle} 
            placeholder="Email ID" 
            value = {emailID}
            onChangeText = {(newText)=>setemailID(newText)}
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
        <TouchableOpacity onPress ={()=>{setWarning("");navigation.navigate("PassReset")}} activeOpacity={0.5} style={styles.passStyle}>
            <Text style = {styles.passTextStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        {
            warning!==""?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>{warning} </Text>: null
        }
        <TouchableOpacity activeOpacity= {0.6} style = {styles.buttonStyle} onPress={()=>{
            setWarning("");
            Keyboard.dismiss();
            firebase.auth().signInWithEmailAndPassword(emailID,pass)
            .then(()=>{
                setFinalScreen(true);
                async function completeLogin(){
                        var emailVer = await firebase.auth().currentUser.emailVerified;
                        if(emailVer){
                            var userState = await getData();
                            setState(userState);
                            navigation.navigate("Index");
                        }
                        else{
                            setWarning("  Please verify your email !");
                            await firebase.auth().signOut();
                            setFinalScreen(false);
                        }
                }
                completeLogin();
            })
            .catch((error)=>{
                if(error.code==='auth/invalid-email')
                    setWarning("  Please enter a valid email!");
                else if(error.code==='auth/user-disabled')
                    setWarning("  Your account has been disabled . Contact the owner of this app for further info!");
                else if(error.code ==='auth/user-not-found')
                    setWarning("  No account with the mentioned email ID exists !");
                else if(error.code==='auth/wrong-password')
                    setWarning("  Password entered is incorrect!");  
                else {
                    setWarning("  Please make sure you are connected to the internet ! If the issue persists , contact the owner of the app!")
                }       
            })
            }}>
                <Text style = {styles.buttonTextStyle}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress = {()=>{setWarning("");navigation.navigate("Signup")}}>
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
        borderBottomWidth:1*wR,
        borderBottomColor : "#BEB184",
        fontSize : 15.9*wR,
        marginTop: -8*hR,
        marginRight : 51*wR,
        marginBottom : 17*hR,
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
    },
    warningStyle : {
        color : "#BEB184",
        marginTop : -10*hR,
        marginBottom : 13*hR,
        marginHorizontal : 0.13*Dimensions.get("window").width,
        fontSize : 16*wR,
        alignSelf:"flex-start"
    }
})
export default LoginScreen ;