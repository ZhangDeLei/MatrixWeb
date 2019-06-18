// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import http from './assets/js/util/http'
import api from './assets/js/util/api'

Vue.prototype.store = store
Vue.prototype.http = http
Vue.prototype.api = api
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
