import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import 'firebase/firestore'

export const strict = false

export const state = () => ({})
export const getters = {}
export const mutations = {
  ...vuexfireMutations
}
export const actions = {}
