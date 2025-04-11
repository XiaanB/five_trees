// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRGB91RFG9rZkRux1FslI2HrqzVArkb0",
  authDomain: "fivetrees-26cd0.firebaseapp.com",
  projectId: "fivetrees-26cd0",
  storageBucket: "fivetrees-26cd0.appspot.com", 
  messagingSenderId: "582444083351",
  appId: "1:582444083351:web:37eb6fd36f4bec4931e1d2",
  measurementId: "G-3BJBPM1810"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);

// Use persistent auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
