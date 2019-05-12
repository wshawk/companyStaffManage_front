import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'//引入axios


// axios.defaults.baseURL = 'https://localhost:8088/api'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
require('es6-promise').polyfill();
require('es6-promise/auto');