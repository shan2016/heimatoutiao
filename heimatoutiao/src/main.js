import Vue from 'vue'
import App from './App.vue'

// 引入提示框插件
import { Toast, Icon, Uploader, Dialog, Field, Picker, Tab, Tabs } from 'vant'

import '@/styles/reset.css'

import router from '@/router/index.js'

Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
