import * as types from '../../store/types'

export default {
  name: 'Main',
  data() {
    return {
      collapse: true,
      username: '',
      systemName: '',
      menuList: []
    }
  },
  mounted() {
    this.username = this.store.state.user.NickName
    this.systemName = this.store.state.user.SystemName
    this.getUserMenu()
  },
  methods: {
    getUserMenu() {
      var userId = this.store.state.user.Id
      var systemId = this.store.state.user.SystemId
      this.http.post('api/v1/PtFunc/GetUserFunc?UserId=' + userId + '&SystemId=' + systemId, []).then(res => {
        res.forEach(t => {
          if (t.ParentId === '0') {
            var children = this.convertMenuTree(res, t)
            t.children = children
            this.menuList.push(t)
          }
        })
      })
    },
    convertMenuTree(list, item) {
      var data = []
      list.forEach(t => {
        if (t.ParentId === item.Id) {
          var ch = this.convertMenuTree(list, t)
          t.children = ch
          data.push(t)
        }
      })
      return data
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
