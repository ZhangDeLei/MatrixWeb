export default {
  name: 'PtRoleGroup',
  data() {
    return {
      loading: false,
      showRoleGroupDialog: false,
      list: {},
      systemList: [],
      searchForm: {},
      roleGroupForm: {},
      pageSize: 20,
      rules: {
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        SystemId: [{required: true, message: '请选择系统编号', trigger: 'blur'}]
      }
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
      this.http.post('api/v1/PtRoleGroup/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openRoleGroupDialog(obj) {
      this.showRoleGroupDialog = !this.showRoleGroupDialog
      this.roleGroupForm = obj
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.roleGroupForm.SystemName = t.Name
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除该角色分组吗？').then(() => {
        this.http.dele('api/v1/PtRoleGroup/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['roleGroupForm'].validate(v => {
        if (v) {
          if (this.roleGroupForm.Id) {
            this.http.put('api/v1/PtRoleGroup/' + this.roleGroupForm.Id, this.roleGroupForm).then(res => {
              this.$message.success('保存成功')
              this.openRoleGroupDialog({})
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtRoleGroup', this.roleGroupForm).then(res => {
              this.$message.success('保存成功')
              this.openRoleGroupDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
