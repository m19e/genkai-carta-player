<template>
  <div class="container m-5">
    <ul v-for="(msg, i) in messages" style="list-style:none;" class="m-4" :key="i">
      <div class="p-2" style="background-color: white;" v-show="msg.timestamp">
        <li style="text-align:left;">{{ users[`${msg.uid}`] }}</li>
        <li class="p-1" style="border: solid 1px; border-radius: 1em;">{{ msg.text }}</li>
        <li style="text-align:right;">{{ msg.timestamp }}</li>
      </div>
    </ul>

    <b-form class="fixed-bottom m-2" inline>
      <b-input v-model="message" class="mb-2 mr-sm-2 mb-sm-0 col-10" placeholder="メッセージを入力" />
      <b-button @click="addMessage" variant="primary">送信</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data: () => ({
    message: '',
    users: {}
  }),
  computed: {
    ...mapGetters('messages', ['messages']),
    ...mapGetters('auth', ['currentUser']),
    setUsernames() {
      firebase.firestore().collection('users').doc('names').get().then( doc => {
        console.log(doc.data())
        this.users = doc.data()
      })
    },
  },
  created() {
    //do something after creating vue instance
    this.initMessages(),
    firebase.firestore().collection('users').doc('names').get().then( doc => {
      console.log(doc.data())
      this.users = doc.data()
    })
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
    }
  },
}
</script>
