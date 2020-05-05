import React,{useState} from "react";
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity} from "react-native";
import {FontAwesome5} from "@expo/vector-icons" ;
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");//digit,lowercase,uppercase,atleast 8char
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var nameRegex = /^[_a-zA-z][_a-zA-Z0-9]*$/
const SignupScreen = ({navigation})=>{
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [confirmPass,setConfirmPass] = useState("");
    const [emailID,setEmailId] = useState("");
    const [lengthWarning,setLengthWarning] = useState(false);
    const [randomnessWarning,setRandomnessWarning] = useState(false);
    const [matchWarning,setMatchWarning] = useState(false);
    const [infoWarning,setInfoWarning] = useState(false);
    const [emailWarning,setEmailWarning] = useState(false);
    const [nameWarning,setNameWarning] = useState(false);
    return <View style = {styles.screenStyle}>
        <Text style = {styles.headerStyle}>Create New Account</Text>
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
            placeholder="Email Id" 
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
            lengthWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  A password must contain atleast 8 characters !</Text>:null
        }
        {randomnessWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  A password should contain atleast a lowercase letter,an uppercase letter
        and a digit !</Text>:null}
        {
            matchWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  The password and the confirmation password do not match !</Text>:null
        }
        {
            infoWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  Please enter all the above fields !</Text>:null
        }
        {
            emailWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  Please enter a valid email id !</Text>:null
        }
        {
            nameWarning?<Text style={styles.warningStyle}><FontAwesome5 name="exclamation-circle" color = "#BEB184" size={15}/>  An username must begin with a letter or underscore and it can only contain letters,underscore and digits!</Text>:null
        }
        <TouchableOpacity
        onPress = {()=>{
            setRandomnessWarning(false);
            setLengthWarning(false);
            setMatchWarning(false);
            setInfoWarning(false);
            setEmailWarning(false);
            setNameWarning(false);
            if(pass==="" || name==="" || emailID==="" ||confirmPass===""){
                setInfoWarning(true);
            }
            else if(!nameRegex.test(name))
            {
                setNameWarning(true);
            }
            else if(!emailRegex.test(emailID))
            {
                setEmailWarning(true);
            }
            else if(pass.length<8)
            {
                setLengthWarning(true);
            }
            else if(!strongRegex.test(pass))
                {
                    setRandomnessWarning(true);
                }
            else if(pass!==confirmPass)
            {
                setMatchWarning(true);
            }  
        }}
        activeOpacity= {0.6} style = {styles.buttonStyle}>
            <Text style = {styles.buttonTextStyle}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress ={()=>{navigation.navigate("Login")}} activeOpacity={0.5}>
            <Text style = {styles.footerStyle}>Already have an account? Login</Text>
        </TouchableOpacity>    
    </View>
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
        marginTop : 105*hR,
        marginBottom : 60*hR,
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