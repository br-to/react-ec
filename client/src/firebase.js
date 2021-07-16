import firebase from 'firebase/app';
import 'firebase/auth';

// My app's firsbase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALgmL9kvM6TMi2xSFrzIjF9IwZHCSs3Fc',
  authDomain: 'react-ec-15f16.firebaseapp.com',
  projectId: 'react-ec-15f16',
  storageBucket: 'react-ec-15f16.appspot.com',
  messagingSenderId: '856928108023',
  appId: '1:856928108023:web:47f3d3505146ac2e8102f2',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
