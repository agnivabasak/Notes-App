import React,{useContext} from 'react' ;
import {Text,View,StyleSheet,Dimensions} from 'react-native';
import BlogPostForm from '../components/BlogPostForm';
import {Context} from '../context/BlogContext';
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const EditScreen = ({navigation})=>{
    const id =navigation.getParam("id");
    const {state,editBlogPost} = useContext(Context) ;
    const BlogPost = state.find((item)=>item.id === id);
    return<View style = {styles.background}>
        <BlogPostForm initialValues = {{title: BlogPost.title , content : BlogPost.content}} 
            onSubmit = {(title,content)=>{
            editBlogPost(id,title,content,
                {date : new Date().getDate(),month : new Date().getMonth() +1,year : new Date().getFullYear(),
                    hours : new Date().getHours(),minutes : new Date().getMinutes()},
                ()=>{navigation.navigate("Show",{id:state.length})});
        }} />
    </View> 
}

EditScreen.navigationOptions = ()=>{
    return {
        headerTitleStyle : {color : "#B2983B",fontSize : 26*wR,fontFamily :"Roboto",marginLeft: 77*wR }
    }
}
const styles = StyleSheet.create({
    background :{
        borderTopWidth : 1.7*wR,
        borderTopColor : "#BEB184",
        backgroundColor : "#1D1D1D",
        flex :1
    },
})
export default EditScreen ;