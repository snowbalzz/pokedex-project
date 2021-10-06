import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

let DATABASE_NAME = 'pokemons';
let COLLECTION_USERS = 'USERS';

export function CREATE_USER_COLLECTION(userId){
  return new Promise((resolve, reject) => {
    let userRef = firebase.firestore().collection(COLLECTION_USERS).doc(userId)
  
    userRef
      .get()
      .then((userDoc)=>{
        if (!userDoc.exists) {
          userRef.set({
            favorites: []
          }) 
        }
        resolve();
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function GET_USER_DOCUMENT(userId){
  return new Promise((resolve, reject) => {
    let userRef = firebase.firestore().collection(COLLECTION_USERS).doc(userId)
  
    userRef
      .get()
      .then((userDoc)=>{
        if (userDoc.exists) {
          resolve(userDoc.data())
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

