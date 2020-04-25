import createDataContext from './createDataContext';

const BlogReducer = (state,action) =>{
    switch(action.type)
    {
        case 'add_BlogPost' : return [{check : false ,title :action.payload.title,content :action.payload.content,id : state.length+1,lastModified:action.payload.lastModified},...state] ;
        case 'delete_BlogPost' :
             {const state2 = state.filter((blogPost)=> blogPost.id !== action.payload) ;//maintaining the ids based on indexes even after deleeting
                return state2.map((curval,index)=>{
                    curval.id = state2.length -index;
                    return curval;
                })
            }
            //making sure if a note is edited ,it becomes the first element of the array state and the id is changed accordingly
        case 'edit_BlogPost' : {
            state2 =state.filter((blogPost)=> blogPost.id !== action.payload.id);
            state3 = [action.payload,...state2];
            return state3.map((curval,index)=>{
                curval.id = state3.length -index;
                return curval;
            })
        }
        case "delete_MultipleBlogPosts" : {
            const state2 = state.filter((blogPost)=> !blogPost.check) ;//maintaining the ids based on indexes even after deleeting
                return state2.map((curval,index)=>{
                    curval.id = state2.length -index;
                    return curval;
                })
        }
        case "check_reverse" : {
            return state.map((curval)=>{
                if(curval.id===action.payload)
                    curval.check = !curval.check;
                return curval;    
            })
        }
        case "uncheck_all" : {
            return state.map((curval)=>{
                curval.check = false;
                return curval;
            })
        }
        default : return state ;
    }
} ;
const addBlogPost = (dispatch)=>{
    return (title,content,lastModified,callback)=>{dispatch({type : 'add_BlogPost',payload : {title,content,lastModified}})
    if(callback) callback();        
};
};

const deleteBlogPost = (dispatch)=>{
    return (id)=>{
        dispatch({type: 'delete_BlogPost',payload : id})
    };
};

const editBlogPost = (dispatch)=>{
    return (id,title,content,lastModified,callback)=>{dispatch({type :'edit_BlogPost',payload : {id,title,content,lastModified}})
    if(callback) callback();}
};

const deleteMultipleBlogPosts = (dispatch)=>{
    return ()=>{
        dispatch({type: "delete_MultipleBlogPosts"})
    };
};
const uncheckall = (dispatch)=>{
    return ()=>{
        dispatch({type:"uncheck_all"})
    };
};
const checkreverse = (dispatch)=>{
    return (id)=>{
        dispatch({type : "check_reverse",payload :id})
    };
};

export const {Context,Provider} = createDataContext(BlogReducer,{addBlogPost,deleteBlogPost,editBlogPost,uncheckall,deleteMultipleBlogPosts,checkreverse},[]);