<template>
  <div class="index" >
    <!--news-->
    <div class="news">
      <div class="news-title">
        <b>最新消息</b>
      </div>
      <!--{{news | json}}-->
      <div v-for="item in news" style="text-align:left; font-size: 0.8em; padding:2px 10px 1px 10px;">
        {{item.fd_date}} - {{item.fv_title}}
      </div>
    </div>
    <!--ad-->
    <div class="ad">
    </div>

    <!--menu-->
    <div class="menu">
      <div class="col-xs-6 view menu" @click="moveTo('view')">
        <div class="menu-title">好玩景點</div>
      </div>
      <div class="col-xs-6 store menu" @click="moveTo('store')">
        <div class="menu-title">好逛店家</div>
      </div>
      <div class="col-xs-6 transport menu" @click="moveTo('transport')">
        <div class="menu-title">好行交通</div>
      </div>
      <div class="col-xs-6 hotel menu" @click="moveTo('store?nickname=hotel')">
        <div class="menu-title">好住飯店</div>
      </div>
      <!--<div class="row">
        <img class="col-xs-6" v-for="img in menu_imgs" :src="img" />
      </div>-->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import xcomponent from '../vux-components'

export default {
  name: 'index',
  data () {
    return {
      news: []
    }
  },
  methods: {
    getDatas () {
      $.ajax({
        url: this.$store.state.host + 'aurora03/api/news.php',
        method: 'post',
        data: {
          _method: 'get',
          limit: 5
        },
        dataType: 'json'
      }).done(({status, info}) => {
        if (status == 0) {
          _.forEach(info, news => {
            news.fd_date = news.ft_date.split(' ')[0]
          })
          this.news = info
        }
      })
    },
    moveTo (path) {
      this.$router.push('/'+path)
    }
  },
  mounted () {
    this.getDatas()
  },
  components: xcomponent
}
</script>
<style scoped>
  .menu-title {
    font-weight: 900;
    color:#fff;
    padding:3px
  }
  .hotel{
    background: url('../../res/images/option_hotel.png') no-repeat;
  }
  .transport{
    background: url('../../res/images/option_transport.png') no-repeat;
  }
  .store{
    background: url('../../res/images/option_stores.png') no-repeat;
  }
  .view{
    background: url('../../res/images/option_viewpoints.png') no-repeat;
  }
  .menu {
    min-height:75px;
    background-size: cover;
    cursor:pointer;
  }
  .ad {
    margin: 15px 0 10px 0;
    background: url('../../res/images/advertising.jpg') no-repeat;
    background-size: contain;
    min-height:60px;
  }
  .news {
    min-height: 170px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: url('../../res/images/hoopoe.png') no-repeat;
    background-position: 108% 120%;
    background-size: 100px 100px;
  }
  .news-title {
    /*background-image: url('../../res/images/menu_last.png')*/
    padding:5px 0 3px 0;
    background: rgb(255,50,54); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(255,50,54,1) 0%, rgba(255,48,51,1) 56%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,50,54,1) 0%,rgba(255,48,51,1) 56%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,50,54,1) 0%,rgba(255,48,51,1) 56%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3236', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  }
</style>
