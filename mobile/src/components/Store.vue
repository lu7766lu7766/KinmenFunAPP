<template>
  <div class="view" >
    <scroller lock-y :scrollbar-x=false>
      <div class="countrys">
        <div v-for="country in countrys" @click="getDatas(0, country.fi_id, fi_type)" :class="{'country-item':true, active:fi_country==country.fi_id}" ><span>{{country.fv_name}}</span></div>
      </div>
    </scroller>
    <hr style="margin:5px 0"/>
    <scroller lock-y :scrollbar-x=false>
      <div class="countrys">
        <div v-for="type in types" @click="getDatas(0, fi_country, type.fi_id)" :class="{'country-item':true, active:fi_type==type.fi_id}" ><span>{{type.fv_name}}</span></div>
      </div>
    </scroller>
    <div class="list">
      <div class="list-title">
        <b>{{this.getTypeName()}}</b>
      </div>
      <group>
      <cell v-for="store in stores" is-link :link="'/store/'+store.fi_id">
        <!---->
        <div class="row">
          <img class="col-xs-5"  :src="store.fv_logo"/>
          <div class="col-xs-7" style="text-align: left;">
            <p><span style="color:#333;">{{store.fv_name}}</span></p>
            <p><span style="font-size: 0.7em">地址：{{store.fv_address}}</span></p>
          </div>
        </div>
      </cell>
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
      fi_country: null,
      fi_type:null,
      countrys: [],
      types:[],
      stores: []
    }
  },
  methods: {
    getTypeName () {
      const type = _.find(this.types, t => {
        return t.fi_id == this.fi_type
      })
      return typeof type != "undefined"? type.fv_name: ''
    },
    getCategory () {
      const promise1 = $.ajax({
        url: this.$store.state.host + 'aurora03/api/country.php',
        method: 'post',
        data: {
          _method: 'get'
        },
        dataType: 'json'
      }),
      promise2 = $.ajax({
        url: this.$store.state.host + 'aurora03/api/store_type.php',
        method: 'post',
        data: {
          _method: 'get'
        },
        dataType: 'json'
      })
      $.when(promise1, promise2).done((countrys, types) => {
        this.countrys = countrys[0].info
        this.types = types[0].info
        this.fi_type = this.types[0].fi_id
        if (this.nickname) {
          const type = _.find(this.types, t =>{
            return t.fv_nickname == this.nickname
          })
          if (typeof type != "undefined") {
            this.fi_type = type.fi_id
          }
        }

        this.fi_country = this.countrys[0].fi_id
        this.getDatas (0, this.fi_country, this.fi_type)
      })
    },
    getDatas (page = 0, fi_country = 1, fi_type = 1) {
      this.fi_country = fi_country
      this.fi_type = fi_type
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/store.php',
        method: 'post',
        data: {
          _method: 'get',
          fi_country: fi_country,
          fi_type: fi_type,
          page: page
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          info = JSON.parse(info)
          this.stores = info.data
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
