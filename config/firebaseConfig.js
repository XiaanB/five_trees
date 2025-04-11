import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASRGB91RFG9rZkRux1FslI2HrqzVArkb0",
  authDomain: "fivetrees-26cd0.firebaseapp.com",
  projectId: "fivetrees-26cd0",
  storageBucket: "fivetrees-26cd0.firebasestorage.app",
  messagingSenderId: "582444083351",
  appId: "1:582444083351:web:37eb6fd36f4bec4931e1d2",
  measurementId: "G-3BJBPM1810"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized
}

export { auth };

export default firebase; // Export firebase app
