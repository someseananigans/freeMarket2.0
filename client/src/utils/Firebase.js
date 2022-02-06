import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAGOsAOTXtMr-AS0DGHL_1dyctsn4iA0mo",
  authDomain: "freemarket-3263e.firebaseapp.com",
  projectId: "freemarket-3263e",
  storageBucket: "freemarket-3263e.appspot.com",
  messagingSenderId: "623455406150",
  appId: "1:623455406150:web:0f8d92b06ff3902fd16247",
  measurementId: "G-ZSJ89JVWDF"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }