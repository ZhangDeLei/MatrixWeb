export default {
  name: 'PtUserGroup',
  data() {
    return {
      loading: false,
      showEditDialog: false,
      searchForm: {},
      userGroupForm: {},
      list: {},
      allList: [],
      pageSize: 20,
      rules: {
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    getAllList() {
      this.http.get('api/v1/PtUserGroup').then(res => {
        this.allList = res
      })
    },
    getData(curPage) {
      this.getAllList()
      this.loading = true
      this.searchForm.CurPage = curPage
      this.searchForm.PageSize = this.pageSize
      this.http.post('api/v1/PtUserGroup/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openEditDialog(obj) {
      this.showEditDialog = !this.showEditDialog
      this.userGroupForm = obj
    },
    deleteRow(id) {
      this.$confirm('确认删除该用户组吗？').then(() => {
        this.http.dele('api/v1/PtUserGroup/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['userGroupForm'].validate(v => {
        if (v) {
          if (this.userGroupForm.Id) {
            this.http.put('api/v1/PtUserGroup/' + this.userGroupForm.Id, this.userGroupForm).then(res => {
              this.$message.success('保存成功')
              this.openEditDialog({})
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtUserGroup', this.userGroupForm).then(res => {
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
