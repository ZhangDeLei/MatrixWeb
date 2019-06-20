import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      get Id() {
        return localStorage.getItem('Id')
      },
      get NickName() {
        return localStorage.getItem('NickName')
      },
      get UserName() {
        return localStorage.getItem('UserName')
      }
    },
    get token() {
      return localStorage.getItem('token')
    },
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.setItem('Id', data.Id)
      localStorage.setItem('UserName', data.UserName)
      localStorage.setItem('NickName', data.NickName)
    },
    [types.TOKEN]: (state, data) => {
      localStorage.setItem('token', data.access_token)
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('NickName')
      localStorage.removeItem('UserName')
      localStorage.removeItem('Id')
    }
  }
})
