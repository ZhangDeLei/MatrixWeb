import axios from 'axios'
import qs from 'qs'
import * as types from '../../store/types'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    login() {
      if (!this.loginForm.username) {
        this.$message.error('请输入用户名')
      } else if (!this.loginForm.password) {
        this.$message.error('请输入密码')
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        axios.post(this.api.baseUrl + 'token', qs.stringify(this.loginForm), {
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(this.loginForm)
        }).then(res => {
          if (res.status === 200) {
            this.store.commit(types.TOKEN, res.data)
            this.http.get('api/v1/PtUser/' + res.data.user_id, {}).then(res => {
              this.store.commit(types.LOGIN, res)
              this.$router.push('/main')
            })
          } else {
            this.$message.error('用户名或密码错误')
          }
        }).finally(() => {
          loading.close()
        })
      }
    }
  }
}
