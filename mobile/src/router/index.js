import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '../Welcome'
import App from '../App'
import Index from 'components/Index'
import View from 'components/View'
import ViewDetail from 'components/ViewDetail'
import Store from 'components/Store'
import StoreDetail from 'components/StoreDetail'
import Transport from 'components/Transport'

import CheckUser from 'components/CheckUser'

const Working = {
  template: '<div>施工中...</div>'
}
const OverTime = {
  template: '<h2>使用期限已到，需請廠商開通</h2>'
}

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Welcome},
    { path: '/app', component: App, children: [{ path: '', component: Index}]},
    { path: '/view', component: App, children: [{ path: '', component: View}]},
    { path: '/view/:fi_id', component: App, children: [{ path: '', component: ViewDetail}]},
    { path: '/store', component: App, children: [{ path: '', component: Store}]},
    { path: '/store/:fi_id', component: App, children: [{ path: '', component: StoreDetail}]},
    { path: '/transport', component: App, children: [{ path: '', component: Transport}]},

    { path: '/checkuser', component: App, children: [{ path: '', component: CheckUser}]},
    { path: '/overtime', component: App, children: [{ path: '', component: OverTime}]}
  ]
})
