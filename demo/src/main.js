import Vue from 'vue'
import App from './App.vue'
import VuePipeline from '../../index'
// import VuePipeline from 'vue-pipeline'

Vue.config.productionTip = false

Vue.use(VuePipeline)

new Vue({
  render: h => h(App),
}).$mount('#app')
