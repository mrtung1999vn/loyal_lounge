import firebase from "firebase";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBBX0bPgeSXEkom_AQXYQqbghZb5uHhQ7I",
  authDomain: "bctechg-59b96.firebaseapp.com",
  projectId: "bctechg-59b96",
  storageBucket: "bctechg-59b96.appspot.com",
  messagingSenderId: "344439953908",
  appId: "1:344439953908:web:8068a88b424a229db9c1a1",
  measurementId: "G-5PK5L70DZQ"
};


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };