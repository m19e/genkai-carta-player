import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const messagesRef = db.collection('messages')
const usersRef = db.collection('users')

export const state = () => ({
  messages: [],
  users: []
})

export const getters = {
  messages: (state) => state.messages,
  users: (state) => state.users
}

export const actions = {
  initMessages: firestoreAction(async ({ bindFirestoreRef }) => {
    await bindFirestoreRef('messages', messagesRef.orderBy('time', 'asc'))
    await bindFirestoreRef('users', usersRef.doc('names'))
  }),
  addMessageRef: firestoreAction((context, data) => {
    let date = new Date()
    messagesRef.add({
      uid:  data.uid,
      text: data.text,
      time: Date.now(),
      timestamp: date.toLocaleString(),
    })
  })
}
