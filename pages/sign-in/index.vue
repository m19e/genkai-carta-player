<template>
  <div>
    <b-form @submit="signin">
      <b-form-group
        label="Email address:"
        description="We'll never share your email with anyone else."
      >
        <b-form-input v-model="email" required placeholder="Enter Email" />
      </b-form-group>
      <b-form-group
        label="Password:"
      >
        <b-form-input v-model="password" required placeholder="Enter Password" />
      </b-form-group>
      <b-button @click="signin" variant="primary">サインイン</b-button>
    </b-form>
    <!-- <b-button @click="gSignin" variant="primary">Googleアカウントでログイン</b-button> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

const auth = firebase.auth()

export default {
  layout: 'none',
  data: () => ({
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'curretUser'])
  },
  methods: {
    ...mapActions('auth', { authSignin: 'signIn', authSetUser: 'setUser' }),
    // サインイン処理
    signin: async function() {
      let data = {
        email: this.email,
        password: this.password
      }
      await this.authSignin(data)
      // await this.gotoMessages()
    },
    gotoMessages: async function() {
      if (this.isAuthenticated) {
        await this.$router.push({ path: '/messages/' })
      }
    },
    gSignin: function() {
      auth.signInWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      )
    }
  }
}
</script>
