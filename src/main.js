// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
import axios from './../config/http.js'
import moment from 'moment'
import EleMultiCascader from "ele-multi-cascader"
import './assets/css/reset.css'
import './assets/css/index.less'

Vue.config.productionTip = false

Vue.prototype.$axios=axios
Vue.prototype.moment=moment
Vue.use(EleMultiCascader)
Vue.use(element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
