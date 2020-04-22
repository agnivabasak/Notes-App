import createDataContext from './createDataContext';

const BlogReducer = (state,action) =>{
    switch(action.type)
    {
        case 'add_BlogPost' : return [...state,{title :action.payload.title,content :action.payload.content,id : Math.floor(Math.random()*10000)}] ;
        case 'delete_BlogPost' : return state.filter((blogPost)=> blogPost.id !== action.payload) ;
        case 'edit_BlogPost' : return state.map((BlogPost)=>{
            if(BlogPost.id === action.payload.id) 
            {
                return action.payload;
            }
            else return BlogPost;
        })
        default : return state ;
    }
} ;
const addBlogPost = (dispatch)=>{
    return (title,content,callback)=>{dispatch({type : 'add_BlogPost',payload : {title,content}})
    if(callback) callback();        
};
};

const deleteBlogPost = (dispatch)=>{
    return (id)=>{
        dispatch({type: 'delete_BlogPost',payload : id})
    };
};

const editBlogPost = (dispatch)=>{
    return (id,title,content,callback)=>{dispatch({type :'edit_BlogPost',payload : {id,title,content}})
    if(callback) callback();}
};
export const {Context,Provider} = createDataContext(BlogReducer,{addBlogPost,deleteBlogPost,editBlogPost},[{title :"TEST POST",content : "TEST CONTENT",id:1}]);