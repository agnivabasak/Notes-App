import firebase from "../configs/firebase";

export async function getData(){
    let initialState = [];
    await firebase.database().ref("Notes").on("value",snapshot=>{
        initialState= snapshot.val()||[];
    });
    return initialState;
};

export function updateData(state){
    firebase.database().ref("Notes").set(state);
};

