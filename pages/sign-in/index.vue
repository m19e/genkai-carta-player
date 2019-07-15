<template>
  <div class="container">
    <b-form class="p-5" @submit="signin">
      <b-form-group>
        <b-form-input v-model="username" placeholder="Enter Username" />
      </b-form-group>
      <b-input-group class="pb-3" prepend="@">
        <b-input v-model="id" required placeholder="Enter TwitterID" />
      </b-input-group>
      <b-form-group class="pb-2">
        <b-form-input
          v-model="password"
          type="password"
          required
          placeholder="Enter Password"
        />
      </b-form-group>
      <b-form-checkbox class="pb-1" v-model="newUser">新規登録</b-form-checkbox>
      <b-button @click="signin" variant="primary">{{ isSignInOrUp }}</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

// const auth = firebase.auth()

export default {
  layout: 'none',
  data: () => ({
    id: '',
    password: '',
    username: '',
    newUser: false
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser']),
    isSignInOrUp: function() {
      return this.newUser ? 'サインアップ' : 'サインイン'
    }
  },
  methods: {
    ...mapActions('auth', {
      authSignup: 'signUp',
      authSignin: 'signIn',
      authSetUser: 'setUser'
    }),
    // サインイン処理
    signin: async function() {
      let data = {
        email: this.id + '@genkai.com',
        password: this.password,
        username: this.username
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
    }
    // gSignin: function() {
    //   auth.signInWithRedirect(
    //     new firebase.auth.GoogleAuthProvider()
    //   )
    // }
  }
}
</script>
