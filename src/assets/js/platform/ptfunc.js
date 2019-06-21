export default {
  name: 'PtFunc',
  data() {
    return {
      loading: false,
      isUpdate: false,
      showEditFuncDialog: false,
      searchForm: {},
      funcForm: {},
      list: [],
      systemList: [],
      funcTypeList: [],
      rules: {
        Id: [{required: true, message: '请输入编码', trigger: 'blur'}],
        Code: [{required: true, message: '请输入调用标志', trigger: 'blur'}],
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        SystemId: [{required: true, message: '请选择系统编号', trigger: 'blur'}],
        FuncTypeId: [{required: true, message: '请选择功能类型', trigger: 'blur'}]
      },
      defaultProps: {
        children: 'children',
        label: 'Name'
      }
    }
  },
  mounted() {
    this.getAllFuncType()
    this.getAllSystem()
    this.handlerChangeSystemSearch(this.store.state.user.SystemId)
  },
  methods: {
    getAllFuncType() {
      this.http.get('api/v1/PtFuncType').then(res => {
        this.funcTypeList = res
      })
    },
    getAllSystem() {
      this.http.get('api/v1/PtSystem').then(res => {
        this.systemList = res
      })
    },
    handlerChangeSystemSearch(e) {
      this.searchForm.CurPage = 1
      this.searchForm.PageSize = 1000
      this.searchForm.SystemId = e
      this.getTreeData()
    },
    getTreeData() {
      this.http.post('api/v1/PtFunc/GetPageData', this.searchForm).then(res => {
        var data = []
        res.list.forEach(t => {
          if (t.ParentId === '0') {
            var chirdren = this.convertTreeData(res.list, t)
            if (chirdren.length > 0) t.children = chirdren
            data.push(t)
          }
        })
        this.list = data
      }).finally(() => {
        this.loading = false
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
    handlerChangeType(e) {
      this.funcTypeList.forEach(t => {
        if (t.Id === e) {
          this.funcForm.FuncTypeName = t.Name
        }
      })
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.funcForm.SystemName = t.Name
        }
      })
    },
    handleNodeClick(e) {
      this.funcForm = e
    },
    deleteRow() {
      this.$confirm('确认删除该功能吗？').then(() => {
        this.http.dele('api/v1/PtFunc/' + this.funcForm.Id).then(res => {
          this.$message.success('删除成功')
          this.funcForm = {}
          this.getTreeData(1)
        })
      })
    },
    confirm() {
      this.$refs['funcForm'].validate(v => {
        if (v) {
          var type = typeof this.funcForm.ParentId
          if (type === 'object') {
            if (this.funcForm.ParentId.length === 0) {
              this.funcForm.ParentId = 0
            } else {
              this.funcForm.ParentId = this.funcForm.ParentId[this.funcForm.ParentId.length - 1]
            }
          } else if (type === 'string') {
            this.funcForm.ParentId = this.funcForm.ParentId
          } else {
            this.funcForm.ParentId = 0
          }
          this.http.post('api/v1/PtFunc', this.funcForm).then(res => {
            this.$message.success('保存成功')
            this.funcForm = {}
            this.getTreeData(1)
          })
        }
      })
    },
    update() {
      this.$refs['funcForm'].validate(v => {
        if (v) {
          var type = typeof this.funcForm.ParentId
          if (type === 'object') {
            if (this.funcForm.ParentId.length === 0) {
              this.funcForm.ParentId = 0
            } else {
              this.funcForm.ParentId = this.funcForm.ParentId[this.funcForm.ParentId.length - 1]
            }
          } else if (type === 'string') {
            this.funcForm.ParentId = this.funcForm.ParentId
          }
          this.http.put('api/v1/PtFunc/' + this.funcForm.Id, this.funcForm).then(res => {
            this.$message.success('保存成功')
            this.funcForm = {}
            this.getTreeData(1)
          })
        }
      })
    }
  }
}
