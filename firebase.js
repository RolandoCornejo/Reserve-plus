// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXw8VjDwZJk8I44v9OWYKC0_9407Fdsc4",
  authDomain: "reserve-plus-5d413.firebaseapp.com",
  projectId: "reserve-plus-5d413",
  storageBucket: "reserve-plus-5d413.appspot.com",
  messagingSenderId: "384750964500",
  appId: "1:384750964500:web:16a523bcc49667a4ea3c01"
};

// Initialize Firebase
let app;
if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}
const provider = new firebase.auth.GoogleAuthProvider();
const db= firebase.firestore();
const auth = firebase.auth()

export default {auth,db,provider};