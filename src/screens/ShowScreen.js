import React,{useContext} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Dimensions,ScrollView} from 'react-native' ;
import {Context} from '../context/BlogContext';
import {Foundation} from '@expo/vector-icons';
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const ShowScreen = ({navigation})=>{
    const {state} = useContext(Context) ;
    const blogpost = state.find((blog)=>blog.id ===navigation.getParam("id"));
    let indicator = "AM";let hour;
    if(blogpost.lastModified.hours>12) indicator = "PM";
    if(blogpost.lastModified.hours>12)hour = Number(blogpost.lastModified.hours) -12;
    else hour = Number(blogpost.lastModified.hours);
    return (
        <View style = {styles.background}>
            <View style ={styles.note}>
                <Text style = {styles.title}>{blogpost.title}</Text>
                <Text style= {styles.updatedinfo}>Last updated on {blogpost.lastModified.date}.{blogpost.lastModified.month}.{blogpost.lastModified.year} , {hour}:{blogpost.lastModified.minutes} {indicator}</Text>
                <ScrollView style ={styles.contentScroll}>
                <Text style ={styles.content}>{blogpost.content}</Text>
                </ScrollView>
            </View>
        </View>
    )
};


ShowScreen.navigationOptions = ({navigation}) =>{
    return {
     headerTitleStyle : {color : "#B2983B",fontSize : 26*wR,fontFamily :"Roboto",marginLeft: 77*wR },
    headerRight : ()=>{
        return (
            <TouchableOpacity onPress ={()=>navigation.navigate('Edit',{id : navigation.getParam("id")})}>
                <Foundation name="pencil" style={{marginRight : 15*wR}} size= {30*wR} color ="#B2983B"/>
            </TouchableOpacity>
        )
    }
    }
}

const styles = StyleSheet.create({
    background :{
        borderTopWidth : 1.7*wR,
        borderTopColor : "#BEB184",
        backgroundColor : "#1D1D1D",
        flex :1
    },
    title : {
        fontSize :20*wR,
        marginTop : 8*hR,
        marginHorizontal: 20*wR,
        paddingBottom : 1*hR,
        borderBottomWidth : 1.7*wR
    },
    updatedinfo : {
        marginLeft: 20*wR,
        color : "#333026"
    },
    content: {
        fontSize :18*wR,
    },
    contentScroll : {
        marginHorizontal : 20*wR,
        marginVertical : 25*hR,
        height : "80%"
    },
    note : {
        backgroundColor :"#B2983B",
        marginVertical :20*hR,
        marginHorizontal : 10*wR,
        borderRadius :6*wR,
        flex:1,
    },
})
export default ShowScreen ;