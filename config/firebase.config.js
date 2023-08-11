import {getApp,getApps,initializeApp} from 'firebase/app'
import{getAuth} from 'firebase/auth'
import {getFirestore, getfirestore} from 'firebase/firestore'




const firebaseConfig = {
    apiKey: "AIzaSyBikxSAr55R50VeIEubVZwyu-8lFOrWU-U",
    authDomain: "react-chat-apps-321eb.firebaseapp.com",
    projectId: "react-chat-apps-321eb",
    storageBucket: "react-chat-apps-321eb.appspot.com",
    messagingSenderId: "628039327709",
    appId: "1:628039327709:web:15269ddc1b3543e7fe6034"
  };

const app = getApp.length>0?getApp():initializeApp(firebaseConfig)

const firebaseAuth = getAuth(app)
const firestoreDB = getFirestore(app)

export {app,firebaseAuth,firestoreDB}