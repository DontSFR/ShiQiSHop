import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import ajax from '@/js/Ajax/index.js'
import 'iview/dist/styles/iview.css'
import '@/style/common.less'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(ajax)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
