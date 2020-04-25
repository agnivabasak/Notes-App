import React,{useState} from 'react' ;
import InputScrollView from 'react-native-input-scroll-view' ;
import {Text,TextInput,Button,View,StyleSheet,Dimensions,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard'
//The save button keeps getting pushed up in a crooked manner when the content is being entered
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const BlogPostForm = ({onSubmit,initialValues})=>{
    const [title,setTitle] = useState(initialValues.title);
    const [content,setContent] = useState(initialValues.content);
    return (<View style ={styles.note}>
        <TextInput style = {styles.titleInput} value={title} placeholder="Enter Title" placeholderTextColor="#000000" onChangeText = {newText=>setTitle(newText)} />
        <TextInput style ={styles.contentInput} value ={content} multiline ={true} placeholder="Enter notes about the title" placeholderTextColor="#000000" onChangeText = {newTerm=> setContent(newTerm)} />
        <TouchableOpacity onPress = {()=>onSubmit(title,content)}>
            <View style={styles.button}>
                <HideWithKeyboard>
                    <Text style = {styles.buttontext}>SAVE</Text>
                </HideWithKeyboard>
            </View>
        </TouchableOpacity>
    </View>
    )
}
//submit button : <Button title="Save" onPress = {()=>onSubmit(title,content)}/>

BlogPostForm.defaultProps = ({
initialValues : {title:"" ,content : ""}
});
const styles = StyleSheet.create({
    titleInput : {
        fontSize :20*wR,
        marginTop : 8*hR,
        marginHorizontal: 20*wR,
        paddingBottom : 1*hR,
        borderBottomWidth : 1.7*wR
    },
    contentInput : {
        fontSize :18*wR,
        marginHorizontal : 20*wR,
        marginVertical : 25*hR,
        height : "78%",
        textAlignVertical :"top",
    },
    note : {
        backgroundColor :"#B2983B",
        marginVertical :20*hR,
        marginHorizontal : 10*wR,
        borderRadius :6*wR,
        flex:1,
        paddingBottom : 10*hR
    },
    button : {
       backgroundColor : "black",
       alignSelf :"center",
       borderRadius  :10*wR,
    },
    buttontext : {
        color : "#B2983B",
        fontSize : 20*wR,
        marginVertical : 5*hR,
        marginHorizontal : 10*wR
    }
});

export default BlogPostForm; 