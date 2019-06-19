export default {
  name: 'PtSystem',
  data() {
    return {
      isUpdate: false,
      loading: false,
      showSystemEditDialog: false,
      searchForm: {},
      systemForm: {},
      list: {},
      pageSize: 20,
      rules: {
        Id: [{required: true, message: '请输入编号', trigger: 'blur'}],
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        IpAddress: [{required: true, message: '请输入部署地址', trigger: 'blur'}],
        IpBackup: [{required: true, message: '请输入备用地址', trigger: 'blur'}],
        Notes: [{required: true, message: '请输入描述', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    getData(curPage) {
      this.loading = true
      this.searchForm.CurPage = curPage
      this.searchForm.PageSize = this.pageSize
      this.http.post('api/v1/PtSystem/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openSystemDialog(obj) {
      this.showSystemEditDialog = !this.showSystemEditDialog
      this.systemForm = obj
      this.isUpdate = obj.Id !== undefined
    },
    deleteRow(id) {
      this.$confirm('确认删除该系统吗？').then(() => {
        this.http.dele('api/v1/PtSystem/' + id).then(res => {
          this.$message.success('删除成功')
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['systemForm'].validate(v => {
        if (v) {
          if (!this.isUpdate) {
            this.http.post('api/v1/PtSystem', this.systemForm).then(res => {
              this.$message.success('保存成功')
              this.openSystemDialog({})
              this.getData(1)
            })
          } else {
            this.http.put('api/v1/PtSystem/' + this.systemForm.Id, this.systemForm).then(res => {
              this.$message.success('保存成功')
              this.openSystemDialog({})
              this.getData(1)
            })
          }
        }
      })
    }
  }
}
