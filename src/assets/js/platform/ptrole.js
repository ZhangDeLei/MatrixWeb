export default {
  name: 'PtRole',
  data() {
    return {
      loading: false,
      showRoleDialog: false,
      showRoleDataDialog: false,
      showRoleDataEditDialog: false,
      list: {},
      funcdata: [],
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
      },
      defaultProps: {
        children: 'children',
        label: 'Name'
      },
      defaultCheckKeys: [],
      roleFuncList: []
    }
  },
  mounted() {
    this.getAllSystem()
    this.getData(1)
  },
  methods: {
    getTreeData(e) {
      this.searchForm.CurPage = 1
      this.searchForm.PageSize = 1000
      this.searchForm.SystemId = e
      this.getRoleFunc(this.roleFrom.Id).then(() => {
        this.http.post('api/v1/PtFunc/GetPageData', this.searchForm).then(res => {
          var data = []
          res.list.forEach(t => {
            if (t.ParentId === '0') {
              var chirdren = this.convertTreeData(res.list, t)
              if (chirdren.length > 0) t.children = chirdren
              data.push(t)
            }
          })
          this.funcdata = data
        })
      })
    },
    convertTreeData(list, item) {
      var data = []
      list.forEach(t => {
        if (t.ParentId === item.Id) {
          var chirdren = this.convertTreeData(list, t)
          if (chirdren.length > 0) t.children = chirdren
          data.push(t)
        }
      })
      return data
    },
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
    getRoleFunc(roleId) {
      return new Promise((resolve, reject) => {
        this.defaultCheckKeys = []
        var form = {CurPage: 1, PageSize: 1000, RoleId: roleId}
        this.http.post('api/v1/PtRoleLink/GetPageData', form).then(res => {
          this.roleFuncList = res.list
          res.list.forEach(t => {
            this.defaultCheckKeys.push(t.FuncId)
          })
          resolve()
        })
      })
    },
    getRoleData() {
      return new Promise((resolve, reject) => {
        let params = {
          CurPage: 1,
          PageSize: 1000,
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
      this.funcdata = []
      if (this.roleFrom.Id) {
        this.getTreeData(this.roleFrom.SystemId)
      }
    },
    openRoleDataDialog(obj) {
      this.getRoleData().then(() => {
        this.showRoleDataDialog = !this.showRoleDataDialog
        this.roleFrom = obj
      })
    },
    openRoleDataEditDialog() {
      this.showRoleDataEditDialog = !this.showRoleDataEditDialog
    },
    handlerChangeCheckNode(e, check) {
      if (check) {
        this.http.post('api/v1/PtRoleLink', {RoleId: this.roleFrom.Id, FuncId: e.Id}).then(res => {
        })
      } else {
        this.roleFuncList.forEach(t => {
          if (t.RoleId === this.roleFrom.Id && t.FuncId === e.Id) {
            this.http.dele('api/v1/PtRoleLink/' + t.Id).then(res => {
            })
          }
        })
      }
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.roleFrom.SystemName = t.Name
        }
      })
      this.funcdata = []
      if (this.roleFrom.Id) {
        this.getTreeData(e)
      }
    },
    deleteRole() {
      if (this.roleFrom.Id) {
        this.$confirm('确认删除该角色分组吗？').then(() => {
          this.http.dele('api/v1/PtRole/' + this.roleFrom.Id).then(res => {
            this.$message.success('删除成功')
            this.openRoleDialog({})
            this.getData(1)
          })
        })
      } else {
        this.$message.error('请先录入')
      }
    },
    deleteRoleData() {
      if (this.roleDataForm.Id) {
        this.$confirm('确认删除该角色详情吗？').then(() => {
          this.http.dele('api/v1/PtRoleData/' + this.roleDataForm.Id).then(res => {
            this.$message.success('删除成功')
            this.roleDataForm = {}
            this.getRoleData()
          })
        })
      } else {
        this.$message.error('请选择一个配置')
      }
    },
    checkJsonData(obj) {
      this.roleDataForm = obj
    },
    confirmRoleData() {
      this.$refs['roleDataForm'].validate(v => {
        if (v) {
          this.roleDataForm.RoleId = this.roleFrom.Id
          this.http.post('api/v1/PtRoleData', this.roleDataForm).then(res => {
            this.$message.success('保存成功')
            this.openRoleDataEditDialog({})
            this.getRoleData()
          })
        }
      })
    },
    updateRoleData() {
      if (this.roleDataForm.Id) {
        this.http.put('api/v1/PtRoleData/' + this.roleDataForm.Id, this.roleDataForm).then(res => {
          this.$message.success('保存成功')
          this.getRoleData()
        })
      } else {
        this.$message.error('请选择一条数据')
      }
    },
    resetRoleData() {
      this.roleDataForm.JsonData = ''
    },
    confirm() {
      this.$refs['roleFrom'].validate(v => {
        if (v) {
          if (this.roleFrom.Id) {
            this.http.put('api/v1/PtRole/' + this.roleFrom.Id, this.roleFrom).then(res => {
              this.$message.success('保存成功')
              this.getTreeData(res.SystemId)
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtRole', this.roleFrom).then(res => {
              this.$message.success('保存成功')
              this.roleFrom.Id = res.Id
              this.getTreeData(res.SystemId)
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
