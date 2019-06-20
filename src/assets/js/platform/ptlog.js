export default {
  name: 'PtLog',
  data() {
    return {
      loading: false,
      searchForm: {},
      list: {},
      groupList: [],
      pageSize: 20
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
      this.http.post('api/v1/PtLog/GetPageData', this.searchForm).then(res => {
        this.list = res
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
