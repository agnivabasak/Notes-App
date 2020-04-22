import React,{useContext} from 'react';
import {Text,View,StyleSheet,FlatList,Button,TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons' ;
const IndexScreen = ({navigation})=>{
    const {state,addBlogPost,deleteBlogPost} = useContext(Context);
    return <View>
        <FlatList
        data={state}
        keyExtractor = {(item)=>item.title}
        renderItem = {({item}) =>{ return ( 
            <TouchableOpacity onPress = {()=>navigation.navigate("Show",{id : item.id})}>
            <View style ={styles.row}>
            <Text style = {styles.title}>{item.title} - {item.id}</Text>
            <TouchableOpacity onPress = {()=>deleteBlogPost(item.id)}>
            <Feather name="trash-2" style={styles.icon} />
            </TouchableOpacity>
            </View>
            </TouchableOpacity>
        )
         }
         }
        />
    </View>
}

IndexScreen.navigationOptions = ({navigation})=>{
    return{
        headerRight : ()=>{
            return (
                <TouchableOpacity onPress={()=> navigation.navigate("Create")}>
                <Feather name = "plus" size ={30} />
                </TouchableOpacity>
            )
        }
    };
};
const styles = StyleSheet.create({
    row: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        //marginVertical :10,
       paddingVertical :20,
       paddingHorizontal : 10,
        borderBottomWidth :1,
        //borderTopWidth :1,
        borderColor : 'gray'
    },
    title : {
        fontSize :18
    },
    icon : {
        fontSize : 24
    }
})
export default IndexScreen ;