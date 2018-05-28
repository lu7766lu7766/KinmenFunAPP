<template>
  <div class="view" >
    <scroller lock-y :scrollbar-x=false>
      <div class="countrys">
        <div v-for="country in countrys" @click="getViews(0, country.fi_id)" :class="{'country-item':true, active:fi_country==country.fi_id}" ><span>{{country.fv_name}}</span></div>
      </div>
    </scroller>
    <group>
      <cell v-for="view in views" is-link :link="'/view/'+view.fi_id">
        <!---->
        <div class="row">
          <img class="col-xs-5"  :src="view.fv_logo"/>
          <div class="col-xs-7" style="text-align: left;">
            <p><span style="color:#333;">{{view.fv_name}}</span></p>
            <p><span style="font-size: 0.7em">地址：{{view.fv_address}}</span></p>
          </div>
        </div>
      </cell>
    </group>

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
      countrys: [],
      views: []
    }
  },
  methods: {
    getDatas () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/country.php',
        method: 'post',
        data: {
          _method: 'get'
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          this.countrys = info
          this.getViews(0, info.length? info[0].fi_id: 1)
        }
      })
    },
    getViews (page = 0, fi_country = 1) {
      this.fi_country = fi_country
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/view.php',
        method: 'post',
        data: {
          _method: 'get',
          fi_country: fi_country,
          page: page
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          info = JSON.parse(info)
          console.log(info.data)
          this.views = info.data
        }
      })
    }
  },
  mounted () {
    this.getDatas()
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
</style>
