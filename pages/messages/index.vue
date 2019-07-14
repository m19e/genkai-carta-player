<template>
  <div class="container-fluid m-5">
    <ul v-for="(msg, i) in messages" style="list-style:none;" class="m-4" :key="i">
      <li v-show="msg.timestamp">{{ msg }}</li>
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
    message: ''
  }),
  computed: {
    ...mapGetters('messages', ['messages']),
    ...mapGetters('auth', ['currentUser'])
  },
  created() {
    //do something after creating vue instance
    this.initMessages()
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
