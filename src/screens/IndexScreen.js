import React,{useContext,useState,useEffect} from 'react';
import {Text,View,StyleSheet,FlatList,Button,TouchableOpacity,Image,TextInput,StatusBar,Dimensions} from 'react-native';
import {Context} from '../context/BlogContext';
import {AntDesign,Feather,SimpleLineIcons,Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons' ;
import {getData} from "../utils/firebase";
const wR = Dimensions.get("window").width/392.72727272727275; //width ratio
const hR = Dimensions.get("window").height/776; //height ratio
const IndexScreen = ({navigation})=>{
    const {state,checkreverse,deleteMultipleBlogPosts,uncheckall,setState,addBlogPost} = useContext(Context);
    const [search,setSearch] = useState("");
    const [show,setShow] = useState(false);
    useEffect(()=>{
        async function initializeState(){
            newState = await getData();
            setState(newState);
        }
        initializeState();
    }
    ,[]);
    if(state.length===0)
    {
        return  <View style = {styles.screenfornonotes}>
            <Text style ={styles.nonotes}>YOU DO NOT HAVE ANY{'\n'}NOTES CURRENTLY</Text>
        </View>
    }
    const state2 = state.filter((curval)=> (curval.title.toUpperCase()).indexOf(search.toUpperCase())!==-1 || (curval.content.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
    return <View style = {styles.screen}>
        <View style = {{...styles.search,opacity : show?0.6 :1}}>
        <Ionicons name="ios-search" size= {28*wR} color = "#BEB184" />
        {show?<Text style ={{fontSize : 20*wR,marginLeft : 10*wR,flex :1,color : "#BEB184",marginBottom:3*hR}}>{search===""?"SEARCH":search}</Text> : 
        <TextInput 
            autoCapitalize ="none"
            autoCorrect = {false}
            value = {search}
            onChangeText = {(newTerm)=>setSearch(newTerm)}
            placeholder = "SEARCH"
            placeholderTextColor = "#BEB184"
            style = {{fontSize : 20*wR,marginLeft : 10*wR,flex :1,color :"#BEB184" }}
        />}
        </View>
        <FlatList
        data={state2}
        keyExtractor = {(item)=>String(item.id)}
        style = {{marginHorizontal :15*wR,marginVertical: 15*hR}}
        renderItem = {({item,index}) =>{ 
            let indicator = "AM";let hour;
            if(item.lastModified.hours>12) indicator = "PM";
            if(item.lastModified.hours>12)hour = Number(item.lastModified.hours) -12;
            else hour = Number(item.lastModified.hours);
            return ( 
            <TouchableOpacity activeOpacity = {0.8}  onLongPress ={()=>{checkreverse(item.id);!show?setShow(true):null}} onPress = {show? ()=>checkreverse(item.id) : ()=>navigation.navigate("Show",{id : item.id})}>
                <View style = {index===0 ?styles.rowFirstElement : styles.row } >
                    <View style={styles.headerRow}>
                        <View style = {{flexDirection : "row",maxWidth :"53%"}}>
                            {show?(item.check?<View style={styles.checkedicon}></View> : <View style={styles.uncheckedicon}></View> ):null}
                            <Text numberOfLines={1} style = {styles.title}>{item.title}</Text>
                        </View>
                        <Text style={styles.dateandtime}>{item.lastModified.date}.{item.lastModified.month}.{item.lastModified.year} , {hour}:{item.lastModified.minutes} {indicator}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.content}>{item.content}</Text>
                </View>
            </TouchableOpacity>
        )
         }
         }
        />
    {show? <View style = {styles.bottomDrawer}>
         <TouchableOpacity activeOpacity = {0.5} style = {styles.delete} onPress ={()=>{deleteMultipleBlogPosts();setShow(false)}}>
            <MaterialCommunityIcons name="delete" size={24*wR} color="#B2983B"/>
            <Text style ={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity = {0.5} style = {styles.cancel} onPress={()=>{uncheckall();setShow(false);}}>
            <Text style ={styles.cancelText}>CANCEL</Text>
            <AntDesign name="closecircleo" size={24*wR} color ="#B2983B" />
        </TouchableOpacity>
    </View> 
    : null}
    </View>
}

IndexScreen.navigationOptions = ({navigation})=>{
    return{
        headerRight : ()=>{
        return (
            <View style ={{flexDirection : "row"}}>
            <TouchableOpacity activeOpacity = {0.6} onPress ={()=>navigation.navigate("Create")}>
            <AntDesign style ={{marginRight : 15*wR}} name ="pluscircle" size ={26*wR} color="#B2983B" />
            </TouchableOpacity>
            <SimpleLineIcons style ={{marginRight : 15*wR}} name ="options-vertical" size ={26*wR} color="#B2983B" />
            </View>
        ) }
    };
};
const styles = StyleSheet.create({
    delete :{
        flexDirection : "row",
        borderColor : "#BEB184",
        borderRightWidth : 2*wR,
        flex:1,
        alignItems : "center",
        justifyContent : "center"
    },
    deleteText :{
        color : "#B2983B",
        fontSize : 20*wR,
        margin : 7*wR,
    },
    cancel :{
        flexDirection:"row",
        flex:1,
        alignItems : "center",
        justifyContent : "center"
    },
    cancelText : {
        color: "#B2983B",
        fontSize : 20*wR,
        margin :7*wR,
    },
    nonotes : {
        color : "#B2983B",
        fontSize : 20*wR,
        textAlign : "center"
    },
    bottomDrawer : {
        height : "7%",
        width : "78%",
        alignSelf : "center",
        backgroundColor : "#000000",
        borderWidth : 2*wR,
        borderBottomWidth :0 ,
        borderTopLeftRadius : 20*wR,
        borderTopRightRadius : 20*wR,
        borderColor : "#BEB184",
        flexDirection :"row"
    },
    uncheckedicon : {marginTop:4.8*wR,marginRight :5*wR, backgroundColor:"#BBA263",borderColor :"black",
                    borderWidth : 1,borderRadius: 100*wR,height:15*hR,width : 15*wR},
    checkedicon : {marginTop:4.8*wR,marginRight :5*wR, backgroundColor:"#2E2929",borderColor :"#BBA263",
                    borderWidth : 1,borderRadius: 100*wR,height:15*hR,width : 15*wR},
    screenfornonotes : {
        borderTopWidth : 1.7*wR,
        borderTopColor : "#BEB184",
        backgroundColor : "#1D1D1D",
        flex :1,
        justifyContent:"center",
        alignItems:"center"
    },
    screen : {
        borderTopWidth : 1.7*wR,
        borderTopColor : "#BEB184",
        backgroundColor : "#1D1D1D",
        flex :1
    },
    search  :{
        backgroundColor : "#000000",alignItems : "center",paddingVertical :8*hR,paddingHorizontal : 8*wR,marginHorizontal : 10*wR,
        marginTop : 15*hR,borderColor : "#B2983B",borderRadius : 10*wR,borderWidth : 1.8*wR,flexDirection : "row",
        width :"95%" ,
        aspectRatio : 342/40
    },
    row: {
        backgroundColor : "#B2983B",
        borderRadius : 6*wR,
        //marginVertical :10,
       paddingVertical :18*hR,
       paddingHorizontal : 10*wR,
       marginTop :15*hR,
    },
    rowFirstElement: {
        backgroundColor : "#B2983B",
        borderRadius : 6*wR,
        //marginVertical :10,
       paddingVertical :18*hR,
       paddingHorizontal : 10*wR,
    },
    headerRow :{
        flexDirection :"row",
        justifyContent : "space-between"
    },
    title : {
        fontSize :18*wR,
        maxWidth : "100%",
        marginBottom : 3*hR,
    },
    dateandtime : {
        fontSize : 13*wR,
        marginTop : 4.5*hR,
        color : "#333026"
    },
    content :{
        marginTop :5*hR,
        color : "#333026"
    },
    icon : {
        fontSize : 24*wR
    }
})
export default IndexScreen ;