<template>
  <div class="check_user">
    <h3>
      序號：
    </h3>
    <div class="row">
      <div class="col-xs-12">
        <input type="text" class="form-control" v-model="guid"/>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-xs-offset-4 col-xs-4">
        <button type="button" class="form-control btn btn-primary" @click="login">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
  import storage from 'store'
  import $ from 'jquery'
  export default {
    name: 'check_user',
    data () {
      return {
        guid: ''
      }
    },
    methods: {
      login () {
        $.ajax({
          url: this.$store.state.host + 'aurora03/api/identity.php',
          method: 'post',
          data: {
            _method: 'login',
            fv_IMEI: this.IMEI,
            fv_guid: this.guid
          },
          dataType: 'json'
        }).done(({status, info}) => {
          if (status == 0) {
            // storage.set('userInfo',{
            //   fv_IMEI: this.IMEI,
            //   fv_guid: this.guid
            // })
            const data = info[0]
            const now = new Date().Format('Y-m-d H:i:s')
            if (data.ft_start<now && data.ft_stop>now) {
              this.$router.replace('/app')
            } else {
              this.$router.replace('/overtime')
            }

          } else if (status == -1) {
            alert('找不到該序號，請重新輸入')
            this.guid = ''
          }
        })
      }
    },
    computed: {
      IMEI () {
        return this.$store.state.IMEI
      }
    },
    mounted () {
      if (!this.IMEI) {
        alert('讀取不到手機辨識碼，請重新啟動本程式')
      }
    }
  }
</script>

<style scoped>
  .check_user {
    padding: 20pt 0 0 0 ;
  }
</style>
