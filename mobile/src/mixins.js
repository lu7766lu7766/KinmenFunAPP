export default {
  methods: {
    linkToMap (data) {
      let uri = ''
      if (data.ff_latitude && data.ff_longitude) {
        uri = `daddr=${data.ff_latitude}, ${data.ff_longitude}&directionsmode=walking`
        if(this.$store.state.lat && this.$store.state.lng) {
          uri += `&saddr=${this.$store.state.lat}, ${this.$store.state.lng}`
        }
      } else if(data.fv_address) {
        uri = `q=${data.fv_address}`
      }
      if (uri) {
        const url = `http://maps.google.com.tw/maps?` + uri
        window.open(url)
      } else {

      }
    }
  }
}
