import * as types from '../../store/types'

export default {
  name: 'Main',
  data() {
    return {
      collapse: true,
      username: ''
    }
  },
  mounted() {
    this.username = this.store.state.user.NickName
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    gotoPage(url) {
      this.$router.push(url)
    },
    // 退出系统
    handlerUserDropdown(e) {
      if (e === 'exit') {
        this.$confirm('确认退出系统吗').then(() => {
          this.store.commit(types.LOGOUT)
          this.$router.push('/')
        })
      }
    }
  }
}
