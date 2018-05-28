<template>
  <div class="welcome" >
  </div>
</template>

<script>

  import storage from 'store'
  import $ from 'jquery'

  export default {
    name: 'welcome',
    data () {
      return {
      }
    },
    methods: {
      toApp () {
        setTimeout(() => {
          this.$router.replace('/app')
        }, 2000)
      },
      toCheckUser () {
        setTimeout(() => {
          this.$router.replace('/checkuser')
        }, 1000)
      }
    },
    computed: {
      IMEI () {
        return this.$store.state.IMEI
      }
    },
    mounted () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/identity.php',
        method: 'post',
        data: {
          _method: 'get',
          fv_IMEI: this.$store.state.IMEI? this.$store.state.IMEI: 'undefined'
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0 && info.length > 0) {
          const data = info[0]
          const now = new Date().Format('Y-m-d H:i:s')
          if (data.ft_start<now && data.ft_stop>now) {
            this.toApp()
          } else {
            this.$router.replace('/overtime')
          }
        } else {
          this.toCheckUser()
        }
      })


      // setTimeout(() => {
      //   this.$router.replace('/app')
      // }, 2000)
    }
  }
</script>
<style>

  body{
    margin:0;
  }
  .welcome {
    background: url('../res/images/welcome.png');
    background-size:cover;
    height:100vh;
    width:100%;
  }
</style>
