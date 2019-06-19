export default {
  name: 'PtFuncType',
  data() {
    return {
      loading: false,
      showEditFuncTypeDialog: false,
      searchForm: {},
      typeForm: {},
      list: {},
      rules: {
        Id: [{required: true, message: '请输入编码', trigger: 'blur'}],
        Name: [{required: true, message: '请输入类型名称', trigger: 'blur'}]
      },
      pageSize: 20,
      isUpdate: false
    }
  },
  mounted() {
    this.getData(1)
  }
  ,
  methods: {
    getData(curPage) {
      this.loading = true
      this.http.post('api/v1/PtFuncType/GetPageData', {
        CurPage: curPage,
        PageSize: this.pageSize,
        Id: this.searchForm.Id
      }).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    }
    ,
    openFuncTypeDialog(obj) {
      this.showEditFuncTypeDialog = !this.showEditFuncTypeDialog
      this.typeForm = obj
      this.isUpdate = obj.Id !== undefined
    },
    confirm() {
      this.$refs['typeForm'].validate((v) => {
        if (v) {
          if (!this.isUpdate) {
            this.http.post('api/v1/PtFuncType', this.typeForm).then(res => {
              this.$message.success('保存成功')
              this.openFuncTypeDialog({})
              this.getData(1)
            })
          } else {
            this.http.put('api/v1/PtFuncType/' + this.typeForm.Id, this.typeForm).then(res => {
              this.$message.success('保存成功')
              this.openFuncTypeDialog({})
              this.getData(1)
            })
          }
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除该功能类型吗？').then(() => {
        this.http.dele('api/v1/PtFuncType/' + id, {}).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    }
  }
}
