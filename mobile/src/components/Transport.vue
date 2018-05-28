<template>
  <div class="view" >
    <scroller lock-y :scrollbar-x=false>
      <div class="countrys">
        <div v-for="type in types" @click="getDatas(0, type.fi_id)" :class="{'country-item':true, active:fi_type==type.fi_id}" ><span>{{type.fv_name}}</span></div>
      </div>
    </scroller>
    <div class="list">
      <div class="list-title">
        <b>交通資訊</b>
      </div>
      <group>
      <div v-for="transport in transports">
        <!---->
        <div class="row transport-item">
          <div class="col-xs-5">
            <img style="width:100%"  :src="getTypeLogo(fi_type)"/>
          </div>
          <div class="col-xs-7" style="text-align: left;">
            <p><span style="color:#333;font-size: 1.1em">{{transport.fv_name}}({{transport.ft_memo}})</span></p>
            <p><span style="color:#333;font-size: 1.1em">{{transport.ft_start}} 前往 {{transport.fv_target}}</span></p>
            <!--<p><span style="font-size: 0.7em">地址：{{transport.fv_address}}</span></p>-->
          </div>
        </div>
        <hr style="margin:5px 0"/>
      </div>
    </group>
    </div>


  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import xcomponent from '../vux-components'

export default {
  name: 'view',
  data () {
    return {
      fi_type:null,
      types:[],
      transports: []
    }
  },
  methods: {
    getTypeLogo (id) {
      const type = _.find(this.types, t => {
        return t.fi_id == id
      })
      return typeof type != "undefined"? type.fv_logo: ''
    },
    getCategory () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/transport_type.php',
        method: 'post',
        data: {
          _method: 'get'
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          this.types = info
          this.fi_type = this.types[0].fi_id
          this.getDatas(0, this.fi_type)
        }
      })
    },
    getDatas (page = 0, fi_type = 1) {
      this.fi_type = fi_type
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/transport.php',
        method: 'post',
        data: {
          _method: 'get',
          fi_type: fi_type,
          page: page
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          //info = JSON.parse(info)
          _.forEach(info, data => {
            let tmp = data.ft_start.split(':')
            data.ft_start = [tmp[0], tmp[1]].join(':')
          })
          this.transports = info
          console.log(info)
        }
      })
    }
  },
  computed: {
    nickname () {
      return this.$route.query.nickname
    }
  },
  mounted () {
    this.getCategory()
  },
  components: xcomponent
}
</script>
<style scoped>
.countrys {
  height: 30px;
  position: relative;
  width: 590px;
  background: #ffffff;
  padding:5px;
}
.country-item {
  width: 80px;
  height:30px;
  display:inline-block;
  /*background: #ccc;*/
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 30px;
  font-size:1.3em;
}
.country-item:first-child {
  margin-left: 0;
}
.transport-item {
  background:#ccc;
  padding:10px
}
.active {
  border-bottom :2px solid #ff0000;

}
.list {
  min-height: 350px;
  margin-top:10px;
  background:#fff;
}
.list-title {
  /*background-image: url('../../res/images/menu_last.png')*/
  padding:5px 0 3px 0;
  background: rgb(255,50,54); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(255,50,54,1) 0%, rgba(255,48,51,1) 56%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(255,50,54,1) 0%,rgba(255,48,51,1) 56%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(255,50,54,1) 0%,rgba(255,48,51,1) 56%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3236', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  color:#fff;
  font-size:1.3em;
}
</style>
