import firebase from "../configs/firebase";

export async function getData(){
    let initialState = [];
    var userID = await firebase.auth().currentUser.uid;
    await firebase.database().ref(`Users/${userID}/Notes`).once("value").then((snapshot)=>{
        initialState= snapshot.val()||[];
    });
    return initialState;
};

export async function updateData(state){
    var userID = await firebase.auth().currentUser.uid;
    firebase.database().ref(`Users/${userID}/Notes`).set(state);
};

