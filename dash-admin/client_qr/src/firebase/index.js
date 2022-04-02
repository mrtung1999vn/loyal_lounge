import firebase from "firebase";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBZB0_0-4od7rXpF0GPtNCQ5U2uKplTyBA",
  authDomain: "loyal-lounge.firebaseapp.com",
  projectId: "loyal-lounge",
  storageBucket: "loyal-lounge.appspot.com",
  messagingSenderId: "20114790967",
  appId: "1:20114790967:web:35a0f021ca7911d8ffbdb2",
  measurementId: "G-T56XY8D3PF"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };