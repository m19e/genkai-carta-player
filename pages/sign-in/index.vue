<template>
  <div>
    <b-form class="m-5" @submit="signin">
      <b-form-group
        label="ID:"
      >
        <b-form-input v-model="id" required placeholder="Enter Your ID" />
      </b-form-group>
      <b-form-group
        label="Password:"
      >
        <b-form-input v-model="password" type="password" required placeholder="Enter Password" />
      </b-form-group>
      <b-form-checkbox v-model="newUser">新規登録</b-form-checkbox>
      <b-button @click="signin" variant="primary">{{ isSignInOrUp }}</b-button>
    </b-form>
    <!-- <b-button @click="gSignin" variant="primary">Googleアカウントでログイン</b-button> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import firebase from '~/plugins/firebase'

// const auth = firebase.auth()

export default {
  layout: 'none',
  data: () => ({
    id: '',
    password: '',
    newUser: true,
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'curretUser']),
    isSignInOrUp: function() {
      return this.newUser ? 'サインアップ' : 'サインイン'
    },
  },
  methods: {
    ...mapActions('auth', { authSignup: 'signUp', authSignin: 'signIn', authSetUser: 'setUser' }),
    // サインイン処理
    signin: async function() {
      let data = {
        email: this.id + '@genkai.com',
        password: this.password
      }
      if (this.newUser) {
        await this.authSignup(data)
      } else {
        await this.authSignin(data)
      }
      await this.gotoMessages()
    },
    gotoMessages: async function() {
      if (this.isAuthenticated) {
        await this.$router.push({ path: '/messages/' })
      }
    },
    // gSignin: function() {
    //   auth.signInWithRedirect(
    //     new firebase.auth.GoogleAuthProvider()
    //   )
    // }
  }
}
</script>
