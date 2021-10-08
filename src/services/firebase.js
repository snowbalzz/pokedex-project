import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import {remove} from 'lodash'

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


export function GET_POKEMON_BY_ID(id){
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref()
      .child(DATABASE_NAME)
      .child(id)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()){
          resolve(snapshot.val())
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function GET_POKEMON_BY_NATIONAL_NUMBER(id) {
  return new Promise((resolve) => {
    firebase
      .database()
      .ref()
      .child(DATABASE_NAME)
      .orderByChild('national_number')
      .equalTo(id)
      .on("value", function (snapshot) {
        resolve(snapshot.val())
      })
  })
}

export function SET_FAVORITE_TO_USER(pokemonId, userId){
  return new Promise((resolve, reject) => {
    let userRef = firebase.firestore().collection(COLLECTION_USERS).doc(userId)

    userRef
      .get()
      .then(function (userDoc) {
        if (userDoc.exists){
          let existingFavorites = userDoc.data().favorites
          let newFav = !existingFavorites.includes(pokemonId) ? [...existingFavorites, pokemonId] : 
            remove(existingFavorites, (x) => { return x !== pokemonId})
          userRef
            .update({
              "favorites":newFav
            })
          resolve(newFav)
        }
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}



