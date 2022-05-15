// adding your firebase config here
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import 'firebase/analytics';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyAqNKTEkFak2jgSdgYZafaFVoAMY2BcSBI',
  authDomain: 'e-commercepf.firebaseapp.com',
  projectId: 'e-commercepf',
  storageBucket: 'e-commercepf.appspot.com',
  messagingSenderId: '281044447587',
  appId: '1:281044447587:web:0aece300a88a935c276356'
})

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig) //eslint-disable-line
// firebase.analytics();
