<template>
  <div id="app">
    <view-box ref="viewBox">
      <x-header
        style="position:fixed;"
        :left-options="leftOptions"
        :title="'金門好好玩'"
        @on-click-back="clickBack"
        @on-click-title="scrollTop"
        default-back-link="/"></x-header>
      <div class="content">
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <!--<tabbar slot="bottom"> bottom</tabbar>-->
    </view-box>
    <footer class="footer"><img style="width:100%" src="../res/images/banner_footer.png"/></footer>
  </div>
</template>

<script>
import xcomponent from './vux-components'
import $ from 'jquery'

export default {
  name: 'app',
  data () {
    return {
      leftOptions: {
        showBack: ['/app', '/checkuser', '/overtime'].indexOf(this.$route.fullPath) == -1,
        backText: '',
        preventGoBack: true
      }
    }
  },
  methods: {
    scrollTop () {
      $('html, body').animate({scrollTop : 0}, 500)
    },
    clickBack () {
      this.$router.go(-1)
    }
  },
  watch:{
    "$route.fullPath" (newVal) {
      this.leftOptions.showBack = ['/app', '/checkuser', '/overtime'].indexOf(newVal) == -1
    }
  },
  components: xcomponent,
  mounted () {
    console.log(this.$store.state.IMEI)
  }
}
</script>

<style lang="less">

.vux-header {
  width:100%; left:0; top:0; z-index:100;
  background-image:url('../res/images/banner_header.png');
}

.footer {
  position: fixed;
  left:0;
  bottom:0;
  z-index:100;
  width:100%;
}

.content {
  width:100%;
  min-height:100%;
  padding:54px 8px 20px 8px;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  background-color: #fffff3;
}

.left-arrow {
  background: url('../res/images/back.png') no-repeat;
  background-size: contain;
}
.left-arrow:before {
  border: 0px !important;
}
.vux-header-title {
  font-weight: 900 !important;
}


/* animate */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .2s;
}

.slide-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}

</style>
