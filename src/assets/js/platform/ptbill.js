export default {
  name: 'PtBill',
  data() {
    return {
      loading: false,
      searchForm: {},
      list: {},
      groupList: [],
      pageSize: 20
    }
  },
  mounted() {
    this.getUserGroupData()
    this.getData(1)
  },
  methods: {
    handleUserGroupChange(e) {
      if (e.length > 0) {
        this.searchForm.UserGroupId = e[e.length - 1]
      } else {
        this.searchForm.UserGroupId = 0
      }
    },
    getUserGroupData() {
      this.http.get('api/v1/PtUserGroup').then(res => {
        var data = []
        res.forEach(t => {
          if (t.ParentId === 0) {
            var children = this.convertGroupTree(res, t)
            if (children.length > 0) t.children = children
            data.push(t)
          }
        })
        this.groupList = data
      })
    },
    convertGroupTree(list, item) {
      var data = []
      list.forEach(t => {
        if (t.ParentId === item.Id) {
          var ch = this.convertGroupTree(list, t)
          if (ch.length > 0) t.children = ch
          data.push(t)
        }
      })
      return data
    },
    getData(curPage) {
      this.loading = true
      this.searchForm.CurPage = curPage
      this.searchForm.PageSize = this.pageSize
      this.http.post('api/v1/PtBill/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
