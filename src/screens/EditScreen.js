import React,{useContext} from 'react' ;
import {Text,View,StyleSheet} from 'react-native';
import BlogPostForm from '../components/BlogPostForm';
import {Context} from '../context/BlogContext';
const EditScreen = ({navigation})=>{
    const id =navigation.getParam("id");
    const {state,editBlogPost} = useContext(Context) ;
    const BlogPost = state.find((item)=>item.id === id);
    return<View>
        <Text>Edit Screen - {id}</Text> 
        <BlogPostForm initialValues = {{title: BlogPost.title , content : BlogPost.content}} 
            onSubmit = {(title,content)=>{
            editBlogPost(id,title,content,()=>{navigation.pop()});
        }} />
    </View> 
}

export default EditScreen ;