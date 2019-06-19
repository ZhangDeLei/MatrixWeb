export default {
  name: 'PtRole',
  data() {
    return {
      loading: false,
      showRoleDialog: false,
      showRoleDataDialog: false,
      showRoleDataEditDialog: false,
      showRolePowerDialog: false,
      list: {},
      systemList: [],
      roleDataList: {},
      searchForm: {},
      roleFrom: {},
      roleDataForm: {},
      pageSize: 20,
      rules: {
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        SystemId: [{required: true, message: '请选择系统编号', trigger: 'blur'}]
      },
      roleDataRules: {
        Code: [{required: true, message: '请输入编码', trigger: 'blur'}],
        JsonData: [{required: true, message: 'JsonData', trigger: 'blur'}]
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
      this.http.post('api/v1/PtRole/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    getRoleData(curPage) {
      return new Promise((resolve, reject) => {
        let params = {
          CurPage: curPage,
          PageSize: this.pageSize,
          RoleId: this.roleFrom.Id
        }
        this.http.post('api/v1/PtRoleData/GetPageData', params).then(res => {
          this.roleDataList = res
          resolve()
        }).finally(() => {
          resolve()
        })
      })
    },
    openRoleDialog(obj) {
      this.showRoleDialog = !this.showRoleDialog
      this.roleFrom = obj
    },
    openRolePowerDialog(obj) {
      this.showRolePowerDialog = !this.showRolePowerDialog
      this.roleFrom = obj
    },
    openRoleDataDialog(obj) {
      this.getRoleData(1).then(() => {
        this.showRoleDataDialog = !this.showRoleDataDialog
        this.roleFrom = obj
      })
    },
    openRoleDataEditDialog(obj) {
      this.showRoleDataEditDialog = !this.showRoleDataEditDialog
      this.roleDataForm = obj
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.roleFrom.SystemName = t.Name
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除该角色分组吗？').then(() => {
        this.http.dele('api/v1/PtRole/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    deleteRoleDataRow(id) {
      this.$confirm('确认删除该角色详情吗？').then(() => {
        this.http.dele('api/v1/PtRoleData/' + id).then(res => {
          this.$message.success('删除成功')
          this.getRoleData(1)
        })
      })
    },
    confirmRoleData() {
      this.$refs['roleDataForm'].validate(v => {
        if (v) {
          this.roleDataForm.RoleId = this.roleFrom.Id
          if (this.roleDataForm.Id) {
            this.http.put('api/v1/PtRoleData/' + this.roleDataForm.Id, this.roleDataForm).then(res => {
              this.$message.success('保存成功')
              this.openRoleDataEditDialog({})
              this.getRoleData(1)
            })
          } else {
            this.http.post('api/v1/PtRoleData', this.roleDataForm).then(res => {
              this.$message.success('保存成功')
              this.openRoleDataEditDialog({})
              this.getRoleData(1)
            })
          }
        }
      })
    },
    confirm() {
      this.$refs['roleFrom'].validate(v => {
        if (v) {
          if (this.roleFrom.Id) {
            this.http.put('api/v1/PtRole/' + this.roleFrom.Id, this.roleFrom).then(res => {
              this.$message.success('保存成功')
              this.openRoleDialog({})
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtRole', this.roleFrom).then(res => {
              this.$message.success('保存成功')
              this.openRoleDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
