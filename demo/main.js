import Vue from 'vue'
import App from './App.vue'
import VuePipeline from '../index.js'
// import VuePipeline from 'vue-pipeline'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(VuePipeline)
Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
