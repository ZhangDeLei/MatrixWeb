export default {
  name: 'PtRoleGroup',
  data() {
    return {
      loading: false,
      showRoleGroupDialog: false,
      list: {},
      systemList: [],
      roleData: [],
      checkRoleData: [],
      checkRoleList: [],
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
    getRoleBySystem(systemId) {
      this.roleData = []
      this.searchForm.CurPage = 1
      this.searchForm.PageSize = 1000
      this.searchForm.SystemId = systemId
      this.http.post('api/v1/PtRole/GetPageData', this.searchForm).then(res => {
        res.list.forEach(t => {
          this.roleData.push({key: t.Id, label: t.Name})
        })
      }).finally(() => {
        this.loading = false
      })
    },
    getRoleGroupBySystem(groupId) {
      return new Promise((resolve, reject) => {
        var form = {CurPage: 1, PageSize: 1000, RoleGroupId: groupId}
        this.http.post('api/v1/PtRoleGroupLink/GetPageData', form).then(res => {
          res.list.forEach(t => {
            this.checkRoleData.push(t.RoleId)
          })
          this.checkRoleList = res.list
          resolve()
        })
      })
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
      this.http.post('api/v1/PtRoleGroup/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openRoleGroupDialog(obj) {
      this.roleData = []
      this.showRoleGroupDialog = !this.showRoleGroupDialog
      this.roleGroupForm = obj
      if (obj.Id) {
        this.getRoleGroupBySystem(obj.Id).then(() => this.getRoleBySystem(obj.SystemId))
      }
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.roleGroupForm.SystemName = t.Name
        }
      })
    },
    handlerRoleChange(value, direction, movedKeys) {
      if (direction === 'right') {
        movedKeys.forEach(t => {
          this.http.post('api/v1/PtRoleGroupLink', {RoleGroupId: this.roleGroupForm.Id, RoleId: t}).then(res => {
            this.getRoleGroupBySystem(this.roleGroupForm.Id)
          })
        })
      } else {
        this.checkRoleList.forEach(t => {
          if (t.RoleGroupId === this.roleGroupForm.Id && movedKeys.indexOf(t.RoleId) >= 0) {
            this.http.dele('api/v1/PtRoleGroupLink/' + t.Id).then(res => {
              this.getRoleGroupBySystem(this.roleGroupForm.Id)
            })
          }
        })
      }
    },
    deleteRow() {
      if (this.roleGroupForm.Id) {
        this.$confirm('确认删除该角色分组吗？').then(() => {
          this.http.dele('api/v1/PtRoleGroup/' + this.roleGroupForm.Id).then(res => {
            this.$message.success('删除成功')
            this.openRoleGroupDialog({})
            this.getData(1)
          })
        })
      }
    },
    confirm() {
      this.$refs['roleGroupForm'].validate(v => {
        if (v) {
          if (this.roleGroupForm.Id) {
            this.http.put('api/v1/PtRoleGroup/' + this.roleGroupForm.Id, this.roleGroupForm).then(res => {
              this.$message.success('保存成功')
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtRoleGroup', this.roleGroupForm).then(res => {
              this.$message.success('保存成功')
              this.roleGroupForm.Id = res.Id
              this.getRoleBySystem(res.SystemId)
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
