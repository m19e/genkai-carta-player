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

    } catch (e) {
      console.log('reject[error]:' + e)
    }
  },
  signOut({ dispatch, commit }) {
    try {

    } catch (e) {
      console.log('reject[error]:' + e)
    }
  },
  setUser: firebaseAction(({ bindFirebaseRef }) => {
    commit('setUser', state.members[0])
  })
}
