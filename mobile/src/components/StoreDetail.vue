<template>
  <div class="view_detail" v-if="store.fi_id">
    <div class="view-detail" >
      <div class="list">
        <div class="list-title">
          <b>店家資訊</b>
        </div>
        <div class="row title">
          <div class="logo col-xs-6">
            <img :src="store.fv_logo" style="width:100%"/>
          </div>
          <div class="logo col-xs-6" style="text-align: left; padding-left:0">
            <span style="font-size: 1.2em;">{{store.fv_name}}</span>
            <table style="font-size: 0.9em">
              <tr>
                <td width="25%">類別：</td> <td width="75%">{{store.fv_type}}</td>
              </tr>
              <tr>
                <td>地址：</td> <td>{{store.fv_address}}</td>
              </tr>
              <tr>
                <td>GPS：</td> <td>【精度】{{store.ff_latitude}} <br>【緯度】{{store.ff_longitude}}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 view-detail-content" style="margin-top: 10px;text-align: left;min-height:30vh; padding:0 20px">
            <span v-html="store.ft_memo"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12" style="padding:30px 0">
          <img src="../../res/images/map.png" class="col-xs-offset-2 col-xs-4" @click="linkToMap(store)">
          <a :href="'tel:'+store.fv_phone"><img src="../../res/images/phone.png" class="col-xs-4"></a>
          <!--<img src="../../res/images/share_viewpoint.png" class="col-xs-4">-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import xcomponent from '../vux-components'
import mixins from '../mixins'

export default {
  name: 'view-detail',
  mixins: [mixins],
  data () {
    return {
      store: {},
      types: []
    }
  },
  methods: {
    getTypes () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/store_type.php',
        method: 'post',
        data: {
          _method: 'get'
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          this.types = info
          this.getDatas()
        }
      })
    },
    getDatas () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/store.php',
        method: 'post',
        data: {
          _method: 'get',
          fi_id: this.$route.params.fi_id
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          info = JSON.parse(info)
          _.forEach(info.data, x => {
            // console.log(this.types)
            // console.log(x)
            // console.log(_.find(this.types, y => { return y.fi_id == 1}))
            x.fv_type = _.find(this.types, y => { return y.fi_id == x.fi_type}).fv_name
          })
          this.store = info.data[0]
        }
      })
    }
  },
  mounted () {
    this.getTypes()
  },
  components: xcomponent
}
</script>
<style scoped>
  .view-detail {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: #ffffff;
  }
  .view-detail-content {
    background: url('../../res/images/decoration1.png') no-repeat;
    background-position: 94% 110%;
    background-size: 100px 100px;
  }
  .list {
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
