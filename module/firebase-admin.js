require('dotenv').config();
import firebase from 'firebase-admin';
var serviceAccount = require('C:\Users\eduardo\progetti-web\lab-web\progetto\fireproject-13ab0-firebase-adminsdk.json');

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})