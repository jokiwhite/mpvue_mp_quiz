import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import {get,post} from "./utils/httppost"

Vue.prototype.$get = get;//作为全局变量
Vue.prototype.$post = post;//作为全局变量

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
