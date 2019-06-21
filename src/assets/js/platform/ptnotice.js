export default {
  name: 'PtNotice',
  data() {
    return {
      loading: false,
      isUpdate: false,
      showNoticDialog: false,
      searchForm: {},
      noticeForm: {},
      list: {},
      systemList: [],
      pageSize: 20,
      begEndDate: [],
      rules: {}
    }
  },
  mounted() {
    this.getAllSystem()
    this.getData(1)
  },
  methods: {
    getAllSystem() {
      this.http.get('api/v1/PtSystem').then(res => {
        this.systemList = res
      })
    },
    getData(curPage) {
      this.loading = true
      this.searchForm.CurPage = curPage
      this.searchForm.PageSize = this.pageSize
      console.log(this.begEndDate)
      this.http.post('api/v1/PtNotice/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openEditDialog(obj) {
      this.showNoticDialog = !this.showNoticDialog
      this.noticeForm = obj
      this.isUpdate = obj.Id !== undefined
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.noticeForm.SystemName = t.Name
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除该通知吗？').then(() => {
        this.http.dele('api/v1/PtNotice/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['noticeForm'].validate(v => {
        if (v) {
          this.noticeForm.UserId = this.store.state.user.Id
          if (this.isUpdate) {
            this.http.put('api/v1/PtNotice/' + this.noticeForm.Id, this.noticeForm).then(res => {
              this.$message.success('保存成功')
              this.openEditDialog({})
              this.getData(1)
            })
          } else {
            var date = new Date()
            var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
            this.noticeForm.CreateTime = isoDate
            this.http.post('api/v1/PtNotice', this.noticeForm).then(res => {
              this.$message.success('保存成功')
              this.openEditDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
