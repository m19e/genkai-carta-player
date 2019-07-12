import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'

const auth = firebase.auth()

export const state = () => ({
  user: null
})

export const getters = {
  curretUser: (state) => state.user,
  isAuthenticated: (state) => !!state.user
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  // サインイン処理
  async signIn({ dispatch, commit }, data) {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password).then( res => {
        // ログイン成功
        commit('setUser', res.user)
      }).catch( error => {
        // エラー処理
      })
    } catch (e) {
      console.log('reject[error]:' + e)
    }
  },
  // サインアウト処理
  signOut({ dispatch, commit }) {
    try {
      auth.signOut().then(() => {
        commit('setUser', null)
      }).catch( error => {
        // エラー処理
      })
      // サインインユーザーがいない
      dispatch('setLoginStateInitialize')
    } catch (e) {
      console.log('reject[error]:' + e)
    }
  },
  setUser: firebaseAction(({ bindFirebaseRef }) => {
    commit('setUser', state.members[0])
  })
}
