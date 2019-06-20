export default {
  name: 'PtUserGroup',
  data() {
    return {
      searchForm: {},
      userGroupForm: {},
      list: [],
      allList: [],
      pageSize: 20,
      rules: {
        Name: [{required: true, message: '请输入名称', trigger: 'blur'}]
      },
      defaultProps: {
        children: 'children',
        label: 'Name'
      }
    }
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    getData() {
      this.loading = true
      this.http.get('api/v1/PtUserGroup').then(res => {
        var data = []
        res.forEach(t => {
          if (t.ParentId === 0) {
            var children = this.convertTree(res, t)
            if (children.length > 0) t.children = children
            data.push(t)
          }
        })
        this.list = data
      }).finally(() => {
        this.loading = false
      })
    },
    convertTree(list, item) {
      var data = []
      list.forEach(t => {
        if (t.ParentId === item.Id) {
          var ch = this.convertTree(list, t)
          if (ch.length > 0) t.children = ch
          data.push(t)
        }
      })
      return data
    },
    handleNodeClick(obj) {
      this.userGroupForm = obj
    },
    deleteRow() {
      this.$confirm('确认删除该用户组吗？').then(() => {
        this.http.dele('api/v1/PtUserGroup/' + this.userGroupForm.Id).then(res => {
          this.$message.success('删除成功')
          this.userGroupForm = {}
          this.getData(1)
        })
      })
    },
    confirm() {
      this.$refs['userGroupForm'].validate(v => {
        if (v) {
          this.userGroupForm.Id = 0
          this.userGroupForm.ParentId = this.userGroupForm.ParentId !== undefined && this.userGroupForm.ParentId.length !== undefined && this.userGroupForm.ParentId.length > 0 ? this.userGroupForm.ParentId[this.userGroupForm.ParentId.length - 1] : 0
          this.http.post('api/v1/PtUserGroup', this.userGroupForm).then(res => {
            this.$message.success('保存成功')
            this.userGroupForm = {}
            this.getData(1)
          })
        }
      })
    },
    update() {
      this.$refs['userGroupForm'].validate(v => {
        if (v) {
          this.userGroupForm.ParentId = this.userGroupForm.ParentId !== undefined && this.userGroupForm.ParentId.length !== undefined && this.userGroupForm.ParentId.length > 0 ? this.userGroupForm.ParentId[this.userGroupForm.ParentId.length - 1] : this.userGroupForm.ParentId
          this.http.put('api/v1/PtUserGroup/' + this.userGroupForm.Id, this.userGroupForm).then(res => {
            this.$message.success('保存成功')
            this.userGroupForm = {}
            this.getData(1)
          })
        }
      })
    }
  }
}
