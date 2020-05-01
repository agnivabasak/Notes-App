import createDataContext from './createDataContext';
import {getData,updateData} from "../utils/firebase";
const BlogReducer = (state,action) =>{
    switch(action.type)
    {
        case 'add_BlogPost' :{ const state2 = [{check : false ,title :action.payload.title,content :action.payload.content,id : state.length+1,lastModified:action.payload.lastModified},...state] ;
                                updateData(state2);                        
                                return state2  ;}
        case 'delete_BlogPost' :
             {const state2 = state.filter((blogPost)=> blogPost.id !== action.payload) ;//maintaining the ids based on indexes even after deleeting
                const state3= state2.map((curval,index)=>{
                    curval.id = state2.length -index;
                    return curval;
                })
                updateData(state3);
                return state3 ;
            } 
            //making sure if a note is edited ,it becomes the first element of the array state and the id is changed accordingly
        case 'edit_BlogPost' : {
            state2 =state.filter((blogPost)=> blogPost.id !== action.payload.id);
            state3 = [action.payload,...state2];
            const state4 = state3.map((curval,index)=>{
                curval.id = state3.length -index;
                return curval;
            })
            updateData(state4);
            return state4;
        }
        case "delete_MultipleBlogPosts" : {
            const state2 = state.filter((blogPost)=> !blogPost.check) ;//maintaining the ids based on indexes even after deleeting
            const state3= state2.map((curval,index)=>{
                    curval.id = state2.length -index;
                    return curval;
                })
            updateData(state3);
                return state3;
        }
        case "check_reverse" : {
            const state2 = state.map((curval)=>{
                if(curval.id===action.payload)
                    curval.check = !curval.check;
                return curval;    
            })
            updateData(state2);
            return state2;
        }
        case "uncheck_all" : {
            state2= state.map((curval)=>{
                curval.check = false;
                return curval;
            })
            updateData(state2);
            return state2;
        }
        default : return state ;
    }
} ;
const addBlogPost = (dispatch)=>{
    return (title,content,lastModified,callback)=>{
        dispatch({type : 'add_BlogPost',payload : {title,content,lastModified}
    })
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
export const {Context,Provider} = createDataContext(BlogReducer,{addBlogPost,deleteBlogPost,editBlogPost,uncheckall,deleteMultipleBlogPosts,checkreverse},getData());