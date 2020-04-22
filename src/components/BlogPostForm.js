import React,{useState} from 'react' ;
import {Text,TextInput,Button,View,StyleSheet} from 'react-native';

const BlogPostForm = ({onSubmit,initialValues})=>{
    const [title,setTitle] = useState(initialValues.title);
    const [content,setContent] = useState(initialValues.content);
    return (<View>
        <Text style= {styles.Label}>Enter Title : </Text>
        <TextInput style = {styles.Input} value={title} onChangeText = {newText=>setTitle(newText)} />
        <Text style ={styles.Label}>Enter Content : </Text>
        <TextInput style ={styles.Input} value ={content} onChangeText = {newTerm=> setContent(newTerm)} />
        <Button title="Save Blog Post" onPress = {()=>onSubmit(title,content)}/>
    </View>
    )
}

BlogPostForm.defaultProps = ({
initialValues : {title:"" ,content : ""}
});
const styles = StyleSheet.create({
    Label : {
        fontSize  :20,
        fontWeight : 'bold',
        marginBottom : 5
    },
    Input : {
        fontSize :20,
        borderWidth : 1,
        borderColor : 'black',
        marginBottom : 15,
        padding :5,
        margin :5
    }
});

export default BlogPostForm; 