import React,{useState,useContext} from 'react';
import {Text,View,StyleSheet,TextInput,Button,Dimensions} from 'react-native' ;
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio

const CreateScreen = ({navigation})=>{
    const {addBlogPost} = useContext(Context);
    return <View style ={styles.screen}>
        <BlogPostForm onSubmit = {(title,content)=>{
        addBlogPost(title,content,
            {date : new Date().getDate(),month : new Date().getMonth() +1,year : new Date().getFullYear(),
                hours : new Date().getHours(),minutes : new Date().getMinutes()},
            ()=>{navigation.navigate("Index")});}
        }
        />
        </View>
};

const styles = StyleSheet.create({
    screen : {
        borderTopWidth : 1.7*wR,
        borderTopColor : "#BEB184",
        backgroundColor : "#1D1D1D",
        flex :1
    }
});

CreateScreen.navigationOptions =()=>{
    return {
        headerTitleStyle : {color : "#B2983B",fontSize : 26*wR,fontFamily :"Roboto",marginLeft: 77*wR }
    }
}

export default CreateScreen ;