export default {
  name: 'PtUser',
  data() {
    return {
      loading: false,
      showPowerDialog: false,
      showEditUserDialog: false,
      begEndDate: [],
      searchForm: {},
      userForm: {},
      list: {},
      systemList: [],
      groupList: [],
      userGroupData: [],
      pageSize: 20,
      rules: {
        UserName: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
        NickName: [{required: true, message: '请输入用户昵称', trigger: 'blur'}],
        Password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        UserGroupId: [{required: true, message: '请选择用户组', trigger: 'blur'}],
        State: [{required: true, message: '请选择状态', trigger: 'blur'}],
        SystemId: [{required: true, message: '请选择来源系统', trigger: 'blur'}]
      },
      activeName: 'first',
      roleData: [],
      checkRoleData: [],
      checkRoleList: [],
      roleGroupData: [],
      checkRoleGroupData: [],
      systemId: ''
    }
  },
  mounted() {
    this.getUserGroupData()
    this.getAllSystem()
    this.getData(1)
  },
  methods: {
    getAllRoleBySystem(systemId) {
      var form = {CurPage: 1, PageSize: 1000, SystemId: systemId}
      this.http.post('api/v1/PtRole/GetPageData', form).then(res => {
        res.list.forEach(t => {
          this.roleData.push({key: t.Id, label: t.Name})
        })
      })
    },
    getAllRoleGroupBySystem(systemId) {
      var form = {CurPage: 1, PageSize: 1000, SystemId: systemId}
      this.http.post('api/v1/PtRoleGroup/GetPageData', form).then(res => {
        res.list.forEach(t => {
          this.roleGroupData.push({key: t.Id, label: t.Name})
        })
      })
    },
    getUserRoleInfo(userId) {
      return new Promise((resolve, reject) => {
        this.http.post('api/v1/PtUserLink/GetPageData', {CurPage: 1, PageSize: 1000, UserId: userId}).then(res => {
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
      this.http.post('api/v1/PtUser/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
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
        this.userGroupData = res
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
    handleUserGroupChange(e) {
      this.userForm.UserGroupId = 0
      this.userForm.UserGroupName = ''
      if (e.length > 0) {
        var id = e[e.length - 1]
        this.userGroupData.forEach(t => {
          if (id === t.Id) {
            this.userForm.UserGroupId = t.Id
            this.userForm.UserGroupName = t.Name
          }
        })
      }
    },
    handlerChangePower(e) {
      this.roleData = []
      this.roleGroupData = []
      this.checkRoleData = []
      this.checkRoleGroupData = []
      this.getUserRoleInfo(this.userForm.Id).then(res => {
        this.getAllRoleBySystem(e)
      })
      this.getAllRoleGroupBySystem(e)
    },
    handlerRoleChange(value, direction, movedKeys) {
      if (direction === 'right') {
        movedKeys.forEach(t => {
          this.http.post('api/v1/PtUserLink', {UserId: this.userForm.Id, RoleId: t}).then(res => {
            this.getUserRoleInfo(this.userForm.Id)
          })
        })
      } else {
        this.checkRoleList.forEach(t => {
          if (t.UserId === this.userForm.Id && this.checkRoleData.indexOf(t.RoleId)) {
            this.http.dele('api/v1/PtUserLink/' + t.Id).then(res => {
              this.getUserRoleInfo(this.userForm.Id)
            })
          }
        })
      }
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (e === t.Id) {
          this.userForm.SystemName = t.Name
        }
      })
    },
    openUserDialog(obj) {
      this.showEditUserDialog = !this.showEditUserDialog
      this.userForm = obj
    },
    openPowerDialog(obj) {
      this.userForm = obj
      this.showPowerDialog = !this.showPowerDialog
      this.systemId = this.userForm.SystemId
      this.handlerChangePower(this.systemId)
    },
    deleteRow() {
      if (this.userForm.Id) {
        this.$confirm('确认删除该用户吗？').then(() => {
          this.http.dele('api/v1/PtUser/' + this.userForm.Id).then(res => {
            this.$message.success('删除成功')
            this.openUserDialog({})
            this.getData(1)
          })
        })
      }
    },
    confirm() {
      this.$refs['userForm'].validate(v => {
        if (v) {
          if (this.userForm.Id) {
            this.http.put('api/v1/PtUser/' + this.userForm.Id, this.userForm).then(res => {
              this.$message.success('保存成功')
              this.openUserDialog({})
              this.getData(1)
            })
          } else {
            var date = new Date()
            var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
            this.userForm.CreateTime = isoDate
            this.http.post('api/v1/PtUser', this.userForm).then(res => {
              this.$message.success('保存成功')
              this.openUserDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
