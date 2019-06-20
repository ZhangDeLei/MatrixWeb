export default {
  name: 'PtUser',
  data() {
    return {
      loading: false,
      showPowerDialog: false,
      showEditUserDialog: false,
      searchForm: {},
      userForm: {},
      list: {},
      systemList: [],
      pageSize: 20,
      rules: {}
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
      this.http.post('api/v1/PtUser/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    },
    openUserDialog(obj) {
      this.showEditUserDialog = !this.showEditUserDialog
      this.userForm = obj
    }
  }
}
