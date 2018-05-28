<template>
  <div class="view_detail" v-if="view.fi_id">
    <div class="view-detail" v-if="view.fi_id">
      <div class="row title">
        <div class="logo col-xs-6">
          <img :src="view.fv_logo" style="width:100%"/>
        </div>
        <div class="logo col-xs-6" style="text-align: left; padding-left:0">
          <span style="font-size: 1.2em;">{{view.fv_name}}</span>
          <table style="font-size: 0.9em">
            <tr>
              <td width="25%">類別：</td> <td width="75%">{{view.fv_type}}</td>
            </tr>
            <tr>
              <td>地址：</td> <td>{{view.fv_address}}</td>
            </tr>
            <tr>
              <td>GPS：</td> <td>【精度】{{view.ff_latitude}} <br>【緯度】{{view.ff_longitude}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 view-detail-content" style="margin-top: 10px;text-align: left;min-height:30vh; padding:0 20px">
          <span v-html="view.ft_memo"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" style="padding:30px 0">
        <img src="../../res/images/map.png" class="col-xs-offset-2 col-xs-4" @click="linkToMap(view)">
        <img src="../../res/images/near_stores.png" class="col-xs-4">
        <!--<img src="../../res/images/share_viewpoint.png" class="col-xs-4">-->
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
      view: {},
      types: []
    }
  },
  methods: {
    getTypes () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/view_type.php',
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
        url: this.$store.state.host + 'aurora03/api/view.php',
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
          this.view = info.data[0]
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
</style>
