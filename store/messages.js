import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()
const messagesRef = db.collection('messages')

export const state = () => ({
  messages: []
})

export const getters = {
  messages: (state) => state.messages
}

export const actions = {
  initMessages: firestoreAction(async ({ bindFirestoreRef }) => {
    await bindFirestoreRef('messages', messagesRef.orderBy('time', 'asc'))
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
