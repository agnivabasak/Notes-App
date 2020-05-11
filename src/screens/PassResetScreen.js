import React,{useState} from "react";
import {Text,TouchableOpacity,TextInput,StyleSheet,ActivityIndicator,View,Dimensions, Keyboard} from "react-native";
import {FontAwesome5} from "@expo/vector-icons" ;
import firebase from '../configs/firebase.js';
import {Overlay} from "react-native-elements";
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const PassResetScreen = ({navigation})=>{
    const [emailID,setEmailID]=useState("");
    const [finalScreen,setFinalScreen] = useState(false);
    const [loadScreen,setLoadScreen] = useState(false);
    const [warning,setWarning] = useState("");
    return (
        <View style ={styles.screenStyle}>
            <Overlay overlayStyle={{backgroundColor:"transparent",justifyContent:"center",alignItems:"center",marginTop:88*hR}} fullScreen={true} isVisible={finalScreen} onBackdropPress={()=>{}}>
                <ActivityIndicator size="large" color="#B2983B"/>
                <Text style={{color:"#B2983B",fontSize:18*wR,backgroundColor:"#0D0D0D",padding:5*wR,borderRadius:9*wR,marginTop:30*hR}}>{`Password reset email has been sent !\nRedirecting to Login screen...`}</Text>
            </Overlay>
            <Overlay overlayStyle={{backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}} fullScreen={true} isVisible={loadScreen} onBackdropPress={()=>{}}>
                <ActivityIndicator size="large" color="#B2983B"/>
            </Overlay>
            <Text style={styles.headerStyle}>Reset Password</Text>
            <View style={styles.inputStyle}>
                <TextInput style={styles.inputTextStyle}
                     placeholder="Email ID" 
                     value = {emailID}
                     onChangeText = {(newText)=>setEmailID(newText)}
                     autoCapitalize = "none"
                     autoCorrect = {false}
                     placeholderTextColor = "#BEB184"
                />
            </View>
            {
            warning!==""?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>{warning} </Text>: null
            }
            <TouchableOpacity activeOpacity= {0.6} style = {styles.buttonStyle} onPress={()=>{
                setWarning("");
                setLoadScreen(true);
                firebase.auth().sendPasswordResetEmail(emailID)
                .then(()=>{
                    setLoadScreen(false);
                    Keyboard.dismiss();
                    setFinalScreen(true);
                    setTimeout(function(){
                        navigation.navigate("Login");
                    },3000);
                })
                .catch(function(error){
                    if(error.code==='auth/invalid-email')
                    {
                        setWarning("  Please enter a valid email ID !");
                    }
                    else if(error.code==='auth/user-not-found')
                    {
                        setWarning("  No account with the mentioned email ID exists !")
                    }
                    else{
                        setWarning("  Please make sure you are connected to the internet ! If the issue persists , please contact the owner of the app ! ")
                    }
                    setLoadScreen(false);
                })
            }}>
                <Text style = {styles.buttonTextStyle}>SEND EMAIL</Text>
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.5} onPress={()=>navigation.navigate("Login")}>
                <Text style={styles.footerStyle}>Go back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

PassResetScreen.navigationOptions = ()=>{
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
        marginTop : 220*hR,
    },
    inputStyle : {
        backgroundColor : "#1D1D1D",
        borderRadius : 9*wR,
        borderColor : "#B2983B",
        borderWidth : 1*wR,
        width : "75%",
        aspectRatio : 294/45,
        marginTop :65*hR,
        justifyContent : "center"
    },
    inputTextStyle : {
        color : "#BEB184" ,
        fontSize : 16*wR,
        marginLeft : 15*wR,
        flex : 1,
    },
    buttonStyle : {
        backgroundColor : "#B2983B",
        width : "75%",
        aspectRatio : 294/45,
        borderRadius : 9*wR, 
        alignItems : "center",
        marginTop : 26*hR,
        justifyContent : "center",
    },
    buttonTextStyle : {
        fontSize : 17*wR,

    },
    footerStyle : {
        color : "#B2983B",
        fontSize : 17*wR,
        marginTop : 50*hR,
        borderBottomWidth : 1*wR,
        borderColor : "#B2983B"
    },
    warningStyle : {
        color : "#BEB184",
        marginTop : 10*hR,
        marginBottom: -10*hR,
        marginHorizontal : 0.13*Dimensions.get("window").width,
        fontSize : 16*wR,
        alignSelf:"flex-start"
    }
});

export default PassResetScreen;