import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'

const auth = firebase.auth()
const db = firebase.firestore()

export const state = () => ({
  user: null
})

export const getters = {
  currentUser: state => state.user,
  isAuthenticated: state => !!state.user
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  // サインアップ処理
  async signUp({ dispatch, commit }, data) {
    try {
      await auth.createUserWithEmailAndPassword(data.email, data.password).then( res => {
        console.log(res);
        commit('setUser', res.user)
      }).catch( error => {
        console.error(error)
      })
    } catch (e) {
      console.error('reject[error]:' + e)
    }
  },
  // サインイン処理
  async signIn({ dispatch, commit }, data) {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password).then( res => {
        db.collection('users').doc('names').set({ [res.user.uid] : data.username },{ merge: true })
        // ログイン成功
        commit('setUser', res.user)
      }).catch( error => {
        console.error(error)
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
