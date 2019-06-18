import axios from 'axios'
import store from '../../../store/store'
import api from './api'
import {Message} from 'element-ui'

var instance = axios.create({
  baseURL: api.baseUrl,
  timeout: 3000
})
// request 请求拦截器
instance.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data)
  if (store.state.token) {
    config.headers['Authorization'] = store.state.token
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,DELETE,PUT'
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,version'
  config.headers['version'] = 2.0
  return config
}, error => {
  Message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})
// response 返回拦截器
instance.interceptors.response.use(response => {
  if (response.status === 403) {
    this.$router.push({path: '/'})
    return response
  }
  // 请先登录
  if (response.data.code === 401) {
    Message({showClose: true, message: '用户名密码错误', type: 'error'})
  } else if (response.data.code === 403) {
    this.$router.push({path: '/'})
  }
  return response.data
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  if (error.message.indexOf('403') >= 0) {
    window.location.href = '/'
  }
  return Promise.reject(error)
})
export default {
  get(url, param) {
    return instance.get(url + appendParams(param), '')
  },
  post(url, param) {
    return instance.post(url, param)
  }
}

var appendParams = function (param) {
  var params = ''
  for (var v in param) {
    if (params.length > 0) {
      params += '&'
    }
    params += v + '=' + param[v]
  }
  return params.length > 0 ? '?' + params : ''
}
