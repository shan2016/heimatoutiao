import Vue from 'vue'
import App from './App.vue'

// 引入提示框插件
import { Toast } from 'vant'

import '@/styles/reset.css'

import router from '@/router/index.js'

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
