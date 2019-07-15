<template>
  <div class="container m-5">
    <ul v-for="(msg, i) in messages" style="list-style:none;" class="m-4" :key="i">
      <div class="p-2" style="background-color: white;" v-show="msg.timestamp">
        <li style="text-align:left;">{{ users[`${msg.uid}`] }}</li>
        <li class="p-1" style="border: solid 1px; border-radius: 1em;">{{ msg.text }}</li>
        <li style="text-align:right;">{{ msg.timestamp }}</li>
      </div>
    </ul>

    <b-form inline class="fixed-bottom m-2 pl-2">
      <b-input v-model="username" class="mb-2 mr-sm-2 mb-sm-0 col-2" placeholder="username" />
      <b-input v-model="message" class="mb-2 mr-sm-2 mb-sm-0 col-8" placeholder="メッセージを入力" />
      <b-button @click="addMessage" class="col-1" variant="primary">送信</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export default {
  data: () => ({
    message: '',
    username: '',
    users: {}
  }),
  computed: {
    ...mapGetters('messages', ['messages']),
    ...mapGetters('auth', ['currentUser']),
  },
  created() {
    //do something after creating vue instance
    this.initMessages(),
    this.getUsernames()
  },
  methods: {
    ...mapActions('messages', {
      initMessages: 'initMessages',
      addMessageRef: 'addMessageRef'
    }),
    // メッセージ追加処理
    addMessage() {
      this.addMessageRef({ text: this.message, uid: this.currentUser.uid })
      this.message = ''
      db.collection('users').doc('names').set({ [this.currentUser.uid] : this.username },{ merge: true })
    },
    getUsernames: async function() {
      await firebase.firestore().collection('users').doc('names').onSnapshot(querySnapshot => {
        console.log(querySnapshot.data())
        this.users = querySnapshot.data()
      })
      this.setPostUsername()
    },
    setPostUsername() {
      this.username = this.users[`${this.currenUser.uid}`]
    },
  },
}
</script>
