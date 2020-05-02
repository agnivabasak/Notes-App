import React,{useContext,useEffect} from 'react';
import { View,Text,StyleSheet,ActivityIndicator,Dimensions} from 'react-native';
import {TransitionPresets} from "react-navigation-stack";
import {Context} from '../context/BlogContext';
import {Ionicons} from "@expo/vector-icons";
import {getData} from "../utils/firebase";
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const SplashScreen = ({navigation})=>{
    const {setState} = useContext(Context);
    useEffect(()=>{
        async function SplashScreenJob(){
            async function initializeState(){
                newState = await getData();
                setState(newState);
            }
            await initializeState();
            navigation.navigate("Index");
        }
        SplashScreenJob();
    }
    ,[]);
    return <View style = {styles.screenStyle}>
        <Text style ={styles.headerStyle}>NOTES APP</Text>
        <ActivityIndicator size="large" color="#B2983B"/>
        <View style={{position :"absolute",bottom :15*hR}}>
             <Text style={styles.footerTextStyle}>Made with <Ionicons name="ios-heart" size={18*wR} color= "#DB4437"/> in quarantine</Text>
        </View>
    </View>
};

const styles = StyleSheet.create({
    footerTextStyle : {
        color : "#B2983B",
        fontSize : 18*wR,
        fontFamily :"monospace"
    },
    screenStyle : {
        backgroundColor : "#0D0D0D",
        justifyContent :"center",
        alignItems :"center",
        flex:1
    },
    headerStyle : {
        color : "#B2983B",
        fontSize : 40*wR,
        fontFamily : "normal",
        marginBottom :40*hR,
        fontWeight : "normal"
    },
})

SplashScreen.navigationOptions = ()=>{
    return{
        headerShown : false 
    };
};
export default SplashScreen;