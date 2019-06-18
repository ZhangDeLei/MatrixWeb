export default {
  name: 'Main',
  data() {
    return {
      collapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoPage(url) {
      this.$router.push(url)
    },
  }
}
