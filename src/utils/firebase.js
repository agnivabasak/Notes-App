import firebase from "../configs/firebase";

export async function getData(){
    let initialState = [];
    await firebase.database().ref("Notes").once("value").then((snapshot)=>{
        initialState= snapshot.val()||[];
    });
    return initialState;
};

export function updateData(state){
    firebase.database().ref("Notes").set(state);
};

