import firebase from 'firebase'
require('dotenv').config()

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
