import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      get id() {
        return localStorage.getItem('id')
      },
      get userName() {
        return localStorage.getItem('userName')
      },
      get userAccount() {
        return localStorage.getItem('userAccount')
      },
      get ROLES() {
        return localStorage.getItem('roles')
      },
      get orgId() {
        return localStorage.getItem('orgId')
      },
      get orgName() {
        return localStorage.getItem('orgName')
      }
    },
    get token() {
      return localStorage.getItem('token')
    },
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data.id)
      localStorage.setItem('userName', data.userName)
      localStorage.setItem('userAccount', data.username)
      localStorage.setItem('orgId', data.orgId)
      localStorage.setItem('orgName', data.orgName)
      let roles = ''
      data.authorities.forEach(t => {
        if (roles.length > 0) roles += ','
        roles += t.authority
      })
      localStorage.setItem('roles', roles)
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
    }
  }
})
