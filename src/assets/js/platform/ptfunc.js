export default {
  name: 'PtFunc',
  data() {
    return {
      loading: false,
      isUpdate: false,
      showEditFuncDialog: false,
      searchForm: {},
      funcForm: {},
      list: {},
      allList: [],
      systemList: [],
      funcTypeList: [],
      pageSize: 20,
      rules: {
        Id: [{required: true, message: '请输入编码', trigger: 'blur'}],
        Code: [{required: true, message: '请输入调用标志', trigger: 'blur'}],
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        SystemId: [{required: true, message: '请选择系统编号', trigger: 'blur'}],
        FuncTypeId: [{required: true, message: '请选择功能类型', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.getAllFuncType()
    this.getAllSystem()
    this.getData(1)
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
    getAllFunc() {
      this.http.get('api/v1/PtFunc').then(res => {
        this.allList = res
      })
    },
    getData(curPage) {
      this.getAllFunc()
      this.loading = true
      this.searchForm.CurPage = curPage
      this.searchForm.PageSize = this.pageSize
      this.http.post('api/v1/PtFunc/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openFuncEditDialog(obj, ischild) {
      this.showEditFuncDialog = !this.showEditFuncDialog
      if (!this.showEditFuncDialog) {
        this.funcForm = obj
      } else {
        if (ischild) {
          this.isUpdate = false
          this.funcForm.ParentId = obj.Id
        } else {
          this.funcForm = obj
          this.funcForm.ParentId = '0'
          this.isUpdate = obj.Id !== undefined
        }
      }
    },
    handlerChangeSystem(e) {
      this.systemList.forEach(t => {
        if (t.Id === e) {
          this.funcForm.SystemName = t.Name
        }
      })
    },
    handlerChangeType(e) {
      this.funcTypeList.forEach(t => {
        if (t.Id === e) {
          this.funcForm.FuncTypeName = t.Name
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除该功能吗？').then(() => {
        this.http.dele('api/v1/PtFunc/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['funcForm'].validate(v => {
        if (v) {
          if (this.isUpdate) {
            this.http.put('api/v1/PtFunc/' + this.funcForm.Id, this.funcForm).then(res => {
              this.$message.success('保存成功')
              this.openFuncEditDialog({})
              this.getData(1)
            })
          } else {
            this.http.post('api/v1/PtFunc', this.funcForm).then(res => {
              this.$message.success('保存成功')
              this.openFuncEditDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
