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
      countyList: [],
      provinceList: [],
      cityList: [],
      systemId: '',
      roleGroupId: undefined
    }
  },
  mounted() {
    this.getUserGroupData()
    this.getAllSystem()
    this.getData(1)
    this.getAddress(0, 0).then(res => {
      this.countyList = res
    })
  },
  methods: {
    getAddress(level, parentId) {
      return new Promise((resolve, reject) => {
        var param = {CurPage: 1, PageSize: 1000, LevelIndex: level, ParentId: parentId}
        this.http.post('api/v1/PtAddress/GetPageData', param).then(res => {
          resolve(res.list)
        })
      })
    },
    fastImportRole() {
      if (this.roleGroupId) {
        this.http.post('api/v1/PtRoleGroupLink/GetPageData', {
          CurPage: 1,
          PageSize: 1000,
          RoleGroupId: this.roleGroupId
        }).then(res => {
          if (res.list.length > 0) {
            res.list.forEach(t => {
              this.http.post('api/v1/PtUserLink', {UserId: this.userForm.Id, RoleId: t.RoleId}).then(rs => {
                this.getUserRoleInfo(this.userForm.Id)
              })
            })
          }
        })
      } else {
        this.$message.error('请先选择一个角色组')
      }
    },
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
        this.roleGroupData = res.list
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
      if (this.begEndDate != null && this.begEndDate.length !== undefined && this.begEndDate.length > 0) {
        this.searchForm.BeginDate = this.begEndDate[0]
        this.searchForm.EndDate = this.begEndDate[1]
      } else {
        this.searchForm.BeginDate = null
        this.searchForm.EndDate = null
      }
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
    handlerChangeCountry(e) {
      this.countyList.forEach(t => {
        if (t.Name === e) {
          this.getAddress(1, t.Id).then(res => {
            this.provinceList = res
          })
        }
      })
    },
    handlerChangeProvince(e) {
      this.provinceList.forEach(t => {
        if (t.Name === e) {
          this.getAddress(2, t.Id).then(res => {
            this.cityList = res
          })
        }
      })
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
      this.checkRoleData = []
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
