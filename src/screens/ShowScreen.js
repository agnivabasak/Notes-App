import React,{useContext} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native' ;
import {Context} from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';
const ShowScreen = ({navigation})=>{
    const {state} = useContext(Context) ;
    const blogpost = state.find((blog)=>blog.id ===navigation.getParam("id"));
    return <View>
        <Text>Show Screen</Text>
        <Text>{blogpost.title}</Text>
        <Text>{blogpost.content}</Text>
    </View>
};

const styles = StyleSheet.create({

});

ShowScreen.navigationOptions = ({navigation}) =>{
    return {
    headerRight : ()=>{
        return (
            <TouchableOpacity onPress ={()=>navigation.navigate('Edit',{id : navigation.getParam("id")})}>
                <EvilIcons name="pencil" size= {35} />
            </TouchableOpacity>
        )
    }
    }
}

export default ShowScreen ;